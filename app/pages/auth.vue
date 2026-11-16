<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "~/stores/auth";

useHead({
  title: "Tizimga kirish | Authorization",
});

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();
const toast = useToast();

// Formning holati
const state = reactive({
  userName: "",
  password: "",
});

// Yuklanish holati (knopkada spinner aylanishi uchun)
const isLoading = ref(false);

const login = async () => {
  // Validatsiya
  if (!state.userName || !state.password) {
    toast.add({
      title: "Ma'lumotlar to'liq emas!",
      description: "Iltimos, login va parolni kiriting.",
      color: "error",
      icon: "i-heroicons-exclamation-circle-20-solid",
    });
    return;
  }

  isLoading.value = true;
  await authStore.login(state);
  isLoading.value = false;
};
</script>

<template>
  <!-- Orqa fon uchun nafis gradient va ranglar -->
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8"
  >
    <UCard
      class="w-full max-w-105 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800"
    >
      <!-- Header qismi -->
      <div class="text-center mb-8">
        <div
          class="mx-auto w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-indigo-100 dark:ring-indigo-800/50"
        >
          <UIcon
            name="hugeicons:login-method"
            class="w-8 h-8 text-indigo-600 dark:text-indigo-400"
          />
        </div>
        <h1
          class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
        >
          Xush kelibsiz
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Hisobingizga kirish uchun ma'lumotlarni kiriting
        </p>
      </div>

      <!-- Form qismi -->
      <form
        @submit.prevent="login"
        class="space-y-5 flex flex-col items-center"
      >
        <!-- Username input (UFormGroup orqali chiroyli label) -->
        <UFormField label="Foydalanuvchi nomi" required>
          <UInput
            v-model="state.userName"
            placeholder="admin"
            size="lg"
            autocomplete="username"
          />
        </UFormField>

        <!-- Password input -->
        <UFormField label="Parol" required>
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
            size="lg"
            autocomplete="current-password"
          />
        </UFormField>

        <!-- Eslab qolish va parolni tiklash (vizual qo'shimcha) -->
        <div class="flex items-center gap-2 justify-between text-sm">
          <span
            class="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400"
          >
            <UCheckbox name="remember" />
            <span>Meni eslab qol</span>
          </span>
          <span
            href="#"
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
          >
            Parolni unutdingizmi?
          </span>
        </div>

        <!-- Submit button -->
        <UButton
          type="submit"
          size="lg"
          block
          :loading="isLoading"
          class="font-semibold mt-2"
        >
          {{ isLoading ? "Kutib turing..." : "Tizimga kirish" }}
        </UButton>
      </form>
    </UCard>

    <!-- Dizayn uchun orqa fondagi blur effekt (ixtiyoriy) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute -top-1/2 -right-1/4 w-200 h-200 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply"
      ></div>
      <div
        class="absolute -bottom-1/2 -left-1/4 w-150 h-150 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply"
      ></div>
    </div>
  </div>
</template>
