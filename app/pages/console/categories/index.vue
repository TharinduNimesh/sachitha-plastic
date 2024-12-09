<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Categories</h1>
          <p class="mt-1 text-slate-600">
            Manage and organize your product categories
          </p>
        </div>
        <button
          @click="showNewCategoryModal = true"
          class="btn-primary flex items-center space-x-2"
        >
          <Icon name="i-uil-plus" class="w-5 h-5" />
          <span>Add Category</span>
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
                placeholder="Search categories..."
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
              <span v-if="!hasActiveFilters" class="text-sm text-slate-500"
                >{{ filteredCategories.length }} categories found</span
              >

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
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2"
                      >Status</label
                    >
                    <select
                      v-model="selectedStatus"
                      class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="">All Status</option>
                      <option>Active</option>
                      <option>Hidden</option>
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

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConsoleCategoriesCard
          v-for="category in filteredCategories"
          :key="category.id"
          v-bind="category"
          @edit="handleEdit(category)"
          @delete="handleDelete(category)"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

// Sample categories data
const categories = ref([
  {
    id: 1,
    title: "Machinery",
    icon: "i-uil-processor",
    color: "emerald",
    productsCount: 24,
    activeProducts: 18,
    totalViews: 2453,
    status: "Active",
  },
  {
    id: 2,
    title: "Household",
    icon: "i-uil-home",
    color: "blue",
    productsCount: 15,
    activeProducts: 12,
    totalViews: 1876,
    status: "Active",
  },
  {
    id: 3,
    title: "Industrial",
    icon: "i-uil-building",
    color: "orange",
    productsCount: 31,
    activeProducts: 28,
    totalViews: 3254,
    status: "Hidden",
  },
]);

// Filter and Sort State
const searchQuery = ref("");
const selectedStatus = ref("");
const sortBy = ref("name");
const showNewCategoryModal = ref(false);
const isFilterMenuOpen = ref(false);
const isSortMenuOpen = ref(false);

// Refs for click outside
const filterMenuRef = ref(null);
const sortMenuRef = ref(null);

// Close menus when clicking outside
onClickOutside(filterMenuRef, () => (isFilterMenuOpen.value = false));
onClickOutside(sortMenuRef, () => (isSortMenuOpen.value = false));

// Computed Properties
const hasActiveFilters = computed(() => {
  return selectedStatus.value !== "";
});

const filteredCategories = computed(() => {
  let result = [...categories.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((category) =>
      category.title.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (selectedStatus.value) {
    result = result.filter(
      (category) => category.status === selectedStatus.value
    );
  }

  // Apply sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case "name":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "products":
        return b.productsCount - a.productsCount;
      case "views":
        return b.totalViews - a.totalViews;
      default:
        return 0;
    }
  });

  return result;
});

// Sort options
const sortOptions = ref([
  { value: "name", label: "Name A-Z", icon: "i-uil-sort-amount-down" },
  { value: "name-desc", label: "Name Z-A", icon: "i-uil-sort-amount-up" },
  { value: "products", label: "Most Products", icon: "i-uil-box" },
  { value: "views", label: "Most Views", icon: "i-uil-eye" },
]);

// Action handlers
const handleEdit = (category) => {
  console.log("Edit category:", category);
};

const handleDelete = (category) => {
  console.log("Delete category:", category);
};

// Helper functions
const clearFilters = () => {
  selectedStatus.value = "";
};

const selectSortOption = (value) => {
  sortBy.value = value;
  isSortMenuOpen.value = false;
};
</script>
