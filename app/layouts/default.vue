<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

// Agar Nuxt avtomatik topa olmasa, shu yerdan izohdan (commentdan) chiqarib qo'lda import qilishingiz mumkin:
// import BottomNav from '~/components/BottomNav.vue'
// import MenuBar from '~/components/menu-bar.vue'
// import HeroBar from '~/components/HeroBar.vue'

// Mobil menyuni boshqarish uchun o'zgaruvchi
const isMobileMenuOpen = ref(false);
const route = useRoute();

// Sahifa o'zgarganda mobil menyuni avtomatik yopish
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  },
);

const { connect } = useSocket();

onMounted(() => {
  connect();
});
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 transition-colors duration-300"
  >
    <div class="flex mx-auto">
      <div
        class="hidden sm:block w-64 h-screen sticky top-0 overflow-hidden border-r border-gray-100 dark:border-gray-800/60 z-20"
      >
        <menu-bar />
      </div>

      <div class="flex-1 w-full min-w-0 p-3 sm:p-6 lg:p-8 pb-24 sm:pb-8">
        <div class="sticky top-0 z-10 mb-4 sm:mb-6">
          <HeroBar />
        </div>
        <slot></slot>
      </div>
    </div>

    <BottomNav />
  </div>
</template>
