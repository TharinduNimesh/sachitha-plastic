<template>
  <header class="sticky top-0 z-10 bg-white border-b border-slate-200 h-16">
    <div class="h-full flex items-center justify-between px-4 md:px-6">
      <!-- Left Section: Mobile Menu + Search -->
      <div class="flex items-center flex-1">
        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden pr-4 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-lg"
          @click="sidebarStore.toggleMobileMenu"
        >
          <Icon
            :name="sidebarStore.isMobileOpen ? 'i-uil-times' : 'i-uil-bars'"
            class="text-xl "
          />
        </button>

        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl">
          <div class="relative">
            <input
              type="text"
              placeholder="Search anything..."
              class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
            <Icon
              name="i-uil-search"
              class="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
            />
          </div>
        </div>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center space-x-2 md:space-x-4 ml-4">
        <!-- Export & Add Widget Buttons (Hidden on mobile) -->
        <div class="hidden md:flex rounded-lg border border-slate-200 divide-x">
          <button
            class="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span class="hidden lg:inline">Export</span>
            <Icon name="i-uil-export" class="w-4 h-4 lg:hidden" />
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-slate-50 transition-colors"
          >
            <span class="hidden lg:inline">+ Add Widget</span>
            <Icon name="i-uil-plus" class="w-4 h-4 lg:hidden" />
          </button>
        </div>

        <!-- Notifications -->
        <button
          class="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Icon name="i-uil-bell" class="text-xl text-slate-600" />
          <span
            class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"
          ></span>
        </button>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button
            class="flex items-center space-x-1 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <img
              src="https://ui-avatars.com/api/?name=Jeivine+Kief&background=10B981&color=fff"
              alt="Jeivine Kief"
              class="w-8 h-8 rounded-full"
            />
            <Icon
              name="i-uil-angle-down"
              class="w-5 h-5 text-slate-400 hidden md:block"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar";

const sidebarStore = useSidebarStore();
</script>
