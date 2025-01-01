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
          <img src="/images/logo.png" alt="Logo" class="h-8 w-auto" />
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
          <li v-for="link in filteredMainNavLinks" :key="link.path">
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
              v-if="!sidebarStore.isCollapsed && filteredOtherLinks.length > 0"
              class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
            >
              Other
            </h3>
            <li v-for="link in filteredOtherLinks" :key="link.path">
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
              v-if="!sidebarStore.isCollapsed && filteredAccountLinks.length > 0"
              class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
            >
              Account
            </h3>
            <li v-for="link in filteredAccountLinks" :key="link.path">
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
import { ref, computed } from 'vue';
import { debounce } from 'lodash-es';

const sidebarStore = useSidebarStore();
const authStore = useAuthStore(); // Add auth store
const route = useRoute();

const isMobile = ref(false);
const isClient = computed(() => process.client);

// Define navigation items with role requirements
const mainNavLinks = computed(() => [
  {
    name: "Dashboard",
    path: "/console",
    icon: "i-uil-apps",
    roles: ["Admin"] // Both roles can access
  },
  {
    name: "Products",
    path: "/console/products",
    icon: "i-uil-box",
    badge: "24",
    roles: ["Admin", "Moderator"]
  },
  {
    name: "Categories",
    path: "/console/categories",
    icon: "i-uil-layer-group",
    roles: ["Admin", , "Moderator"]
  },
]);

const otherLinks = computed(() => [
  {
    name: "Inquiries",
    path: "/console/inquiries",
    icon: "i-uil-comment-message",
    badge: "12",
    roles: ["Admin", "Moderator"] // Both roles can access
  },
]);

const accountLinks = computed(() => [
  {
    name: "Members",
    path: "/console/members",
    icon: "i-uil-users-alt",
    roles: ["Admin"] // Only Admin can access
  },
  {
    name: "Settings",
    path: "/console/settings",
    icon: "i-uil-setting",
    roles: ["Admin", "Moderator"] // Both roles can access
  },
  {
    name: "Feedback",
    path: "/console/feedback",
    icon: "i-uil-comment-alt-message",
    roles: ["Admin"] // Both roles can access
  },
]);

// Filter links based on user role
const filteredMainNavLinks = computed(() => 
  mainNavLinks.value.filter(link => 
    link.roles.includes(authStore.role)
  )
);

const filteredOtherLinks = computed(() => 
  otherLinks.value.filter(link => 
    link.roles.includes(authStore.role)
  )
);

const filteredAccountLinks = computed(() => 
  accountLinks.value.filter(link => 
    link.roles.includes(authStore.role)
  )
);

const isLinkActive = (path) => {
  if (path === '/console') {
    return route.path === path
  }
  return route.path.startsWith(path)
}
</script>
