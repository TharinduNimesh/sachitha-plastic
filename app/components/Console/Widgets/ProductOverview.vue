<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-slate-900">Product Overview</h3>
      <select class="text-sm text-slate-600 bg-transparent border-none focus:ring-0">
        <option>This Month</option>
        <option>Last Month</option>
        <option>Last 3 Months</option>
      </select>
    </div>

    <div class="mb-6">
      <div class="text-3xl font-bold text-slate-900 mb-2">$43,630</div>
      <div class="text-sm text-slate-600">Total Sales</div>
    </div>

    <div class="flex space-x-2 mb-6">
      <button
        class="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-600"
      >
        Cosmetics
      </button>
      <button
        class="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50"
      >
        Houseware
      </button>
    </div>

    <!-- Chart Placeholder -->
    <div class="h-48 bg-slate-50 rounded-lg"></div>
  </div>
</template>
