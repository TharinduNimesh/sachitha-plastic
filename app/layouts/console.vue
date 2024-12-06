<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Sidebar -->
    <ConsoleSidebar />

    <!-- Main Content -->
    <div :class="[contentMargin, 'transition-all duration-300 md:relative']">
      <ConsoleHeader />
      <slot />
    </div>
  </div>
</template>

<script setup>
const sidebarStore = useSidebarStore();

// Reactive margin state
const contentMargin = ref("ml-64");

// Computed property to get current margin
const calculateMargin = computed(() => {
  if (!import.meta.client) return "ml-64";

  const width = window.innerWidth;
  console.log("Calculating margin - Width:", width, "Collapsed:", sidebarStore.isCollapsed);

  // Mobile view
  if (width < 768) {
    console.log("Mobile view - using ml-0");
    return "ml-0";
  }
  
  // Tablet/Desktop view
  const margin = sidebarStore.isCollapsed ? "ml-20" : "ml-64";
  console.log("Desktop view - using", margin);
  return margin;
});

// Watch for changes that should affect margin
if (import.meta.client) {
  // Update margin when computed value changes
  watch(
    calculateMargin,
    (newMargin) => {
      contentMargin.value = newMargin;
    },
    { immediate: true }
  );

  // Watch for sidebar collapse state
  watch(
    () => sidebarStore.isCollapsed,
    () => {
      contentMargin.value = calculateMargin.value;
    }
  );
}

// Handle window resize
const handleResize = () => {
  if (!import.meta.client) return;

  const width = window.innerWidth;
  console.log("Resize - Window width:", width);
  
  if (width >= 768) {
    sidebarStore.closeMobileMenu();
    if (width < 1024) {
      sidebarStore.setCollapsed(true);
      console.log("Setting sidebar collapsed: true");
    } else {
      sidebarStore.setCollapsed(false);
      console.log("Setting sidebar collapsed: false");
    }
  } else {
    sidebarStore.setCollapsed(false);
    console.log("Mobile view - Setting sidebar collapsed: false");
  }

  // Force recalculation of margin
  contentMargin.value = calculateMargin.value;
  console.log("Updated margin to:", contentMargin.value);
};

// Add resize listener only on client-side
if (import.meta.client) {
  // Add resize observer for more reliable resize detection
  const resizeObserver = new ResizeObserver(debounce(() => {
    console.log("ResizeObserver triggered");
    handleResize();
  }, 100));

  onMounted(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    resizeObserver.observe(document.documentElement);
    console.log("Mounted - Initial margin:", contentMargin.value);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    resizeObserver.disconnect();
  });

  // Watch for any changes that affect layout
  watch([
    () => contentMargin.value,
    () => sidebarStore.isCollapsed,
    () => window.innerWidth
  ], ([margin, collapsed, width]) => {
    console.log("State changed - Margin:", margin, "Collapsed:", collapsed, "Width:", width);
  });
}
</script>

<style scoped>
.ml-64 {
  margin-left: 13rem /* 224px */;
}

.ml-20 {
  margin-left: 6rem /* 96px */;
}
</style>
