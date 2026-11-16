import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const roles = to.meta.roles as string[] | undefined;
	console.log(roles)
  if (!roles) return; // sahifada cheklov yo'q

  const authStore = useAuthStore();
  if (!authStore.hasRole(...roles)) {
    return navigateTo("/");
  }
});