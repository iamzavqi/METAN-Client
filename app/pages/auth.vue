<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

useHead({
  title: "Tizimga kirish | Authorization",
});

definePageMeta({
  layout: "auth",
});

const {disconnect} = useSocket()

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

onMounted(() => {
  disconnect()
})
</script>

<template>
  <div class="min-h-screen grid lg:grid-cols-2 bg-default">
    <!-- Chap panel: brend qismi (faqat katta ekranda) -->
    <aside
      class="relative hidden lg:flex flex-col justify-between overflow-hidden bg-neutral-950 p-12 xl:p-16 text-white"
    >
      <!-- Fon: to'r va yorug'lik -->
      <div
        class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
      ></div>
      <div
        class="pointer-events-none absolute -top-40 -left-40 size-128 rounded-full bg-primary/25 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-48 -right-32 size-112 rounded-full bg-primary/10 blur-3xl"
      ></div>

      <!-- Logo -->
      <div class="relative flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
        >
          <UIcon name="icon-park-solid:level" class="size-5 text-white" />
        </div>
        <span class="text-lg font-semibold tracking-tight">YuGaz</span>
      </div>

      <!-- Asosiy matn -->
      <div class="relative max-w-md">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur"
        >
          <span class="size-1.5 rounded-full bg-primary"></span>
          Ichki boshqaruv tizimi
        </span>
        <h2
          class="mt-6 text-4xl xl:text-5xl font-semibold leading-tight tracking-tight"
        >
          YuGaz —
          <span class="text-primary">hammasi bir joyda.</span>
        </h2>
        <p class="mt-5 text-base leading-relaxed text-white/60">
          Kirim-chiqim, hisobotlar va ichki jarayonlarni yagona tizimda
          boshqaring.
        </p>

        <ul class="mt-10 space-y-4">
          <li class="flex items-center gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            >
              <UIcon
                name="i-lucide-arrow-left-right"
                class="size-5 text-primary"
              />
            </span>
            <span class="text-sm text-white/80"
              >Kirim va chiqimlar nazorati</span
            >
          </li>
          <li class="flex items-center gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            >
              <UIcon name="i-lucide-chart-column" class="size-5 text-primary" />
            </span>
            <span class="text-sm text-white/80">Aniq va tezkor hisobotlar</span>
          </li>
          <li class="flex items-center gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            >
              <UIcon name="i-lucide-shield-check" class="size-5 text-primary" />
            </span>
            <span class="text-sm text-white/80"
              >Rollar asosida kirish huquqi</span
            >
          </li>
        </ul>
      </div>

      <!-- Pastki izoh -->
      <p class="relative flex items-center gap-2 text-xs text-white/40">
        <UIcon name="i-lucide-lock" class="size-3.5" />
        Faqat vakolatli xodimlar uchun
      </p>
    </aside>

    <!-- O'ng panel: forma -->
    <main class="relative flex items-center justify-center px-6 py-12 sm:px-12">
      <div class="w-full max-w-sm">
        <!-- Mobil logo -->
        <div class="mb-10 flex items-center gap-3 lg:hidden">
          <div
            class="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
          >
            <UIcon name="icon-park-solid:level" class="size-5 text-white" />
          </div>
          <span class="text-lg font-semibold tracking-tight text-highlighted">
            YuGaz
          </span>
        </div>

        <!-- Header qismi -->
        <div class="mb-8">
          <h1 class="text-3xl font-semibold tracking-tight text-highlighted">
            Xush kelibsiz
          </h1>
          <p class="mt-2 text-sm text-muted">
            Hisobingizga kirish uchun ma'lumotlarni kiriting
          </p>
        </div>

        <!-- Form qismi -->
        <form @submit.prevent="login" class="space-y-5">
          <!-- Username input -->
          <UFormField label="Foydalanuvchi nomi" required class="w-full">
            <UInput
              v-model="state.userName"
              placeholder="admin"
              size="xl"
              icon="i-lucide-user"
              autocomplete="username"
              class="w-full"
            />
          </UFormField>

          <!-- Password input -->
          <UFormField label="Parol" required class="w-full">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="••••••••"
              size="xl"
              icon="i-lucide-lock-keyhole"
              autocomplete="current-password"
              class="w-full"
            />
          </UFormField>

          <!-- Submit button -->
          <UButton
            type="submit"
            size="xl"
            block
            :loading="isLoading"
            trailing-icon="i-lucide-arrow-right"
            class="mt-2 font-semibold shadow-lg shadow-primary/25"
          >
            {{ isLoading ? "Kutib turing..." : "Tizimga kirish" }}
          </UButton>
        </form>

        <!-- Xavfsizlik izohi -->
        <div
          class="mt-8 flex items-center justify-center gap-2 border-t border-default pt-6 text-xs text-dimmed"
        >
          <UIcon name="i-lucide-shield-check" class="size-4" />
          Ulanish himoyalangan
        </div>
      </div>
    </main>
  </div>
</template>
