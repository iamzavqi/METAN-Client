<script setup lang="ts">

useHead({ title: "Dashboard" });
definePageMeta({
	middleware: ["check-user", "check-role"],
	roles: [ "director"]
});
</script>

<template>
  <div class="space-y-10">test</div>
</template>
