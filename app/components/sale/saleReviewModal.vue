<script lang="ts" setup>
import { formatDate, formatMoney, formatNumber } from "~/utils/format";

const open = defineModel<boolean>("open", { default: false });
const props = defineProps<{ sale: any | null }>();
const emit = defineEmits<{ approve: [id: string]; reject: [id: string] }>();
</script>

<template>
  <UModal
    v-model:open="open"
    title="Sotuv hisobotini tekshirish"
    :description="sale ? formatDate(sale.date) : ''"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <div v-if="sale" class="space-y-4">
        <!-- Jami -->
        <div class="rounded-xl bg-elevated/60 p-4">
          <p class="text-xs text-muted">Jami summa</p>
          <p class="text-2xl font-bold tracking-tight text-highlighted tabular-nums">
            {{ formatMoney(sale.totalAmount) }}
          </p>
          <p class="mt-0.5 text-xs text-muted tabular-nums">
            {{ formatNumber(sale.volume) }} kub × {{ formatNumber(sale.pricePerCube) }} so'm
          </p>
        </div>

        <!-- To'lovlar -->
        <div class="divide-y divide-default rounded-xl border border-default text-sm">
          <div class="flex items-center justify-between px-4 py-2.5">
            <span class="flex items-center gap-2 text-muted">
              <span class="size-2 rounded-full bg-emerald-500" /> Naqd
            </span>
            <span class="font-medium tabular-nums">{{ formatMoney(sale.cash) }}</span>
          </div>
          <div class="flex items-center justify-between px-4 py-2.5">
            <span class="flex items-center gap-2 text-muted">
              <span class="size-2 rounded-full bg-sky-500" /> Terminal
            </span>
            <span class="font-medium tabular-nums">{{ formatMoney(sale.terminal) }}</span>
          </div>
          <div class="flex items-center justify-between px-4 py-2.5">
            <span class="flex items-center gap-2 text-muted">
              <span class="size-2 rounded-full bg-violet-500" /> Perechisleniya
            </span>
            <span class="font-medium tabular-nums">{{ formatMoney(sale.transfer) }}</span>
          </div>
          <div class="flex items-center justify-between px-4 py-2.5">
            <span class="text-muted">Farq</span>
            <span
              class="font-semibold tabular-nums"
              :class="sale.difference > 0 ? 'text-success' : 'text-dimmed'"
            >
              {{ sale.difference > 0 ? "+" : "" }}{{ formatMoney(sale.difference) }}
            </span>
          </div>
        </div>

        <!-- Kassir -->
        <div class="flex items-center gap-2 text-sm">
          <div
            class="flex size-7 items-center justify-center rounded-full bg-elevated text-[11px] font-semibold uppercase text-muted"
          >
            {{ sale.userId?.fName?.[0] }}{{ sale.userId?.lName?.[0] }}
          </div>
          <span class="capitalize text-muted">
            Kiritdi: {{ sale.userId?.fName }} {{ sale.userId?.lName }}
          </span>
        </div>

        <!-- Izoh -->
        <p v-if="sale.comment" class="rounded-lg bg-elevated/60 px-3 py-2 text-sm text-muted">
          {{ sale.comment }}
        </p>
      </div>
    </template>

    <template #footer="{ close }">
      <UButton label="Yopish" color="neutral" variant="ghost" @click="close" />
      <UButton
        label="Rad etish"
        color="error"
        variant="soft"
        icon="i-lucide-x"
        @click="sale && emit('reject', sale._id)"
      />
      <UButton
        label="Tasdiqlash"
        color="success"
        icon="i-lucide-check"
        @click="sale && emit('approve', sale._id)"
      />
    </template>
  </UModal>
</template>