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
    name: "Sotuv",
    path: "/sale",
    icon: "reicon:ticket-sale-filled",
    roles: ["director", "ceo", "moliyachi", "kassir",],
  },
  {
    name: "Kassa",
    path: "/kassa",
    icon: "andrsrxn:money-check",
    roles: ["director", "ceo", "moliyachi",],
  },
  {
    name: "Shartnoma",
    path: "/contract",
    icon: "andrsrxn:file-content",
    roles: ["director", "ceo", "moliyachi",],
  },
 /*  {
    name: "Hamyon",
    path: "/menu/wallet",
    icon: "solar:wallet-bold",
    roles: ["admin", "director", "ceo", "moliyachi", "kassir"],
  },
  {
    name: "Nachisleniya",
    path: "/menu/nachisleniya",
    icon: "fluent:notepad-edit-16-filled",
    roles: ["admin", "director", "ceo", "moliyachi", "bugalter"],
  },
  {
    name: "Kirim | Chiqim",
    path: "/menu/transaction",
    icon: "grommet-icons:transaction",
    roles: ["admin", "director", "ceo", "moliyachi", "bugalter", "kassir"],
  },
  {
    name: "Xodimlar",
    path: "/menu/worker",
    icon: "solar:user-bold",
    roles: ["admin", "director", "ceo", "moliyachi"],
  },

  {
    name: "Kategoriyalar",
    path: "/menu/category",
    icon: "material-symbols:category-rounded",
    roles: ["admin", "director"],
  }, */
];

const visibleRoutes = computed(() =>
  routes.filter((item) => !item.roles || authStore.hasRole(...item.roles)),
);

const route = useRoute();
const isActive = (path: string) => route.path === path;

import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <!-- Asosiy Sidebar qutisi -->
  <aside class="w-64 h-screen flex flex-col bg-default">
    <!-- Logo qismi -->
    <div class="flex h-20 shrink-0 items-center gap-3 px-5">
      <div
        class="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <UIcon name="icon-park-solid:level" class="size-5" />
      </div>
      <div class="min-w-0">
        <h1
          class="text-[15px] font-semibold leading-tight tracking-tight text-highlighted"
        >
          YuGaz
        </h1>
        <p
          class="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-dimmed"
        >
          Boshqaruv tizimi
        </p>
      </div>
    </div>

    <!-- Menyu (Navigatsiya) -->
    <nav
      class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-3 pt-2"
    >
      <p
        class="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.12em] text-dimmed"
      >
        Asosiy menyu
      </p>
      <ul class="flex flex-col gap-1">
        <li v-for="item in visibleRoutes" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="relative group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
            :class="
              isActive(item.path)
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:bg-elevated hover:text-highlighted'
            "
          >
            <!-- Faol holat indikatori (Chapdagi chiziqcha) -->
            <div
              v-if="isActive(item.path)"
              class="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
            ></div>

            <!-- Ikonka -->
            <UIcon
              :name="item.icon"
              class="size-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
              :class="
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-dimmed group-hover:text-default'
              "
            />

            <span class="truncate">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Pastki qism: Profil va Dark Mode -->
    <div class="mt-auto shrink-0 p-3">
      <div
        class="flex items-center justify-between gap-2 rounded-xl border border-default bg-elevated/50 p-2.5 transition-colors hover:bg-elevated cursor-pointer group"
      >
        <div class="flex min-w-0 items-center gap-3">
          <!-- Avatar (ism bosh harfi) -->
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold uppercase text-primary"
          >
            {{ authStore.user?.fName?.[0] }}
          </div>

          <div class="flex min-w-0 flex-col text-left">
            <span
              class="mb-1 truncate text-[13px] font-semibold leading-none text-highlighted capitalize"
              >{{ authStore.user?.fName }} {{ authStore.user?.lName[0] }}.</span
            >
            <span class="truncate text-[11px] leading-none text-muted">{{
              authStore.user?.role
            }}</span>
          </div>
        </div>

        <!-- Tungi/Kunduzgi rejim tugmasi -->
        <UButton
          @click.stop="isDark = !isDark;"
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          size="sm"
          class="shrink-0 rounded-lg"
          aria-label="Mavzuni o'zgartirish"
        />
      </div>
    </div>
  </aside>
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