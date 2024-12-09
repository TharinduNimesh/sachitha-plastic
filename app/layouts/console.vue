<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Sidebar -->
    <ConsoleSidebar />

    <!-- Main Content -->
    <div 
      :class="[
        'transition-all duration-300 ease-in-out transform',
        { 'md:ml-64': !sidebarStore.isCollapsed },
        { 'md:ml-24': sidebarStore.isCollapsed },
        { 'ml-0': isMobile }
      ]"
    >
      <ConsoleHeader />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { debounce } from 'lodash-es';

const sidebarStore = useSidebarStore();
const isMobile = ref(false);

// Check if we're on client-side
const isClient = computed(() => import.meta.client);

onMounted(() => {
  if (isClient.value) {
    // Initialize sidebar state
    sidebarStore.initializeState();
    
    // Initial check
    checkMobileView();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
  }
});

// Check mobile view
const checkMobileView = () => {
  if (isClient.value) {
    isMobile.value = window.innerWidth < 768;
  }
};

// Handle window resize
const handleResize = debounce(() => {
  if (isClient.value) {
    checkMobileView();
    if (isMobile.value) {
      sidebarStore.closeMobileMenu();
    }
  }
}, 200);

// Clean up
onUnmounted(() => {
  if (isClient.value) {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style scoped>
.ml-56 {
  margin-left: 13rem /* 224px */;
}

.ml-24 {
  margin-left: 6rem /* 96px */;
}

/* Ensure smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
