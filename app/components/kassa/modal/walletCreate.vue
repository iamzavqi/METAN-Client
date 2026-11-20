<script setup lang="ts">
import { useWalletStore } from "~/stores/kassa/wallet";

const toast = useToast();
const walletStore = useWalletStore();

const open = ref(false);
const isLoading = ref(false);

// Tanlash uchun ranglar
const colors = ["emerald", "sky", "violet", "amber", "rose", "slate"] as const;
const colorClass: Record<(typeof colors)[number], string> = {
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  slate: "bg-slate-500",
};

// ---------- Forma ----------
const form = reactive({
  walletName: "",
  bankNumber: "", // string: 20 xonali raqam number'da buziladi
  color: "emerald" as (typeof colors)[number],
});

const resetForm = () => {
  Object.assign(form, {
    walletName: "",
    bankNumber: "",
    color: "emerald",
  });
};

const submit = async () => {
  // 1. Majburiy maydon
  if (!form.walletName.trim()) {
    toast.add({
      title: "Ma'lumot to'liq emas",
      description: "Hamyon nomini kiriting",
      color: "error",
      icon: "clarity:error-solid",
    });
    return;
  }

  // 2. Hisob raqami: yozilgan bo'lsa, faqat 20 ta raqam
  const bankNumber = form.bankNumber.replace(/\s/g, "");
  if (bankNumber && !/^\d{20}$/.test(bankNumber)) {
    toast.add({
      title: "Hisob raqami noto'g'ri",
      description: "Hisob raqami 20 ta raqamdan iborat bo'lishi kerak",
      color: "error",
      icon: "clarity:error-solid",
    });
    return;
  }

  // 3. Backendga ketadigan ma'lumot
  const payload = {
    walletName: form.walletName.trim(),
    bankNumber: bankNumber || undefined,
    color: form.color,
  };

  isLoading.value = true;
  const ok = await walletStore.createWallet(payload);
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
    title="Yangi hamyon"
    description="Naqd kassa yoki bank hisobini qo'shing"
    :dismissible="!isLoading"
    :ui="{ footer: 'justify-end' }"
  >
    <UButton label="Hamyon qo'shish" icon="i-lucide-plus" />

    <template #body>
      <form id="wallet-form" class="space-y-4" @submit.prevent="submit">
        <UFormField label="Hamyon nomi" required>
          <UInput
            v-model="form.walletName"
            placeholder="Masalan: Asosiy kassa"
            icon="i-lucide-wallet"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Bank hisob raqami"
          hint="Ixtiyoriy"
          description="Naqd kassa uchun bo'sh qoldiring"
        >
          <UInput
            v-model="form.bankNumber"
            inputmode="numeric"
            maxlength="24"
            placeholder="20208000900123456789"
            icon="i-lucide-landmark"
            class="w-full font-mono"
          />
        </UFormField>

        <UFormField label="Rang">
          <div class="flex gap-2">
            <UButton
              v-for="c in colors"
              :key="c"
              type="button"
              class="size-8 rounded-full ring-offset-2 ring-offset-bg transition"
              :class="[colorClass[c], form.color === c ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100']"
              :aria-label="c"
              @click="form.color = c;"
            />
          </div>
        </UFormField>
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
        form="wallet-form"
        label="Saqlash"
        :loading="isLoading"
      />
    </template>
  </UModal>
</template>