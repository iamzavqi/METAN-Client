<script setup lang="ts">
import { onMounted } from "vue";

useHead({ title: "Dashboard" });
definePageMeta({
	middleware: ["check-user", "check-role"],
	roles: [ "director"]
});
</script>

<template>
  <div class="space-y-10">test</div>
</template>
