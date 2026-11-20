import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const roles = to.meta.roles as string[] | undefined;
  if (!roles) return;

  const authStore = useAuthStore();
  if (!authStore.hasRole(...roles)) {
    return navigateTo("/");
  }
});