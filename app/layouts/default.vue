<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";


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
    class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-default transition-colors duration-300"
  >
    <div class="flex mx-auto">
      <div
        class="hidden sm:block w-64 h-screen sticky top-0 overflow-hidden border-r border-default z-20"
      >
        <menu-bar />
      </div>

      <div
        class="flex-1 w-full min-w-0 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8 pb-28 sm:pb-8"
      >
        <div class="sticky top-3 sm:top-4 z-10 mb-4 sm:mb-6">
          <HeroBar />
        </div>
        <slot></slot>
      </div>
    </div>

    <BottomNav />
  </div>
</template>