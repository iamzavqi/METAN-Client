import { defineStore } from "pinia";
import axios from "axios";
import { useUrlStore } from "../url";


import type { Wallet, WalletPayload } from "~/types/store/kassa.type";

export const useWalletStore = defineStore("wallet", {
	state: () => ({
		wallets: [] as Wallet[],
	}),

	actions: {
		// functions
		addWallet(data: Wallet) {
			this.wallets = [data, ...this.wallets];
			console.log(data);
		},

		// API
		async createWallet(data: WalletPayload) {
			const url = useUrlStore().url;
			const token = useCookie("financeToken");
			const toast = useToast();
			try {
				const res = await axios.post(`${url}/wallet/create`, data, {
					headers: { Authorization: `Bearer ${token.value}` },
				});

				toast.add({
					title: "Saqlandi",
					description: "Hamyon yaratildi",
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

		async getWallets() {
			const url = useUrlStore().url;
			const token = useCookie("financeToken");
			const toast = useToast();
			try {
				const res = await axios.get(`${url}/wallet/get-wallets`, {
					headers: { Authorization: `Bearer ${token.value}` },
				});
				this.wallets = res.data
				console.log(this.wallets)
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
