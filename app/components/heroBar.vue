<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: "si:dashboard-fill",
  },
   {
    name: "Kassa",
    path: "/kassa",
    icon: "andrsrxn:money-check",
  },
];

const route = useRoute();
const isActive = (path: string) => route.path === path;

import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <!-- Yuqori panel (Header) -->
  <header
    class="flex h-14 sm:h-16 items-center justify-between gap-3 rounded-2xl border border-default bg-default/80 px-3 sm:px-5 shadow-sm backdrop-blur-xl"
  >
    <!-- Chap qism -->
    <div class="flex min-w-0 items-center gap-3">
      <!-- Mobil logo (sidebar yashiringanda ko'rinadi) -->
      <div class="flex items-center gap-2.5 sm:hidden">
        <div
          class="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30"
        >
          <UIcon name="i-lucide-trending-up" class="size-4.5" />
        </div>
        <span class="text-[15px] font-semibold tracking-tight text-highlighted">
          YuGaz
        </span>
      </div>

      <!-- Joriy sahifa nomi (katta ekranda) -->
      <template v-for="item in routes" :key="item.path">
        <div
          v-if="isActive(item.path)"
          class="hidden min-w-0 items-center gap-3 sm:flex"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <UIcon :name="item.icon" class="size-4.5" />
          </div>
          <div class="min-w-0">
            <p class="flex items-center gap-1.5 text-[11px] leading-none text-dimmed">
              YuGaz
              <UIcon name="i-lucide-chevron-right" class="size-3" />
              {{ item.name }}
            </p>
            <h2
              class="mt-1.5 truncate text-base font-semibold leading-none tracking-tight text-highlighted"
            >
              {{ item.name }}
            </h2>
          </div>
        </div>
      </template>
    </div>

    <!-- O'ng qism: Dark Mode va Profil -->
    <div class="flex shrink-0 items-center gap-2 sm:gap-3">
      <!-- Tungi/Kunduzgi rejim tugmasi -->
      <UButton
        @click.stop="isDark = !isDark;"
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="ghost"
        class="rounded-lg"
        aria-label="Mavzuni o'zgartirish"
      />

      <span class="h-6 w-px bg-border"></span>

      <!-- Profil -->
      <div class="flex items-center gap-2.5">
        <div class="hidden flex-col text-right md:flex">
          <span
            class="mb-1 text-[13px] font-semibold leading-none text-highlighted capitalize"
            >{{ authStore.user?.fName }} {{ authStore.user?.lName[0] }}.</span
          >
          <span class="text-[11px] leading-none text-muted">{{
            authStore.user?.role
          }}</span>
        </div>
        <div
          class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold uppercase text-primary ring-1 ring-primary/20"
        >
          {{ authStore.user?.fName?.[0] }}
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Scrollbarni yashirish (agar menyu ko'payib ketsa xunuk ko'rinmasligi uchun) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>