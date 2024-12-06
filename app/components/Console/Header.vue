<template>
  <header class="bg-white border-b border-slate-200 h-16">
    <div class="h-full flex items-center justify-between px-6">
      <!-- Search Bar -->
      <div class="flex-1 max-w-2xl mx-auto">
        <div class="relative">
          <input
            type="text"
            placeholder="Search anything..."
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <svg
            class="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center space-x-4 ml-4">
        <!-- Export Button -->
        <div class="flex rounded-lg border border-slate-200 divide-x">
          <button class="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Export
          </button>
          <button class="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-slate-50">
            + Add Widget
          </button>
        </div>

        <!-- Notifications -->
        <button class="relative p-2 rounded-lg hover:bg-slate-50">
          <svg
            class="w-6 h-6 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>

        <!-- Profile -->
        <button class="flex items-center space-x-2">
          <img
            src="https://ui-avatars.com/api/?name=Jeivine+Kief&background=10B981&color=fff"
            alt="Jeivine Kief"
            class="w-8 h-8 rounded-full"
          />
          <svg
            class="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
