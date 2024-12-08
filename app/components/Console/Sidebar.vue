<template>
  <div>
    <aside
      :class="[
        'fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-30 transition-all duration-300',
        'md:fixed',
        sidebarStore.sidebarWidth,
        { '-translate-x-full': !sidebarStore.isMobileOpen && isMobile },
        { 'translate-x-0': sidebarStore.isMobileOpen || !isMobile }
      ]"
    >
      <!-- Logo Section -->
      <div
        class="p-6 border-b border-slate-200 overflow-hidden whitespace-nowrap"
      >
        <div
          class="flex items-center"
          :class="{ 'justify-center': sidebarStore.isCollapsed }"
        >
          <img src="/images/logo.webp" alt="Logo" class="h-8 w-auto" />
          <div v-if="!sidebarStore.isCollapsed" class="flex flex-col ml-3">
            <span class="text-lg font-bold text-slate-900">Veselty Inc.</span>
            <span class="text-sm text-slate-500">Free Plan</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden">
        <ul class="p-4 space-y-2">
          <!-- Main Navigation -->
          <li v-for="link in mainNavLinks" :key="link.path">
            <NuxtLink
              :class="{
                'justify-center': sidebarStore.isCollapsed,
                'bg-emerald-50 text-emerald-600': isLinkActive(link.path),
              }"
              :to="link.path"
              class="flex items-center px-4 py-3 text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 group transition-colors duration-200"
            >
              <div class="relative flex items-center">
                <Icon
                  :name="link.icon"
                  class="w-5 h-5"
                  :class="{ 'text-emerald-600': isLinkActive(link.path) }"
                />
                <span
                  v-if="!sidebarStore.isCollapsed"
                  class="ml-3 text-sm font-medium whitespace-nowrap"
                  :class="{ 'text-emerald-600': isLinkActive(link.path) }"
                >
                  {{ link.name }}
                </span>
                <span
                  v-if="link.badge && !sidebarStore.isCollapsed"
                  class="ml-auto bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  {{ link.badge }}
                </span>
              </div>

              <!-- Tooltip for collapsed state -->
              <div
                v-if="sidebarStore.isCollapsed"
                class="absolute left-full ml-6 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
              >
                {{ link.name }}
                <span
                  v-if="link.badge"
                  class="ml-2 bg-emerald-500 px-1.5 py-0.5 rounded-full text-xs"
                >
                  {{ link.badge }}
                </span>
              </div>
            </NuxtLink>
          </li>

          <!-- Other Links -->
          <div class="pt-4 mt-4 border-t border-slate-200">
            <h3
              v-if="!sidebarStore.isCollapsed"
              class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
            >
              Other
            </h3>
            <li v-for="link in otherLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="flex items-center px-4 py-3 text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 group transition-colors duration-200"
                :class="{
                  'justify-center': sidebarStore.isCollapsed,
                  'bg-emerald-50 text-emerald-600': isLinkActive(link.path),
                }"
              >
                <div class="relative flex items-center">
                  <Icon
                    :name="link.icon"
                    class="w-5 h-5"
                    :class="{ 'text-emerald-600': isLinkActive(link.path) }"
                  />
                  <span
                    v-if="!sidebarStore.isCollapsed"
                    class="ml-3 text-sm font-medium whitespace-nowrap"
                    :class="{ 'text-emerald-600': isLinkActive(link.path) }"
                  >
                    {{ link.name }}
                  </span>
                </div>

                <!-- Tooltip for collapsed state -->
                <div
                  v-if="sidebarStore.isCollapsed"
                  class="absolute left-full ml-6 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                >
                  {{ link.name }}
                </div>
              </NuxtLink>
            </li>
          </div>

          <!-- Account Links -->
          <div class="pt-4 mt-4 border-t border-slate-200">
            <h3
              v-if="!sidebarStore.isCollapsed"
              class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
            >
              Account
            </h3>
            <li v-for="link in accountLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="flex items-center px-4 py-3 text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 group transition-colors duration-200"
                :class="{
                  'justify-center': sidebarStore.isCollapsed,
                  'bg-emerald-50 text-emerald-600': isLinkActive(link.path),
                }"
              >
                <div class="relative flex items-center">
                  <Icon
                    :name="link.icon"
                    class="w-5 h-5"
                    :class="{ 'text-emerald-600': isLinkActive(link.path) }"
                  />
                  <span
                    v-if="!sidebarStore.isCollapsed"
                    class="ml-3 text-sm font-medium whitespace-nowrap"
                    :class="{ 'text-emerald-600': isLinkActive(link.path) }"
                  >
                    {{ link.name }}
                  </span>
                </div>

                <!-- Tooltip for collapsed state -->
                <div
                  v-if="sidebarStore.isCollapsed"
                  class="absolute left-full ml-6 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                >
                  {{ link.name }}
                </div>
              </NuxtLink>
            </li>
          </div>
        </ul>
      </nav>

      <!-- User Profile -->
      <div
        class="p-4 border-t border-slate-200 overflow-hidden whitespace-nowrap"
      >
        <div
          class="flex items-center px-4 py-2.5 rounded-xl bg-slate-50"
          :class="{ 'justify-center': sidebarStore.isCollapsed }"
        >
          <img
            src="https://ui-avatars.com/api/?name=Jeivine+Kief&background=10B981&color=fff"
            alt="Jeivine Kief"
            class="w-8 h-8 rounded-full"
          />
          <div v-if="!sidebarStore.isCollapsed" class="flex-1 min-w-0 ml-3">
            <p class="text-sm font-medium text-slate-900 truncate">
              Jeivine Kief
            </p>
            <p class="text-xs text-slate-500 truncate">Administrator</p>
          </div>
          <button
            v-if="!sidebarStore.isCollapsed"
            class="ml-auto p-1 text-slate-400 hover:text-slate-500 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <Icon name="i-uil-signout" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Collapse Button -->
      <button
        @click="sidebarStore.toggleCollapse"
        class="hidden md:flex absolute -right-3 top-16 bg-white border border-slate-200 rounded-full p-1 text-slate-400 hover:text-slate-600"
      >
        <Icon
          :name="
            sidebarStore.isCollapsed ? 'i-uil-angle-right' : 'i-uil-angle-left'
          "
          class="w-4 h-4"
        />
      </button>
    </aside>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarStore.isMobileOpen"
      class="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
      @click="sidebarStore.closeMobileMenu"
    ></div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but allow scrolling */
nav {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Ensure smooth transitions */
.translate-x-[\-100\%] {
  transform: translateX(-100%);
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash';
const sidebarStore = useSidebarStore();
const route = useRoute();

const isMobile = ref(false);
const isClient = computed(() => process.client);

onMounted(() => {
  if (isClient.value) {
    checkMobileView();
    window.addEventListener('resize', handleResize);
  }
});

const checkMobileView = () => {
  if (isClient.value) {
    isMobile.value = window.innerWidth < 768;
  }
};

const handleResize = debounce(() => {
  if (isClient.value) {
    checkMobileView();
  }
}, 200);

onUnmounted(() => {
  if (isClient.value) {
    window.removeEventListener('resize', handleResize);
  }
});

// Navigation Links
const mainNavLinks = [
  {
    name: "Dashboard",
    path: "/console",
    icon: "i-uil-apps",
  },
  {
    name: "Products",
    path: "/console/products",
    icon: "i-uil-box",
    badge: "24",
  },
  {
    name: "Categories",
    path: "/console/categories",
    icon: "i-uil-layer-group",
  },
];

const otherLinks = [
  {
    name: "Inquiries",
    path: "/console/inquiries",
    icon: "i-uil-comment-message",
    badge: "12",
  },
];

const accountLinks = [
  {
    name: "Account",
    path: "/console/account",
    icon: "i-uil-user",
  },
  {
    name: "Members",
    path: "/console/members",
    icon: "i-uil-users-alt",
  },
  {
    name: "Settings",
    path: "/console/settings",
    icon: "i-uil-setting",
  },
  {
    name: "Feedback",
    path: "/console/feedback",
    icon: "i-uil-comment-alt-message",
  },
];

const isLinkActive = (path) => {
  if (path === '/console') {
    return route.path === path
  }
  return route.path.startsWith(path)
}
</script>
