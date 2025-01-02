<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p class="text-slate-600">Manage customer inquiries and messages</p>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col gap-6">
          <!-- Search Bar -->
          <div class="relative max-w-2xl">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search inquiries..."
                class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Icon
                name="i-uil-search"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <!-- Active Filters Display -->
            <div class="flex flex-wrap items-center gap-2">
              <span v-if="!hasActiveFilters" class="text-sm text-slate-500">
                {{ filteredInquiries.length }} inquiries found
              </span>
              <template v-else>
                <!-- Status Filter Tag -->
                <div
                  v-if="selectedStatus"
                  class="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm"
                >
                  <span>Status: {{ selectedStatus }}</span>
                  <button
                    @click="selectedStatus = ''"
                    class="text-slate-400 hover:text-slate-600"
                  >
                    <Icon name="i-uil-times" class="w-4 h-4" />
                  </button>
                </div>

                <!-- Date Range Filter Tag -->
                <div
                  v-if="selectedDateRange"
                  class="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm"
                >
                  <span>{{ selectedDateRange }}</span>
                  <button
                    @click="selectedDateRange = ''"
                    class="text-slate-400 hover:text-slate-600"
                  >
                    <Icon name="i-uil-times" class="w-4 h-4" />
                  </button>
                </div>

                <!-- Clear All Button -->
                <button
                  v-if="hasActiveFilters"
                  @click="clearFilters"
                  class="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Clear all
                </button>
              </template>
            </div>

            <div class="flex items-center gap-3 ml-auto">
              <!-- Filter Button -->
              <div class="relative" ref="filterMenuRef">
                <button
                  @click="isFilterMenuOpen = !isFilterMenuOpen"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  <Icon name="i-uil-filter" class="w-5 h-5" />
                  <span>Filter</span>
                </button>

                <!-- Filter Menu -->
                <div
                  v-if="isFilterMenuOpen"
                  class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-10"
                >
                  <div class="p-4">
                    <h3 class="font-medium text-slate-900 mb-3">Filter by Status</h3>
                    <div class="space-y-2">
                      <label
                        v-for="status in ['Pending', 'Resolved']"
                        :key="status"
                        class="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          :value="status"
                          v-model="selectedStatus"
                          name="status"
                          class="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{{ status }}</span>
                      </label>
                    </div>

                    <hr class="my-4" />

                    <h3 class="font-medium text-slate-900 mb-3">Date Range</h3>
                    <div class="space-y-2">
                      <label
                        v-for="range in ['Last 7 Days', 'Last 30 Days', 'Last 90 Days']"
                        :key="range"
                        class="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          :value="range"
                          v-model="selectedDateRange"
                          name="dateRange"
                          class="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{{ range }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sort Button -->
              <div class="relative" ref="sortMenuRef">
                <button
                  @click="isSortMenuOpen = !isSortMenuOpen"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  <Icon name="i-uil-sort" class="w-5 h-5" />
                  <span>Sort</span>
                </button>

                <!-- Sort Menu -->
                <div
                  v-if="isSortMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-10"
                >
                  <div class="p-2">
                    <button
                      v-for="option in [
                        { value: 'newest', label: 'Newest First' },
                        { value: 'oldest', label: 'Oldest First' },
                      ]"
                      :key="option.value"
                      @click="selectSortOption(option.value)"
                      class="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
                      :class="{ 'text-emerald-600': sortBy === option.value }"
                    >
                      {{ option.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-sm p-8 text-center">
        <div class="flex items-center justify-center">
          <Icon name="i-uil-spinner" class="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="inquiries.length === 0"
        class="bg-white rounded-xl shadow-sm p-8 text-center"
      >
        <Icon
          name="i-uil-envelope"
          class="w-16 h-16 mx-auto mb-4 text-slate-400"
        />
        <h3 class="text-lg font-medium text-slate-900 mb-2">No inquiries yet</h3>
        <p class="text-slate-600">
          When customers send inquiries, they will appear here.
        </p>
      </div>

      <!-- Inquiries List -->
      <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div v-if="paginatedInquiries.length === 0" class="p-8 text-center">
          <Icon name="i-uil-envelope" class="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <h3 class="text-lg font-medium text-slate-900 mb-2">No inquiries found</h3>
          <p class="text-slate-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
        <template v-else>
          <ConsoleInquiriesList
            v-for="inquiry in paginatedInquiries"
            :key="inquiry.id"
            v-bind="inquiry"
            @resolve="handleResolve(inquiry)"
            @delete="handleDelete(inquiry)"
          />
        </template>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between px-6 py-4 border-t border-slate-200"
        >
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="text-sm text-slate-600">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { Database } from "~/types";

type Inquiry = Database['public']['Tables']['inquiries']['Row'];
type InquiryStatus = Database['public']['Tables']['inquiry_status']['Row'];
type InquiryWithStatus = Omit<Inquiry, 'status'> & { status: Database['public']['Enums']['InquiryStatus'] | undefined };

const supabase = useSupabaseClient<Database>();
const { success, error } = useToast();

const isLoading = ref(false);
const inquiries = ref<InquiryWithStatus[]>([]);
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedDateRange = ref("");
const sortBy = ref("newest");
const isFilterMenuOpen = ref(false);
const isSortMenuOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;

// Computed property for active filters
const hasActiveFilters = computed(() => {
  return selectedStatus.value !== "" || selectedDateRange.value !== "";
});

// Helper function to clear filters
const clearFilters = () => {
  selectedStatus.value = "";
  selectedDateRange.value = "";
  searchQuery.value = "";
  currentPage.value = 1;
};

// Helper function to select sort option
const selectSortOption = (value: string) => {
  sortBy.value = value;
  isSortMenuOpen.value = false;
};

// Computed filtered inquiries with search and filters
const filteredInquiries = computed(() => {
  let filtered = [...inquiries.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      inquiry =>
        inquiry.name.toLowerCase().includes(query) ||
        inquiry.email.toLowerCase().includes(query) ||
        inquiry.subject.toLowerCase().includes(query) ||
        inquiry.message.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(inquiry => inquiry.status === selectedStatus.value);
  }

  // Apply date range filter
  if (selectedDateRange.value) {
    const now = new Date();
    let cutoffDate = new Date();

    switch (selectedDateRange.value) {
      case "Last 7 Days":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "Last 30 Days":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "Last 90 Days":
        cutoffDate.setDate(now.getDate() - 90);
        break;
    }

    filtered = filtered.filter(
      inquiry => new Date(inquiry.created_at) >= cutoffDate
    );
  }

  // Apply sort
  filtered.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortBy.value === "newest" ? dateB - dateA : dateA - dateB;
  });

  return filtered;
});

// Computed properties for pagination
const totalPages = computed(() => 
  Math.ceil(filteredInquiries.value.length / itemsPerPage)
);

const paginatedInquiries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredInquiries.value.slice(start, end);
});

// Fetch inquiries with their status
const fetchInquiries = async () => {
  try {
    isLoading.value = true;
    
    // First get all inquiries
    const { data: inquiriesData, error: inquiriesError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (inquiriesError) throw inquiriesError;

    // Then get all statuses
    const { data: statusData, error: statusError } = await supabase
      .from('inquiry_status')
      .select('*');
    
    if (statusError) throw statusError;

    // Merge inquiries with their status
    inquiries.value = inquiriesData.map(inquiry => ({
      ...inquiry,
      status: statusData.find(s => s.inquiry_id === inquiry.id)?.status || 'Pending'
    }));

  } catch (error: any) {
    error(error.message || 'Failed to load inquiries');
  } finally {
    isLoading.value = false;
  }
};

// Handle resolving an inquiry
const handleResolve = async (inquiry: InquiryWithStatus) => {
  try {
    const { error: resolveError } = await supabase
      .from('inquiry_status')
      .update({
        status: 'Resolved'
      })
      .eq('inquiry_id', inquiry.id);
    
    if (resolveError) throw resolveError;

    // Update local state
    const index = inquiries.value.findIndex(i => i.id === inquiry.id);
    if (index !== -1) {
      inquiries.value[index] = {
        ...inquiry,
        status: 'Resolved'
      };
    }

    success('Inquiry marked as resolved');
  } catch (err) {
    error(err instanceof Error ? err.message : 'Failed to resolve inquiry');
  }
};

// Handle deleting an inquiry
const handleDelete = async (inquiry: InquiryWithStatus) => {
  try {
    // First delete the status (due to foreign key constraint)
    const { error: statusError } = await supabase
      .from('inquiry_status')
      .delete()
      .eq('inquiry_id', inquiry.id);
    
    if (statusError) throw statusError;

    // Then delete the inquiry
    const { error: inquiryError } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', inquiry.id);
    
    if (inquiryError) throw inquiryError;

    // Update local state
    inquiries.value = inquiries.value.filter(i => i.id !== inquiry.id);

    success('Inquiry deleted successfully');
  } catch (error: any) {
    error(error.message || 'Failed to delete inquiry');
  }
};

// Click outside handlers
const filterMenuRef = ref();
const sortMenuRef = ref();

onClickOutside(filterMenuRef, () => (isFilterMenuOpen.value = false));
onClickOutside(sortMenuRef, () => (isSortMenuOpen.value = false));

// Add meta information for SEO
useHead({
  title: 'Inquiries - Console',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});

onMounted(() => {
  fetchInquiries();
});
</script>
