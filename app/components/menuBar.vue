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
  /* {
    name: "Hamyon",
    path: "/menu/wallet",
    icon: "solar:wallet-bold",
  },
  {
    name: "Nachisleniya",
    path: "/menu/nachisleniya",
    icon: "fluent:notepad-edit-16-filled",
  },
  {
    name: "Kirim | Chiqim",
    path: "/menu/transaction",
    icon: "grommet-icons:transaction",
  },
  {
    name: "Xodimlar",
    path: "/menu/worker",
    icon: "solar:user-bold",
  },
  { name: "Asosiy vosita", path: "/menu/asset", icon: "i-lucide-building" },
  {
    name: "Kategoriyalar",
    path: "/menu/category",
    icon: "material-symbols:category-rounded",
  }, */
];

const route = useRoute();
const isActive = (path: string) => route.path === path;

import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <!-- Asosiy Sidebar qutisi -->
  <aside
    class="w-64 h-screen flex flex-col px-4 py-6 bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl"
  >
    <!-- Logo qismi -->
    <div class="flex items-center gap-3 px-2 mb-8">
      <div
        class="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white transform transition-transform hover:rotate-3 hover:scale-105 cursor-pointer"
      >
        <UIcon name="i-lucide-trending-up" class="text-xl" />
      </div>
      <div>
        <h1
          class="text-sm font-bold text-gray-900 dark:text-white tracking-wide"
        >
          Moliya
        </h1>
        <p
          class="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest"
        >
          Boshqaruv tizimi
        </p>
      </div>
    </div>

    <!-- Menyu (Navigatsiya) -->
    <nav
      class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide -mx-2 px-2"
    >
      <ul class="flex flex-col gap-1.5">
        <li v-for="item in routes" :key="item.path">
          <NuxtLink
            :to="item.path"
            class="relative group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-300 outline-none"
            :class="
              isActive(item.path)
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
            "
          >
            <!-- Faol holat indikatori (Chapdagi chiziqcha) -->
            <div
              v-if="isActive(item.path)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 dark:bg-blue-400 rounded-r-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"
            ></div>

            <!-- Ikonka (Hover qilinganda biroz kattalashadi) -->
            <UIcon
              :name="item.icon"
              class="text-[18px] transition-transform duration-300 group-hover:scale-110"
              :class="
                isActive(item.path)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              "
            />

            <span class="text-sm">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Pastki qism: Profil va Dark Mode -->
    <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
      <div
        class="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
      >
        <div class="flex items-center gap-3">
          <!-- Avatar atrofiga hoshiya (ring) berildi -->

          <div class="flex flex-col text-left">
            <span
              class="text-[13px] font-semibold text-gray-900 dark:text-white leading-none mb-1 capitalize"
              >{{ authStore.user?.fName }} {{ authStore.user?.lName[0] }}.</span
            >
            <span
              class="text-[11px] text-gray-500 dark:text-gray-400 leading-none"
              >{{ authStore.user?.role }}</span
            >
          </div>
        </div>

        <!-- Tungi/Kunduzgi rejim tugmasi (UButton variant="ghost") -->
        <UButton
          @click.stop="isDark = !isDark;"
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          variant="ghost"
          class="rounded-lg transition-transform hover:scale-105 active:scale-95"
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
