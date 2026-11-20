<script setup lang="ts">
import { useSaleStore } from '~/stores/sale/sale';

useHead({ title: "Sotuv" });
definePageMeta({
  middleware: ["check-user", "check-role"],
});

const { on } = useSocket();

const authStore = useAuthStore();
const saleStore = useSaleStore()

on("sale:created", (data)=> {
  saleStore.addSale(data)
})

</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Sotuv</h1>
      <SaleCreateModal v-if="authStore.hasRole('kassir')" />
    </div>
  </div>
  <div>
    <SaleTable />
  </div>
</template>