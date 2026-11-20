<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useSaleStore } from "~/stores/sale/sale";

const saleStore = useSaleStore();
const toast = useToast();

const open = ref(false);
const isLoading = ref(false);

// ---------- Sana ----------
const tz = getLocalTimeZone();
const maxDate = today(tz); // kelajak sanani tanlab bo'lmaydi
const date = shallowRef<CalendarDate>(today(tz));

const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

// 19-noyabr, 2026
const formatDate = (d: CalendarDate) =>
  `${d.day}-${months[d.month - 1]}, ${d.year}`;

const dateLabel = computed(() => {
  const t = today(tz);
  if (date.value.compare(t) === 0) return `Bugun, ${formatDate(date.value)}`;
  if (date.value.compare(t.subtract({ days: 1 })) === 0)
    return `Kecha, ${formatDate(date.value)}`;
  return formatDate(date.value);
});

// ---------- Forma ----------
const form = reactive({
  volume: null as number | null,
  pricePerCube: null as number | null,
  cash: null as number | null,
  terminal: null as number | null,
  transfer: null as number | null,
  comment: "",
});

// Faqat ko'rsatish uchun. Haqiqiy hisobni server qiladi.
const totalAmount = computed(() =>
  Math.round((form.volume || 0) * (form.pricePerCube || 0)),
);
const received = computed(
  () => (form.cash || 0) + (form.terminal || 0) + (form.transfer || 0),
);
const difference = computed(() => received.value - totalAmount.value);

const money = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " so'm";

const resetForm = () => {
  date.value = today(tz);
  Object.assign(form, {
    volume: null,
    pricePerCube: null,
    cash: null,
    terminal: null,
    transfer: null,
    comment: "",
  });
};

const submit = async () => {
  // 1. Majburiy maydonlar
  if (!form.volume || !form.pricePerCube) {
    toast.add({
      title: "Ma'lumot to'liq emas",
      description: "Sotilgan kub va 1 kub narxini kiriting",
      color: "error",
      icon: "clarity:error-solid",
    });
    return;
  }

  // 2. Pul kam bo'lmasin (ko'p bo'lsa mayli)
  if (difference.value < 0) {
    toast.add({
      title: "Pul kam",
      description: `Yana ${money(-difference.value)} yetishmayapti`,
      color: "error",
      icon: "clarity:error-solid",
    });
    return;
  }

  // 3. Backendga ketadigan ma'lumot
  const payload = {
    date: date.value.toDate("UTC").toISOString(), // "2026-11-19T00:00:00.000Z"
    volume: form.volume,
    pricePerCube: form.pricePerCube,
    cash: form.cash || 0,
    terminal: form.terminal || 0,
    transfer: form.transfer || 0,
    comment: form.comment.trim() || undefined,
  };

  isLoading.value = true;
  const ok = await saleStore.createSale(payload);
  isLoading.value = false;

  if (ok) {
    open.value = false;
    resetForm();
  }
};

</script>

<template>
  <UModal
    v-model:open="open"
    title="Sotuv hisoboti"
    description="Smena yakunidagi ma'lumotlarni kiriting"
    :dismissible="!isLoading"
    :ui="{ footer: 'justify-end' }"
  >
    <UButton label="Yangi hisobot" icon="i-lucide-plus" />

    <template #body>
      <form id="sale-form" class="space-y-4" @submit.prevent="submit">
        <!-- Sana -->
        <UFormField label="Smena sanasi" required>
          <UPopover>
            <UButton
              color="neutral"
              variant="outline"
              icon="i-lucide-calendar"
              trailing-icon="i-lucide-chevron-down"
              class="w-full justify-between"
            >
              {{ dateLabel }}
            </UButton>
            <template #content>
              <UCalendar
                v-model="date"
                :max-value="maxDate"
                :week-starts-on="1"
                prevent-deselect
                class="p-2"
              />
            </template>
          </UPopover>
        </UFormField>

        <!-- Sotuv -->
        <div class="grid grid-cols-2 gap-3">
          <UFormField label="Sotilgan (kub)" required>
            <UInput
              v-model.number="form.volume"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              class="w-full"
            />
          </UFormField>
          <UFormField label="1 kub narxi" required>
            <UInput
              v-model.number="form.pricePerCube"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </UFormField>
        </div>

        <!-- Olingan pul -->
        <div class="grid grid-cols-3 gap-3">
          <UFormField label="Naqd">
            <UInput
              v-model.number="form.cash"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Terminal">
            <UInput
              v-model.number="form.terminal"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Perechisleniya">
            <UInput
              v-model.number="form.transfer"
              type="number"
              min="0"
              placeholder="0"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField label="Izoh">
          <UTextarea v-model="form.comment" :rows="2" class="w-full" />
        </UFormField>

        <!-- Hisob-kitob -->
        <div
          class="space-y-1 rounded-lg border border-default bg-elevated/50 p-3 text-sm"
        >
          <div class="flex justify-between">
            <span class="text-muted">Jami summa</span>
            <span class="font-medium">{{ money(totalAmount) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">Olingan pul</span>
            <span class="font-medium">{{ money(received) }}</span>
          </div>
          <div class="flex justify-between border-t border-default pt-1">
            <span class="text-muted">Farq</span>
            <span
              class="font-semibold"
              :class="
                difference > 0
                  ? 'text-success'
                  : difference < 0
                    ? 'text-error'
                    : ''
              "
            >
              {{ difference > 0 ? "+" : "" }}{{ money(difference) }}
            </span>
          </div>
        </div>
      </form>
    </template>

    <template #footer="{ close }">
      <UButton
        label="Bekor qilish"
        color="neutral"
        variant="outline"
        :disabled="isLoading"
        @click="close"
      />
      <UButton
        type="submit"
        form="sale-form"
        label="Saqlash"
        :loading="isLoading"
      />
    </template>
  </UModal>
</template>
