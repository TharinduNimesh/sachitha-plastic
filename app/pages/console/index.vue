<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p class="mt-1 text-slate-600">
          Overview of your website activity and performance
        </p>
      </div>

      <!-- Top Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Total Products -->
        <ConsoleWidgetsStatsCard
          title="Total Products"
          :value="totalProducts"
          :trend="8"
          trend-label="from last month"
        >
          <template #icon>
            <Icon
              name="i-uil-box"
              class="w-6 h-6 text-emerald-600"
            />
          </template>
        </ConsoleWidgetsStatsCard>

        <!-- Total Categories -->
        <ConsoleWidgetsStatsCard
          title="Categories"
          :value="totalCategories"
          :trend="2"
          trend-label="new this month"
        >
          <template #icon>
            <Icon
              name="i-uil-apps"
              class="w-6 h-6 text-blue-600"
            />
          </template>
        </ConsoleWidgetsStatsCard>

        <!-- Total Page Views -->
        <ConsoleWidgetsStatsCard
          title="Page Views"
          :value="totalPageViews"
          :trend="12"
          trend-label="vs last month"
        >
          <template #icon>
            <Icon
              name="i-uil-eye"
              class="w-6 h-6 text-purple-600"
            />
          </template>
        </ConsoleWidgetsStatsCard>

        <!-- Pending Inquiries -->
        <ConsoleWidgetsStatsCard
          title="Pending Inquiries"
          :value="pendingInquiries"
          trend-type="neutral"
          trend-label="needs attention"
        >
          <template #icon>
            <Icon
              name="i-uil-envelope"
              class="w-6 h-6 text-orange-600"
            />
          </template>
        </ConsoleWidgetsStatsCard>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Website Analytics -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Website Analytics</h3>
                <p class="text-emerald-600 font-medium mt-1">
                  {{ totalPageViews }} total views (+{{ analyticsGrowth }}%)
                </p>
              </div>
              <select
                v-model="analyticsTimeframe"
                class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 3 Months</option>
              </select>
            </div>
            <!-- Analytics Chart -->
            <div class="h-64">
              <ConsoleWidgetsAnalyticsChart
                :data="analyticsData"
                :labels="analyticsLabels"
              />
            </div>
          </div>

          <!-- Popular Categories -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-slate-900">Popular Categories</h3>
              <NuxtLink
                to="/console/categories"
                class="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                View All
              </NuxtLink>
            </div>
            <div class="space-y-4">
              <div
                v-for="category in popularCategories"
                :key="category.id"
                class="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :class="`bg-${category.color}-100 text-${category.color}-600`"
                  >
                    <Icon :name="category.icon" class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="font-medium text-slate-900">{{ category.name }}</h4>
                    <p class="text-sm text-slate-500">{{ category.products }} products</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-medium text-slate-900">{{ category.views }}</div>
                  <div class="text-sm text-slate-500">views</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Recent Updates -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-slate-900 mb-6">Recent Updates</h3>
            <div class="space-y-6">
              <div
                v-for="update in recentUpdates"
                :key="update.id"
                class="flex gap-4"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="{
                    'bg-emerald-100 text-emerald-600': update.type === 'product',
                    'bg-blue-100 text-blue-600': update.type === 'category',
                    'bg-purple-100 text-purple-600': update.type === 'inquiry'
                  }"
                >
                  <Icon
                    :name="update.icon"
                    class="w-4 h-4"
                  />
                </div>
                <div>
                  <p class="text-slate-900">{{ update.message }}</p>
                  <p class="text-sm text-slate-500 mt-1">{{ update.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-slate-900">Notifications</h3>
              <button
                v-if="notifications.length"
                class="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Mark all as read
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="p-4 rounded-lg"
                :class="{
                  'bg-slate-50': notification.read,
                  'bg-emerald-50': !notification.read
                }"
              >
                <div class="flex items-start gap-3">
                  <Icon
                    :name="notification.icon"
                    class="w-5 h-5 mt-0.5"
                    :class="notification.read ? 'text-slate-400' : 'text-emerald-500'"
                  />
                  <div>
                    <p
                      class="text-slate-900"
                      :class="{ 'font-medium': !notification.read }"
                    >
                      {{ notification.message }}
                    </p>
                    <p class="text-sm text-slate-500 mt-1">
                      {{ notification.time }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Stats
const totalProducts = ref(156);
const totalCategories = ref(12);
const totalPageViews = ref("288,822");
const pendingInquiries = ref(8);
const analyticsGrowth = ref(12);

// Analytics data
const analyticsTimeframe = ref(7);

const generateAnalyticsData = (days: number) => {
  const data = [];
  const labels = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    data.push(Math.floor(Math.random() * 100) + 50); // Random data between 50-150
  }
  
  return { data, labels };
};

const analyticsData = computed(() => generateAnalyticsData(analyticsTimeframe.value).data);
const analyticsLabels = computed(() => generateAnalyticsData(analyticsTimeframe.value).labels);

// Popular Categories
const popularCategories = ref([
  {
    id: 1,
    name: "Machinery",
    products: 45,
    views: "12,456",
    icon: "i-uil-processor",
    color: "emerald",
  },
  {
    id: 2,
    name: "Household",
    products: 32,
    views: "8,234",
    icon: "i-uil-home",
    color: "blue",
  },
  {
    id: 3,
    name: "Industrial",
    products: 28,
    views: "6,879",
    icon: "i-uil-building",
    color: "orange",
  },
]);

// Recent Updates
const recentUpdates = ref([
  {
    id: 1,
    type: "product",
    icon: "i-uil-box",
    message: "New product 'Recycling Machine XL-200' added",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "category",
    icon: "i-uil-apps",
    message: "Category 'Industrial Equipment' updated",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "inquiry",
    icon: "i-uil-envelope",
    message: "New inquiry from John Smith",
    time: "1 day ago",
  },
]);

// Notifications
const notifications = ref([
  {
    id: 1,
    icon: "i-uil-exclamation-circle",
    message: "Low stock alert: 3 products need attention",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    icon: "i-uil-envelope",
    message: "5 new customer inquiries received",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    icon: "i-uil-chart-line",
    message: "Monthly analytics report is ready",
    time: "1 day ago",
    read: true,
  },
]);

definePageMeta({
  layout: "console",
});
</script>
