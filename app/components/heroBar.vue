<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();

const logOut = () => {
  authStore.logout();
};
</script>

<template>
  <!-- Glassmorphism effekti va sticky joylashuv -->
  <div
    class="sticky top-4 z-50 mb-8 p-3 px-5 rounded-2xl flex justify-between items-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300"
  >
    <!-- Sarlavha qismi -->

    <div class="text-xl font-bold capitalize">
      {{ authStore.user?.company }}
    </div>

    <!-- Amallar qismi -->
    <div class="flex items-center gap-2 sm:gap-4">
      <!-- Tungi/Kunduzgi rejim -->

      <!-- Sozlamalar -->
      <NuxtLink to="/setting">
        <UButton
          icon="uil:setting"
          variant="ghost"
          class="rounded-xl text-gray-400 transition-transform hover:scale-105"
          aria-label="Sozlamalar"
        />
      </NuxtLink>

      <!-- logout -->
      <UIcon
        name="lets-icons:on-button"
        class="text-xl cursor-pointer"
        @click="logOut()"
      />

      <!-- Ajratuvchi chiziq (Divider) -->
      <div
        class="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block mx-1"
      ></div>

      <!-- Foydalanuvchi profili -->
      <div class="mt-auto border-t border-gray-100 dark:border-gray-800">
        <div
          class="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
        >
          <div class="flex items-center gap-3">
            <!-- Avatar atrofiga hoshiya (ring) berildi -->

            <div class="flex flex-col text-left">
              <span
                class="text-[13px] font-semibold text-gray-900 dark:text-white leading-none mb-1 capitalize"
                >{{ authStore.user?.fName }}
                {{ authStore.user?.lName[0] }}.</span
              >
              <span
                class="text-[11px] text-gray-500 dark:text-gray-400 leading-none"
                >{{ authStore.user?.role }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
