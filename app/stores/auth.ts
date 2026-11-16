import { defineStore } from "pinia";
import axios from "axios";
const { disconnect } = useSocket();
import { useUrlStore } from "./url";
import type { User, Company } from "~/types/type";
const token = useCookie("financeToken");

export const useAuthStore = defineStore("auth", {
  state: () => ({
    companies: [] as Company[],
    users: [] as User[],
    user: {} as User,
  }),

  actions: {
    hasRole(...roles: string[]) {
      return roles.includes(this.user?.role);
    },
    logout() {
      disconnect();
      token.value = "";
      return navigateTo("/auth");
    },
    async regisCompany(data: Company) {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(`${url}/auth/company/regis`, data, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        toast.add({
          title: "Yaxshi",
          description: "Kompaniya qo'shildi",
          icon: "ix:success-filled",
        });
      } catch (error: any) {
        const errorMessage =
          error.response.data?.message || "Xatolik yuz berdi";
        toast.add({
          title: "Tekshiring",
          description: errorMessage,
          color: "error",
          icon: "clarity:error-solid",
        });
      }
    },
    async login(data: { userName: string; password: string }) {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(`${url}/auth/user/login`, data);

        token.value = res.data.accessToken;
        navigateTo("/");
      } catch (error: any) {
        const errorMessage =
          error.response.data?.message || "Xatolik yuz berdi";
        toast.add({
          title: "Tekshiring",
          description: errorMessage,
          color: "error",
          icon: "clarity:error-solid",
        });
      }
    },
    async checkUser() {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.get(`${url}/auth/user/check-user`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        this.user = res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Xatolik yuz berdi";
        toast.add({
          title: "Ogohlantirish",
          description: errorMessage,
          color: "error",
          icon: "clarity:error-solid",
        });
        throw error;
      }
    },
    async allCompany() {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.get(`${url}/auth/company/all`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        this.companies = [...res.data];
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Xatolik yuz berdi";
        toast.add({
          title: "Mumkin emas",
          description: errorMessage,
          color: "error",
          icon: "clarity:error-solid",
        });
        throw error;
      }
    },
    async allUsers() {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.get(`${url}/auth/user/all`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        this.users = [...res.data];
        console.log(this.users);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Xatolik yuz berdi";
        toast.add({
          title: "Mumkin emas",
          description: errorMessage,
          color: "error",
          icon: "clarity:error-solid",
        });
        throw error;
      }
    },
  },
});
