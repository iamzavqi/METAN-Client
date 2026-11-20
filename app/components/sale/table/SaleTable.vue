<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { formatDate, formatMoney, formatNumber } from "~/utils/format";
import { useSaleStore } from "~/stores/sale/sale";

const authStore = useAuthStore();
const saleStore = useSaleStore();

// Tekshirish modali
const reviewOpen = ref(false);
const selectedSale = ref<any>(null);

const openReview = (sale: any) => {
  selectedSale.value = sale;
  reviewOpen.value = true;
};

const loading = ref(true);
onMounted(async () => {
  try {
    await saleStore.getSales();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <!-- Yuklanmoqda -->
    <div v-if="loading" class="space-y-3">
      <USkeleton v-for="i in 3" :key="i" class="h-20 w-full rounded-xl" />
    </div>

    <!-- Bo'sh holat -->
    <div
      v-else-if="!saleStore.sales.length"
      class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default py-16 text-center"
    >
      <div
        class="flex size-12 items-center justify-center rounded-xl bg-elevated"
      >
        <UIcon name="i-lucide-receipt-text" class="size-6 text-dimmed" />
      </div>
      <p class="mt-4 font-medium text-highlighted">Hali sotuv hisoboti yo'q</p>
      <p class="mt-1 text-sm text-muted">
        Kassir smena hisobotini kiritgach, shu yerda ko'rinadi
      </p>
    </div>

    <template v-else>
      <!-- ================= Telefon: kartochkalar ================= -->
      <div class="space-y-3 md:hidden">
        <div
          v-for="s in saleStore.sales"
          :key="s._id"
          class="rounded-2xl border border-default bg-default p-4 shadow-xs"
        >
          <!-- Sana va holat -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <UIcon name="i-lucide-calendar-days" class="size-5" />
              </div>
              <div>
                <p class="text-sm font-semibold text-highlighted">
                  {{ formatDate(s.date) }}
                </p>
                <p class="text-xs text-muted">Smena hisoboti</p>
              </div>
            </div>

            <UButton
              v-if="s.status === 'pending' && authStore.hasRole('moliyachi')"
              label="Kutilmoqda"
              color="warning"
              variant="subtle"
              size="sm"
              icon="i-lucide-clock"
              trailing-icon="i-lucide-chevron-right"
              @click="openReview(s)"
            />
            <UBadge
              v-else
              :label="
                s.status === 'approved'
                  ? 'Tasdiqlangan'
                  : s.status === 'rejected'
                    ? 'Rad etilgan'
                    : 'Kutilmoqda'
              "
              :color="
                s.status === 'approved'
                  ? 'success'
                  : s.status === 'rejected'
                    ? 'error'
                    : 'warning'
              "
              variant="subtle"
              size="sm"
            />
          </div>

          <!-- Jami summa -->
          <div class="mt-4">
            <p class="text-xs text-muted">Jami summa</p>
            <p
              class="text-2xl font-bold tracking-tight text-highlighted tabular-nums"
            >
              {{ formatMoney(s.totalAmount) }}
            </p>
            <p class="mt-0.5 text-xs text-muted tabular-nums">
              {{ formatNumber(s.volume) }} kub ×
              {{ formatNumber(s.pricePerCube) }} so'm
            </p>
          </div>

          <!-- Taqsimot chizig'i -->
          <div class="mt-4 flex h-2 overflow-hidden rounded-full bg-elevated">
            <div
              class="bg-emerald-500"
              :style="{
                width:
                  (s.cash / (s.cash + s.terminal + s.transfer || 1)) * 100 +
                  '%',
              }"
            />
            <div
              class="bg-sky-500"
              :style="{
                width:
                  (s.terminal / (s.cash + s.terminal + s.transfer || 1)) * 100 +
                  '%',
              }"
            />
            <div
              class="bg-violet-500"
              :style="{
                width:
                  (s.transfer / (s.cash + s.terminal + s.transfer || 1)) * 100 +
                  '%',
              }"
            />
          </div>

          <!-- To'lovlar -->
          <div class="mt-3 grid grid-cols-3 gap-2">
            <div>
              <div class="flex items-center gap-1.5 text-[11px] text-muted">
                <span class="size-2 rounded-full bg-emerald-500" />
                Naqd
              </div>
              <p
                class="mt-0.5 text-sm font-medium text-highlighted tabular-nums"
              >
                {{ formatNumber(s.cash) }}
              </p>
            </div>
            <div>
              <div class="flex items-center gap-1.5 text-[11px] text-muted">
                <span class="size-2 rounded-full bg-sky-500" />
                Terminal
              </div>
              <p
                class="mt-0.5 text-sm font-medium text-highlighted tabular-nums"
              >
                {{ formatNumber(s.terminal) }}
              </p>
            </div>
            <div>
              <div class="flex items-center gap-1.5 text-[11px] text-muted">
                <span class="size-2 rounded-full bg-violet-500" />
                Perech.
              </div>
              <p
                class="mt-0.5 text-sm font-medium text-highlighted tabular-nums"
              >
                {{ formatNumber(s.transfer) }}
              </p>
            </div>
          </div>

          <!-- Kassir va farq -->
          <div
            class="mt-4 flex items-center justify-between border-t border-default pt-3"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex size-7 items-center justify-center rounded-full bg-elevated text-[11px] font-semibold uppercase text-muted"
              >
                {{ s.userId?.fName?.[0] }}{{ s.userId?.lName?.[0] }}
              </div>
              <span class="text-sm capitalize text-muted">
                {{ s.userId?.fName }} {{ s.userId?.lName?.[0] }}.
              </span>
            </div>
            <span
              v-if="s.difference > 0"
              class="rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success tabular-nums"
            >
              +{{ formatNumber(s.difference) }}
            </span>
            <span v-else class="text-xs text-dimmed">Farq yo'q</span>
          </div>

          <p
            v-if="s.comment"
            class="mt-3 rounded-lg bg-elevated/60 px-3 py-2 text-xs text-muted"
          >
            {{ s.comment }}
          </p>
        </div>
      </div>

      <!-- ================= Kompyuter: jadval ================= -->
      <div
        class="hidden overflow-x-auto rounded-2xl border border-default bg-default shadow-xs md:block"
      >
        <table class="w-full text-sm">
          <thead>
            <tr
              class="border-b border-default bg-elevated/40 text-left text-xs font-medium uppercase tracking-wide text-muted"
            >
              <th class="px-4 py-3">Sana</th>
              <th class="px-4 py-3">Sotuv</th>
              <th class="px-4 py-3">Jami summa</th>
              <th class="px-4 py-3">To'lov taqsimoti</th>
              <th class="px-4 py-3 text-right">Farq</th>
              <th class="px-4 py-3">Kassir</th>
              <th class="px-4 py-3">Holat</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-default">
            <tr
              v-for="s in saleStore.sales"
              :key="s._id"
              class="transition-colors hover:bg-elevated/40"
            >
              <!-- Sana -->
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-3 whitespace-nowrap">
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  >
                    <UIcon name="i-lucide-calendar-days" class="size-4" />
                  </div>
                  <span class="font-medium text-highlighted">
                    {{ formatDate(s.date) }}
                  </span>
                </div>
              </td>

              <!-- Sotuv -->
              <td class="whitespace-nowrap px-4 py-3.5 tabular-nums">
                <p class="font-medium text-highlighted">
                  {{ formatNumber(s.volume) }} kub
                </p>
                <p class="text-xs text-muted">
                  × {{ formatNumber(s.pricePerCube) }} so'm
                </p>
              </td>

              <!-- Jami -->
              <td
                class="whitespace-nowrap px-4 py-3.5 font-semibold text-highlighted tabular-nums"
              >
                {{ formatMoney(s.totalAmount) }}
              </td>

              <!-- Taqsimot -->
              <td class="px-4 py-3.5">
                <div class="w-60">
                  <div
                    class="flex h-1.5 overflow-hidden rounded-full bg-elevated"
                  >
                    <div
                      class="bg-emerald-500"
                      :style="{
                        width:
                          (s.cash / (s.cash + s.terminal + s.transfer || 1)) *
                            100 +
                          '%',
                      }"
                    />
                    <div
                      class="bg-sky-500"
                      :style="{
                        width:
                          (s.terminal /
                            (s.cash + s.terminal + s.transfer || 1)) *
                            100 +
                          '%',
                      }"
                    />
                    <div
                      class="bg-violet-500"
                      :style="{
                        width:
                          (s.transfer /
                            (s.cash + s.terminal + s.transfer || 1)) *
                            100 +
                          '%',
                      }"
                    />
                  </div>
                  <div
                    class="mt-2 flex justify-between gap-2 text-[11px] text-muted tabular-nums"
                  >
                    <span class="flex items-center gap-1">
                      <span class="size-1.5 rounded-full bg-emerald-500" />
                      {{ formatNumber(s.cash) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="size-1.5 rounded-full bg-sky-500" />
                      {{ formatNumber(s.terminal) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="size-1.5 rounded-full bg-violet-500" />
                      {{ formatNumber(s.transfer) }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Farq -->
              <td class="px-4 py-3.5 text-right">
                <span
                  v-if="s.difference > 0"
                  class="rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success tabular-nums"
                >
                  +{{ formatNumber(s.difference) }}
                </span>
                <span v-else class="text-dimmed">—</span>
              </td>

              <!-- Kassir -->
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2 whitespace-nowrap">
                  <div
                    class="flex size-7 items-center justify-center rounded-full bg-elevated text-[11px] font-semibold uppercase text-muted"
                  >
                    {{ s.userId?.fName?.[0] }}{{ s.userId?.lName?.[0] }}
                  </div>
                  <span class="capitalize">
                    {{ s.userId?.fName }} {{ s.userId?.lName?.[0] }}.
                  </span>
                </div>
              </td>

              <!-- Holat -->
              <td class="px-4 py-3.5">
                <UButton
                  v-if="s.status === 'pending' && authStore.hasRole('moliyachi')"
                  label="Kutilmoqda"
                  color="warning"
                  variant="subtle"
                  size="sm"
                  icon="i-lucide-clock"
                  trailing-icon="i-lucide-chevron-right"
                  @click="openReview(s)"
                />
                <UBadge
                  v-else
                  :label="
                    s.status === 'approved'
                      ? 'Tasdiqlangan'
                      : s.status === 'rejected'
                        ? 'Rad etilgan'
                        : 'Kutilmoqda'
                  "
                  :color="
                    s.status === 'approved'
                      ? 'success'
                      : s.status === 'rejected'
                        ? 'error'
                        : 'warning'
                  "
                  variant="subtle"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Tekshirish modali -->
    <SaleReviewModal
      v-model:open="reviewOpen"
      :sale="selectedSale"
      @approve="(id) => console.log('tasdiqlash:', id)"
      @reject="(id) => console.log('rad etish:', id)"
    />
  </div>
</template>