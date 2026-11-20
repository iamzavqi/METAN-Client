<script setup lang="ts">

useHead({ title: "Dashboard" });
definePageMeta({
	middleware: ["check-user", "check-role"],
});
</script>

<template>
  <div class="space-y-10">test</div>
</template>
