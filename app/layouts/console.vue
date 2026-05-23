<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Sidebar -->
    <ConsoleSidebar />

    <!-- Main Content -->
    <div :class="mainContentClass">
      <ConsoleHeader />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const sidebarStore = useSidebarStore();

onMounted(() => {
  sidebarStore.initializeState();
});

const mainContentClass = computed(() => [
  'min-w-0 transition-all duration-300 ease-in-out',
  sidebarStore.isCollapsed ? 'md:ml-24' : 'md:ml-64',
])
</script>

<style scoped>
</style>
