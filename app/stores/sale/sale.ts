import { defineStore } from "pinia";
import axios from "axios";
import { useUrlStore } from "../url";


import type { Sale, SalePayload } from "~/types/store/sale.type";

export const useSaleStore = defineStore("sale", {
  state: () => ({
    sales: [] as Sale[],
  }),

  actions: {
    // functions
    addSale(data: Sale) {
      this.sales = [data, ...this.sales];
      console.log(data);
    },

    // API
    async createSale(data: SalePayload) {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        const res = await axios.post(`${url}/sale/create`, data, {
          headers: { Authorization: `Bearer ${token.value}` },
        });

        toast.add({
          title: "Saqlandi",
          description: "Sotuv hisoboti moliyachiga yuborildi",
          icon: "ix:success-filled",
        });
        return true
      } catch (error: any) {
        toast.add({
          title: "Tekshiring",
          description: error.response?.data?.message || "Xatolik yuz berdi",
          color: "error",
          icon: "clarity:error-solid",
        });
        return false;
      }
    },

    async getSales() {
      const url = useUrlStore().url;
      const token = useCookie("financeToken");
      const toast = useToast();
      try {
        const res = await axios.get(`${url}/sale/get-sales`, {
          headers: { Authorization: `Bearer ${token.value}` },
        });
        this.sales = res.data
        console.log(this.sales)
      } catch (error: any) {
        toast.add({
          title: "Yuklab bo'lmadi",
          description: error.response?.data?.message || "Xatolik yuz berdi",
          color: "error",
          icon: "clarity:error-solid",
        });
        return false;
      }
    },
  },
});
