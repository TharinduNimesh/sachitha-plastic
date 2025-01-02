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
          :trend="productsGrowth"
          trend-label="growth"
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
          :trend="newCategories"
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
          :trend="viewsGrowth"
          trend-label="growth"
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
                  {{ formatNumber(totalPageViews) }} total views (+{{ viewsGrowth }}%)
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
                :data="analyticsChartData"
                :labels="chartLabels"
              />
            </div>
          </div>

          <!-- Popular Categories -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-semibold text-slate-900 mb-6">Popular Categories</h3>
            <div class="space-y-4">
              <template v-if="popularCategories?.length">
                <div
                  v-for="category in popularCategories"
                  :key="category.id"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-3">
                    <Icon
                      name="i-uil-apps"
                      class="w-5 h-5 text-emerald-600"
                    />
                    <div>
                      <h4 class="font-medium text-slate-900">{{ category.name }}</h4>
                      <p class="text-sm text-slate-500">{{ formatNumber(category.count) }} products</p>
                    </div>
                  </div>
                </div>
              </template>
              <div 
                v-else 
                class="text-center py-8"
              >
                <Icon
                  name="i-uil-apps"
                  class="w-12 h-12 text-slate-300 mx-auto mb-3"
                />
                <p class="text-slate-500">No categories yet</p>
                <p class="text-sm text-slate-400 mt-1">
                  Categories will appear here once created
                </p>
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
              <template v-if="recentUpdates?.length">
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
              </template>
              <div 
                v-else 
                class="text-center py-8"
              >
                <Icon
                  name="i-uil-history"
                  class="w-12 h-12 text-slate-300 mx-auto mb-3"
                />
                <p class="text-slate-500">No recent updates</p>
                <p class="text-sm text-slate-400 mt-1">
                  New products and categories will appear here
                </p>
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-slate-900">Notifications</h3>
              <button
                v-if="notifications?.length"
                class="text-sm font-medium text-slate-500 hover:text-slate-700"
                @click="markAllAsRead"
              >
                Mark all as read
              </button>
            </div>
            <div class="space-y-4">
              <template v-if="notifications?.length">
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
              </template>
              <div 
                v-else 
                class="text-center py-8"
              >
                <Icon
                  name="i-uil-bell"
                  class="w-12 h-12 text-slate-300 mx-auto mb-3"
                />
                <p class="text-slate-500">No notifications</p>
                <p class="text-sm text-slate-400 mt-1">
                  New inquiries and updates will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModalSetupProfileModal v-if="isAccountSetupped" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProductStatistics, ChartData } from '~/types/analytics.types'

// Analytics timeframe options
const timeframeOptions = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 }
]
const analyticsTimeframe = ref(30)

// Fetch dashboard data
const { data: dashboardData, pending: dashboardLoading } = await useAsyncData(
  'dashboardData',
  async () => {
    const supabase = useSupabaseClient()
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - analyticsTimeframe.value)

    // Fetch product statistics
    const { data: statistics, error } = await supabase
      .from('product_statistics')
      .select('date, views')
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (error) throw error

    return {
      statistics: statistics as ProductStatistics[]
    }
  },
  {
    watch: [analyticsTimeframe]
  }
)

// Process chart data
const chartData = computed<ChartData>(() => {
  if (!dashboardData.value?.statistics) {
    return {
      labels: [],
      datasets: []
    }
  }

  // Group views by date
  const viewsByDate = new Map<string, number>()
  const statistics = dashboardData.value.statistics

  // Initialize all dates in range with 0 views
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - analyticsTimeframe.value)

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    viewsByDate.set(d.toISOString().split('T')[0], 0)
  }

  // Fill in actual views
  statistics.forEach(stat => {
    viewsByDate.set(stat.date, (viewsByDate.get(stat.date) || 0) + stat.views)
  })

  // Format dates for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  return {
    labels: Array.from(viewsByDate.keys()).map(formatDate),
    datasets: [{
      label: 'Product Views',
      data: Array.from(viewsByDate.values()),
      borderColor: '#10b981',
      backgroundColor: '#10b98120',
      tension: 0.4
    }]
  }
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

// Format number with commas
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

// Combined dashboard data loading
const { data: combinedDashboardData, pending: combinedDashboardLoading } = await useAsyncData(
  'combinedDashboardData',
  async () => {
    const supabase = useSupabaseClient()
    const today = new Date()
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    const thirtyDaysAgo = new Date(today)
    thirtyDaysAgo.setDate(today.getDate() - 30)

    // Parallel data fetching for better performance
    const [
      { count: totalProducts },
      { count: lastMonthProducts },
      { count: totalCategories },
      { count: lastMonthCategories },
      { data: currentViews },
      { data: lastMonthViews },
      { count: pendingInquiries },
      { data: recentProducts },
      { data: recentCategories },
      { data: notifications },
      { data: popularCategoriesData }
    ] = await Promise.all([
      // Current products count
      supabase.from('products').select('*', { count: 'exact', head: true }),
      // Last month products count
      supabase.from('products')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', lastMonth.toISOString()),
      // Current categories count
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      // Last month categories count
      supabase.from('categories')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', lastMonth.toISOString()),
      // Current month views
      supabase.from('product_statistics')
        .select('views')
        .gte('date', lastMonth.toISOString()),
      // Last month views
      supabase.from('product_statistics')
        .select('views')
        .gte('date', new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate()).toISOString())
        .lt('date', lastMonth.toISOString()),
      // Pending inquiries
      supabase.from('inquiry_status')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending'),
      // Recent products
      supabase.from('products')
        .select('id, name, created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(5),
      // Recent categories
      supabase.from('categories')
        .select('id, name, created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(5),
      // Recent notifications
      supabase.from('inquiries')
        .select(`
          id,
          subject,
          name,
          created_at,
          inquiry_status!inner (
            status,
            created_at
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10),
      // Popular categories
      supabase.from('categories')
        .select(`
          id,
          name,
          products (id)
        `)
        .limit(5)
    ])

    // Calculate stats
    const totalProductsValue = totalProducts || 0
    const productsGrowth = lastMonthProducts ? 
      Math.round(((totalProductsValue - lastMonthProducts) / lastMonthProducts) * 100) : 0

    const totalCategoriesValue = totalCategories || 0
    const newCategories = totalCategoriesValue - (lastMonthCategories || 0)

    const totalPageViewsValue = currentViews?.reduce((sum, stat) => sum + (stat.views || 0), 0) || 0
    const lastMonthTotalViews = lastMonthViews?.reduce((sum, stat) => sum + (stat.views || 0), 0) || 0
    const viewsGrowth = lastMonthTotalViews ? 
      Math.round(((totalPageViewsValue - lastMonthTotalViews) / lastMonthTotalViews) * 100) : 0

    // Process recent updates
    const updates = [
      ...(recentProducts || []).map(product => ({
        id: `product-${product.id}`,
        type: 'product',
        icon: 'i-uil-box',
        message: `New product added: ${product.name}`,
        time: formatRelativeTime(new Date(product.created_at))
      })),
      ...(recentCategories || []).map(category => ({
        id: `category-${category.id}`,
        type: 'category',
        icon: 'i-uil-apps',
        message: `New category added: ${category.name}`,
        time: formatRelativeTime(new Date(category.created_at))
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)

    // Process notifications
    const notificationsList = notifications?.map(inquiry => ({
      id: inquiry.id,
      message: inquiry.inquiry_status.status === 'Pending'
        ? `New inquiry from ${inquiry.name}: ${inquiry.subject}`
        : `Inquiry resolved: ${inquiry.subject}`,
      icon: inquiry.inquiry_status.status === 'Pending' 
        ? 'i-uil-envelope' 
        : 'i-uil-check-circle',
      time: formatRelativeTime(new Date(inquiry.created_at)),
      read: inquiry.inquiry_status.status !== 'Pending'
    })) || []

    return {
      stats: {
        totalProducts: totalProductsValue,
        productsGrowth,
        totalCategories: totalCategoriesValue,
        newCategories,
        totalPageViews: totalPageViewsValue,
        viewsGrowth,
        pendingInquiries: pendingInquiries || 0
      },
      recentUpdates: updates,
      notifications: notificationsList,
      popularCategories: (popularCategoriesData || []).map(category => ({
        id: category.id,
        name: category.name,
        count: category.products?.length || 0
      })).sort((a, b) => b.count - a.count)
    }
  },
  {
    watch: [analyticsTimeframe],
    lazy: true,
    server: true
  }
)

// Computed values from combined data
const totalProducts = computed(() => combinedDashboardData.value?.stats?.totalProducts ?? 0)
const productsGrowth = computed(() => combinedDashboardData.value?.stats?.productsGrowth ?? 0)
const totalCategories = computed(() => combinedDashboardData.value?.stats?.totalCategories ?? 0)
const newCategories = computed(() => combinedDashboardData.value?.stats?.newCategories ?? 0)
const totalPageViews = computed(() => combinedDashboardData.value?.stats?.totalPageViews ?? 0)
const viewsGrowth = computed(() => combinedDashboardData.value?.stats?.viewsGrowth ?? 0)
const pendingInquiries = computed(() => combinedDashboardData.value?.stats?.pendingInquiries ?? 0)
const recentUpdates = computed(() => combinedDashboardData.value?.recentUpdates ?? [])
const notifications = computed(() => combinedDashboardData.value?.notifications ?? [])
const popularCategories = computed(() => combinedDashboardData.value?.popularCategories ?? [])

// Analytics data loading with proper timeframe grouping
const { data: analyticsData, pending: analyticsLoading } = await useAsyncData(
  'dashboardAnalytics',
  async () => {
    const today = new Date()
    const startDate = new Date()
    startDate.setDate(today.getDate() - analyticsTimeframe.value)
    const supabase = useSupabaseClient()

    const { data: viewsData } = await supabase
      .from('product_statistics')
      .select('date, views')
      .gte('date', startDate.toISOString())
      .order('date', { ascending: true })

    // Group data based on timeframe
    const groupedData = new Map()
    const labels = []

    if (analyticsTimeframe.value <= 7) {
      // Daily for 7 days
      for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }))
        groupedData.set(dateStr, 0)
      }
    } else if (analyticsTimeframe.value <= 30) {
      // Weekly for 30 days
      for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 7)) {
        const dateStr = d.toISOString().split('T')[0]
        labels.push(`Week ${Math.ceil((d.getDate()) / 7)}`)
        groupedData.set(dateStr, 0)
      }
    } else {
      // Monthly for 90 days
      for (let d = new Date(startDate); d <= today; d.setMonth(d.getMonth() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        labels.push(d.toLocaleDateString('en-US', { month: 'short' }))
        groupedData.set(dateStr, 0)
      }
    }

    // Fill in the actual views
    viewsData?.forEach(stat => {
      const date = new Date(stat.date)
      let key

      if (analyticsTimeframe.value <= 7) {
        key = date.toISOString().split('T')[0]
      } else if (analyticsTimeframe.value <= 30) {
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        key = weekStart.toISOString().split('T')[0]
      } else {
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
        key = monthStart.toISOString().split('T')[0]
      }

      if (groupedData.has(key)) {
        groupedData.set(key, (groupedData.get(key) || 0) + (stat.views || 0))
      }
    })

    return {
      labels,
      data: Array.from(groupedData.values())
    }
  },
  {
    watch: [analyticsTimeframe]
  }
)

// Computed properties for chart
const analyticsChartData = computed(() => analyticsData.value?.data || [])
const chartLabels = computed(() => analyticsData.value?.labels || [])

// Time formatting helper
const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Mark all notifications as read
const markAllAsRead = async () => {
  const supabase = useSupabaseClient();
  const { error } = await supabase
    .from('inquiry_status')
    .update({ status: 'Resolved' })
    .eq('status', 'Pending')
}

// Loading states
const isLoading = computed(() => dashboardLoading.value || analyticsLoading.value)

const isAccountSetupped = computed(() => {
  return !useAuthStore().name;
});

definePageMeta({
  layout: "console",
});
</script>
