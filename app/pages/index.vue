<script setup lang="ts">
useHead({ title: "Dashboard" });
definePageMeta({ middleware: "check-user" });

const { connected, onlineUsers } = useSocket();
</script>

<template>
  <div class="space-y-10">
    {{ connected ? "Ulangan" : "Ulanmagan" }}
    <ul>
      <li v-for="id in onlineUsers" :key="id">
        {{ id }}
      </li>
    </ul>
  </div>
</template>
