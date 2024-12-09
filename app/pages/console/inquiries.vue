<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p class="mt-1 text-slate-600">
            Manage customer inquiries and messages
          </p>
        </div>
        <button class="btn-secondary flex items-center space-x-2">
          <Icon name="i-uil-download-alt" class="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      <!-- Filters Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col gap-6">
          <!-- Search Bar -->
          <div class="relative max-w-2xl">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search inquiries by name, email or subject..."
                class="w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
              />
              <Icon
                name="i-uil-search"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
            </div>
          </div>

          <!-- Filters Section -->
          <div class="flex flex-wrap items-center gap-4">
            <!-- Active Filters Display -->
            <div class="flex flex-wrap items-center gap-2">
              <span v-if="!hasActiveFilters" class="text-sm text-slate-500">
                {{ filteredInquiries.length }} inquiries found
              </span>

              <!-- Status Filter Tag -->
              <span
                v-if="selectedStatus"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium"
              >
                <Icon name="i-uil-circle" class="w-4 h-4" />
                {{ selectedStatus }}
                <button @click="selectedStatus = ''" class="hover:text-slate-800">
                  <Icon name="i-uil-times" class="w-4 h-4" />
                </button>
              </span>

              <!-- Date Range Filter Tag -->
              <span
                v-if="selectedDateRange"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium"
              >
                <Icon name="i-uil-calendar-alt" class="w-4 h-4" />
                {{ selectedDateRange }}
                <button @click="selectedDateRange = ''" class="hover:text-slate-800">
                  <Icon name="i-uil-times" class="w-4 h-4" />
                </button>
              </span>

              <!-- Clear All Filters -->
              <button
                v-if="hasActiveFilters"
                @click="clearFilters"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900"
              >
                Clear all
                <Icon name="i-uil-times" class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center gap-3 ml-auto">
              <!-- Filter Button -->
              <div class="relative" ref="filterMenuRef">
                <button
                  @click="isFilterMenuOpen = !isFilterMenuOpen"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <Icon name="i-uil-filter" class="w-5 h-5 text-slate-600" />
                  <span class="text-sm font-medium text-slate-700">Filters</span>
                  <Icon
                    :name="isFilterMenuOpen ? 'i-uil-angle-up' : 'i-uil-angle-down'"
                    class="w-5 h-5 text-slate-600"
                  />
                </button>

                <!-- Filter Dropdown -->
                <div
                  v-if="isFilterMenuOpen"
                  class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-10"
                >
                  <!-- Status Filter -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      v-model="selectedStatus"
                      class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="">All Status</option>
                      <option>Pending</option>
                      <option>Resolved</option>
                      <option>Spam</option>
                    </select>
                  </div>

                  <!-- Date Range Filter -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                    <select
                      v-model="selectedDateRange"
                      class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="">All Time</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last 3 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Sort Button -->
              <div class="relative" ref="sortMenuRef">
                <button
                  @click="isSortMenuOpen = !isSortMenuOpen"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <Icon name="i-uil-sort" class="w-5 h-5 text-slate-600" />
                  <span class="text-sm font-medium text-slate-700">Sort</span>
                  <Icon
                    :name="isSortMenuOpen ? 'i-uil-angle-up' : 'i-uil-angle-down'"
                    class="w-5 h-5 text-slate-600"
                  />
                </button>

                <!-- Sort Dropdown -->
                <div
                  v-if="isSortMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-1 z-10"
                >
                  <button
                    v-for="option in sortOptions"
                    :key="option.value"
                    @click="selectSortOption(option.value)"
                    class="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                    :class="{ 'bg-slate-50': sortBy === option.value }"
                  >
                    <Icon :name="option.icon" class="w-4 h-4" />
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inquiries List -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <ConsoleInquiriesList
          v-for="inquiry in paginatedInquiries"
          :key="inquiry.id"
          v-bind="inquiry"
          @resolve="handleResolve(inquiry)"
          @delete="handleDelete(inquiry)"
        />
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex items-center justify-between">
        <div class="text-sm text-slate-600">
          Showing {{ paginationStart }} to {{ paginationEnd }} of {{ totalInquiries }} inquiries
        </div>
        <div class="flex space-x-2">
          <button 
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="btn-secondary px-4 py-2"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          <button 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="btn-primary px-4 py-2"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

// Sample inquiries data
const inquiries = ref([
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    subject: "Product Inquiry - Recycling Machine",
    message: "I would like to know more about your recycling machines and their specifications...",
    date: "2024-01-20T10:30:00",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Quote Request - Industrial Equipment",
    message: "We are looking for industrial equipment for our new facility...",
    date: "2024-01-19T15:45:00",
    status: "Resolved",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    subject: "Bulk Order Information",
    message: "Interested in placing a bulk order for plastic containers...",
    date: "2024-01-18T09:15:00",
    status: "Pending",
  },
]);

// Filter and Sort State
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedDateRange = ref("");
const sortBy = ref("newest");
const isFilterMenuOpen = ref(false);
const isSortMenuOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;

// Refs for click outside
const filterMenuRef = ref(null);
const sortMenuRef = ref(null);

// Close menus when clicking outside
onClickOutside(filterMenuRef, () => (isFilterMenuOpen.value = false));
onClickOutside(sortMenuRef, () => (isSortMenuOpen.value = false));

// Computed Properties
const hasActiveFilters = computed(() => {
  return selectedStatus.value !== "" || selectedDateRange.value !== "";
});

const filteredInquiries = computed(() => {
  let result = [...inquiries.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (inquiry) =>
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.email.toLowerCase().includes(query) ||
        inquiry.subject.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (selectedStatus.value) {
    result = result.filter((inquiry) => inquiry.status === selectedStatus.value);
  }

  // Apply date range filter
  if (selectedDateRange.value) {
    const now = new Date();
    const inquiryDate = (date: string) => new Date(date);
    
    switch (selectedDateRange.value) {
      case "Last 7 Days":
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        result = result.filter((inquiry) => inquiryDate(inquiry.date) >= sevenDaysAgo);
        break;
      case "Last 30 Days":
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        result = result.filter((inquiry) => inquiryDate(inquiry.date) >= thirtyDaysAgo);
        break;
      case "Last 3 Months":
        const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
        result = result.filter((inquiry) => inquiryDate(inquiry.date) >= threeMonthsAgo);
        break;
    }
  }

  // Apply sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return result;
});

// Pagination computed properties
const totalInquiries = computed(() => filteredInquiries.value.length);
const totalPages = computed(() => Math.ceil(totalInquiries.value / itemsPerPage));
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const paginationEnd = computed(() => 
  Math.min(currentPage.value * itemsPerPage, totalInquiries.value)
);

const paginatedInquiries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredInquiries.value.slice(start, end);
});

// Sort options
const sortOptions = ref([
  { value: "newest", label: "Newest First", icon: "i-uil-sort-amount-down" },
  { value: "oldest", label: "Oldest First", icon: "i-uil-sort-amount-up" },
  { value: "status", label: "By Status", icon: "i-uil-list-ul" },
]);

// Action handlers
const handleResolve = (inquiry) => {
  console.log("Resolve inquiry:", inquiry);
};

const handleDelete = (inquiry) => {
  console.log("Delete inquiry:", inquiry);
};

// Helper functions
const clearFilters = () => {
  selectedStatus.value = "";
  selectedDateRange.value = "";
};

const selectSortOption = (value) => {
  sortBy.value = value;
  isSortMenuOpen.value = false;
};
</script>
