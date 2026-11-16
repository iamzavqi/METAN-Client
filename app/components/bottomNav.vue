<script setup lang="ts">
const route = useRoute();
const isActive = (path: string) => route.path === path;

// Pastki menyu uchun eng muhim 5 ta yo'nalish
const navItems = [
  { name: "Asosiy", path: "/", icon: "si:dashboard-fill" },
  { name: "Hamyon", path: "/menu/wallet", icon: "solar:wallet-bold" },
  {
    name: "Tranzaksiya",
    path: "/menu/transaction",
    icon: "grommet-icons:transaction",
    primary: true,
  },
  { name: "Xodimlar", path: "/menu/worker", icon: "solar:user-bold" },
  {
    name: "Kategoriya",
    path: "/menu/category",
    icon: "material-symbols:category-rounded",
  },
];
</script>

<template>
  <nav
    class="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none"
  >
    <div
      class="max-w-md mx-auto h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-around px-2 pointer-events-auto relative"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300"
        :class="[
          isActive(item.path)
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-400 dark:text-slate-500',
          item.primary ? '-top-1' : '',
        ]"
      >
        <div
          v-if="item.primary"
          class="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40 flex items-center justify-center text-white mb-1 transform transition-transform active:scale-90"
        >
          <UIcon :name="item.icon" class="text-2xl" />
        </div>

        <template v-else>
          <div class="relative">
            <UIcon
              :name="item.icon"
              class="text-xl transition-transform duration-300"
              :class="isActive(item.path) ? 'scale-110' : ''"
            />
            <div
              v-if="isActive(item.path)"
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"
            ></div>
          </div>
          <span class="text-[10px] mt-1 font-semibold tracking-tight">{{
            item.name
          }}</span>
        </template>

        <div
          v-if="isActive(item.path) && !item.primary"
          class="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-xl -z-10"
        ></div>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
/* Tugmani bosganda paydo bo'ladigan yengil effekt */
.router-link-active {
  -webkit-tap-highlight-color: transparent;
}
</style>
