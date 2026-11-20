<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { formatMoney } from "~/utils/format";
import { useWalletStore } from "~/stores/kassa/wallet";

const walletStore = useWalletStore();
const toast = useToast();

const loading = ref(true);
onMounted(async () => {
  try {
    await walletStore.getWallets();
  } finally {
    loading.value = false;
  }
});

// Barcha hamyonlardagi jami pul
const totalBalance = computed(() =>
  walletStore.wallets.reduce(
    (sum: number, w: any) => sum + (Number(w.balance) || 0),
    0,
  ),
);

// Har bir rang uchun kartochka foni (Tailwind klasslari to'liq yozilishi shart)
const gradients: Record<string, string> = {
  emerald: "from-emerald-500 to-emerald-700",
  sky: "from-sky-500 to-sky-700",
  violet: "from-violet-500 to-violet-700",
  amber: "from-amber-500 to-amber-700",
  rose: "from-rose-500 to-rose-700",
  slate: "from-slate-600 to-slate-800",
};

// 20208000900123456789 → 2020 8000 9001 2345 6789
// Raqam kelsa ham ishlaydi
const groupNumber = (n: string | number) =>
  String(n).replace(/(\d{4})(?=\d)/g, "$1 ");

const copyNumber = async (n: string | number) => {
  try {
    await navigator.clipboard.writeText(String(n));
    toast.add({
      title: "Nusxa olindi",
      description: groupNumber(n),
      icon: "i-lucide-copy-check",
    });
  } catch {
    toast.add({
      title: "Nusxa olib bo'lmadi",
      color: "error",
      icon: "clarity:error-solid",
    });
  }
};
</script>

<template>
  <div class="space-y-4">
    <!-- ================= Yuklanmoqda ================= -->
    <template v-if="loading">
      <USkeleton class="h-20 w-full rounded-2xl" />
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <USkeleton v-for="i in 3" :key="i" class="h-56 w-full rounded-2xl" />
      </div>
    </template>

    <!-- ================= Bo'sh holat ================= -->
    <div
      v-else-if="!walletStore.wallets.length"
      class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default py-16 text-center"
    >
      <div
        class="flex size-12 items-center justify-center rounded-xl bg-elevated"
      >
        <UIcon name="i-lucide-wallet" class="size-6 text-dimmed" />
      </div>
      <p class="mt-4 font-medium text-highlighted">Hali hamyon yo'q</p>
      <p class="mt-1 text-sm text-muted">
        Naqd kassa yoki bank hisobini qo'shing
      </p>
    </div>

    <template v-else>
      <!-- ================= Jami qoldiq ================= -->
      <div
        class="flex items-center justify-between rounded-2xl border border-default bg-default px-5 py-4"
      >
        <div>
          <p class="text-xs text-muted">Jami qoldiq</p>
          <p
            class="text-2xl font-bold tracking-tight tabular-nums"
            :class="totalBalance < 0 ? 'text-error' : 'text-highlighted'"
          >
            {{ formatMoney(totalBalance) }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-xs text-muted">Hamyonlar</p>
          <p class="text-lg font-semibold text-highlighted">
            {{ walletStore.wallets.length }} ta
          </p>
        </div>
      </div>

      <!-- ================= Kartochkalar ================= -->
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="w in walletStore.wallets"
          :key="w._id"
          class="relative flex h-56 flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
          :class="gradients[w.color] ?? gradients.slate"
        >
          <!-- Fon bezaklari -->
          <div
            class="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10"
          />
          <div
            class="pointer-events-none absolute -bottom-16 -right-4 size-40 rounded-full bg-white/5"
          />

          <!-- Tepa: turi, nomi, ikonka -->
          <div class="relative flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p
                class="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70"
              >
                {{ w.bankNumber ? "Bank hisobi" : "Naqd kassa" }}
              </p>
              <h3 class="mt-1 truncate text-base font-semibold leading-tight">
                {{ w.walletName }}
              </h3>
            </div>
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur"
            >
              <UIcon
                :name="w.bankNumber ? 'i-lucide-landmark' : 'i-lucide-banknote'"
                class="size-5"
              />
            </div>
          </div>

          <!-- O'rta: qoldiq -->
          <div class="relative">
            <p class="text-[10px] uppercase tracking-wider text-white/60">
              Qoldiq
            </p>
            <div class="mt-0.5 flex items-center gap-2">
              <p class="truncate text-2xl font-bold tracking-tight tabular-nums">
                {{ formatMoney(Number(w.balance) || 0) }}
              </p>
              <UIcon
                v-if="(Number(w.balance) || 0) < 0"
                name="i-lucide-triangle-alert"
                class="size-5 shrink-0"
              />
            </div>
          </div>

          <!-- Pastki qism: hisob raqami -->
          <div class="relative">
            <template v-if="w.bankNumber">
              <p class="text-[10px] uppercase tracking-wider text-white/60">
                Hisob raqami
              </p>
              <div class="mt-0.5 flex items-center justify-between gap-2">
                <p class="truncate font-mono text-sm tracking-wider tabular-nums">
                  {{ groupNumber(w.bankNumber) }}
                </p>
                <button
                  type="button"
                  class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/15 opacity-80 transition hover:bg-white/25 hover:opacity-100"
                  aria-label="Hisob raqamidan nusxa olish"
                  @click="copyNumber(w.bankNumber)"
                >
                  <UIcon name="i-lucide-copy" class="size-3.5" />
                </button>
              </div>
            </template>

            <p v-else class="flex items-center gap-2 text-xs text-white/70">
              <UIcon name="i-lucide-hand-coins" class="size-4" />
              Naqd pul uchun
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>