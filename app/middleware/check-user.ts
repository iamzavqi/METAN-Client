import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("financeToken");
  const authStore = useAuthStore();

  if (!token.value) {
    return navigateTo("/auth");
  }

  try {
    await authStore.checkUser();
  } catch (error: any) {
    return navigateTo("/auth");
  }
});
