<template>
  <div>
    <aside
      :class="[
        'left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-30 transition-all duration-300',
        'md:fixed',
        sidebarStore.sidebarWidth,
        !sidebarStore.isMobileOpen && 'md:w-auto',
        !sidebarStore.isMobileOpen && 'w-0',
      ]"
    >
      <!-- Logo Section -->
      <div class="p-6 border-b border-slate-200">
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
      <nav class="flex-1 overflow-y-auto p-4">
        <div class="space-y-1">
          <!-- Main Navigation -->
          <NuxtLink
            v-for="link in mainNavLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center px-4 py-2.5 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 group"
            :class="[
              { 'bg-emerald-50 text-emerald-600': link.active },
              { 'justify-center': sidebarStore.isCollapsed },
            ]"
          >
            <Icon :name="link.icon" class="w-5 h-5" />
            <span v-if="!sidebarStore.isCollapsed" class="ml-3">{{
              link.name
            }}</span>
            <span
              v-if="link.badge && !sidebarStore.isCollapsed"
              class="ml-auto bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-0.5 rounded-full"
              >{{ link.badge }}</span
            >
            <!-- Tooltip for collapsed state -->
            <div
              v-if="sidebarStore.isCollapsed"
              class="absolute left-full ml-6 hidden group-hover:block px-2 py-1 bg-slate-800 text-white text-sm rounded whitespace-nowrap"
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

          <!-- Other Links -->
          <div class="pt-4 mt-4 border-t border-slate-200">
            <h3
              v-if="!sidebarStore.isCollapsed"
              class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
            >
              Other
            </h3>
            <NuxtLink
              v-for="link in otherLinks"
              :key="link.path"
              :to="link.path"
              class="flex items-center px-4 py-2.5 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 group"
              :class="{ 'justify-center': sidebarStore.isCollapsed }"
            >
              <Icon :name="link.icon" class="w-5 h-5" />
              <span v-if="!sidebarStore.isCollapsed" class="ml-3">{{
                link.name
              }}</span>
              <!-- Tooltip for collapsed state -->
              <div
                v-if="sidebarStore.isCollapsed"
                class="absolute left-full ml-6 hidden group-hover:block px-2 py-1 bg-slate-800 text-white text-sm rounded whitespace-nowrap"
              >
                {{ link.name }}
              </div>
            </NuxtLink>
          </div>

          <!-- Account Links -->
          <div class="pt-4 mt-4 border-t border-slate-200">
            <h3
              v-if="!sidebarStore.isCollapsed"
              class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
            >
              Account
            </h3>
            <NuxtLink
              v-for="link in accountLinks"
              :key="link.path"
              :to="link.path"
              class="flex items-center px-4 py-2.5 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 group"
              :class="{ 'justify-center': sidebarStore.isCollapsed }"
            >
              <Icon :name="link.icon" class="w-5 h-5" />
              <span v-if="!sidebarStore.isCollapsed" class="ml-3">{{
                link.name
              }}</span>
              <!-- Tooltip for collapsed state -->
              <div
                v-if="sidebarStore.isCollapsed"
                class="absolute left-full ml-6 hidden group-hover:block px-2 py-1 bg-slate-800 text-white text-sm rounded whitespace-nowrap"
              >
                {{ link.name }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-slate-200">
        <div
          class="flex items-center px-4 py-2.5 rounded-lg bg-slate-50"
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
            class="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors duration-200"
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
            sidebarStore.isCollapsed
              ? 'i-uil-angle-right'
              : 'i-uil-angle-left'
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

    <!-- Mobile Toggle Button -->
    <button
      @click="sidebarStore.toggleMobileMenu"
      class="md:hidden fixed z-30 bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
    >
      <Icon
        :name="sidebarStore.isMobileOpen ? 'i-uil-times' : 'i-uil-bars'"
        class="w-6 h-6"
      />
    </button>
  </div>
</template>

<script setup>
import { useSidebarStore } from "~/stores/sidebar";

const sidebarStore = useSidebarStore();

const mainNavLinks = [
  {
    name: "Dashboard",
    path: "/console",
    active: true,
    icon: "i-uil-apps",
  },
  {
    name: "Products",
    path: "/console/products",
    icon: "i-uil-box",
  },
  {
    name: "Orders",
    path: "/console/orders",
    icon: "i-uil-shopping-cart",
  },
  {
    name: "Customers",
    path: "/console/customers",
    icon: "i-uil-users-alt",
  },
  {
    name: "Chat",
    path: "/console/chat",
    icon: "i-uil-comment-alt",
    badge: "22",
  },
];

const otherLinks = [
  {
    name: "Email",
    path: "/console/email",
    icon: "i-uil-envelope",
  },
  {
    name: "Analytics",
    path: "/console/analytics",
    icon: "i-uil-chart",
  },
  {
    name: "Integration",
    path: "/console/integration",
    icon: "i-uil-puzzle-piece",
  },
  {
    name: "Performance",
    path: "/console/performance",
    icon: "i-uil-tachometer-fast",
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
</script>
