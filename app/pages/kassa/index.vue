<script setup lang="ts">
useHead({ title: "Kassa" });
definePageMeta({
  middleware: ["check-user", "check-role"],
});
</script>

<template>
  <div class="space-y-10">kassa</div>
</template>
