<template>
  <div>
    <NuxtPage />
    <CommonToast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
const toastRef = ref<ToastRef | null>(null);

// Provide toast ref to be used by useToast composable
provide('toastRef', toastRef)
</script>