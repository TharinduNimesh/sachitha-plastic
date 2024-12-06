<template>
  <div>
    <NuxtLayout name="console">
      <div class="p-6">
        <!-- Page Title -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p class="mt-1 text-slate-600">
            Track your sales and performance of your strategy.
          </p>
        </div>

        <!-- Top Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <ConsoleWidgetsProductOverview />
          <ConsoleWidgetsStatsCard
            title="Active Sales"
            value="$27,064"
            :trend="12"
          >
            <template #icon>
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </template>
          </ConsoleWidgetsStatsCard>
          <ConsoleWidgetsStatsCard
            title="Product Revenue"
            value="$16,568"
            :trend="7"
          >
            <template #icon>
              <svg
                class="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </template>
          </ConsoleWidgetsStatsCard>
        </div>

        <!-- Analytics Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Analytics Chart -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Analytics</h3>
                <p class="text-red-600 font-medium mt-1">
                  -$4,543.0 sales (-0.4%)
                </p>
              </div>
              <select
                class="text-sm text-slate-600 bg-transparent border-none focus:ring-0"
              >
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <!-- Chart Placeholder -->
            <div class="h-64 bg-slate-50 rounded-lg"></div>
          </div>

          <!-- Sales Performance -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-slate-900">
                Sales Performance
              </h3>
              <div class="flex space-x-2">
                <button
                  class="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-600"
                >
                  This Week
                </button>
                <button
                  class="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Today
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between mb-6">
              <div>
                <div class="text-3xl font-bold text-slate-900">17.9%</div>
                <div class="text-sm text-emerald-600 font-medium">
                  +2.1% since yesterday
                </div>
              </div>
              <!-- Radial Chart Placeholder -->
              <div class="w-24 h-24 bg-slate-50 rounded-full"></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-slate-50">
                <div class="text-sm text-slate-600">Total Sales per Day</div>
                <div class="text-lg font-semibold text-slate-900 mt-1">
                  $1,245
                </div>
              </div>
              <div class="p-4 rounded-lg bg-slate-50">
                <div class="text-sm text-slate-600">Average Sales</div>
                <div class="text-lg font-semibold text-slate-900 mt-1">
                  $321
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <!-- Heatmap Analytics -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">
                  Total Visits by Hourly
                </h3>
                <p class="text-emerald-600 font-medium mt-1">
                  288,822 visits (+4%)
                </p>
              </div>
            </div>
            <!-- Heatmap Placeholder -->
            <div class="h-64 bg-slate-50 rounded-lg"></div>
          </div>

          <!-- Top Products -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-slate-900">Top Products</h3>
              <a
                href="#"
                class="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                See Details
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-left text-sm text-slate-500">
                    <th class="pb-4 font-medium">Product Name</th>
                    <th class="pb-4 font-medium">Sales</th>
                    <th class="pb-4 font-medium">Revenue</th>
                    <th class="pb-4 font-medium">Stock</th>
                    <th class="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr>
                    <td class="py-3">
                      <div class="font-medium text-slate-900">Bid Shorts</div>
                    </td>
                    <td class="py-3">1,240</td>
                    <td class="py-3 font-medium text-emerald-600">$4,703</td>
                    <td class="py-3">452</td>
                    <td class="py-3">
                      <span
                        class="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-600"
                      >
                        Target Achieved
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3">
                      <div class="font-medium text-slate-900">
                        T-Shirts Midi
                      </div>
                    </td>
                    <td class="py-3">874</td>
                    <td class="py-3 font-medium text-emerald-600">$2,889</td>
                    <td class="py-3">0</td>
                    <td class="py-3">
                      <span
                        class="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
                      >
                        Out of Stock
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "console",
});
</script>
