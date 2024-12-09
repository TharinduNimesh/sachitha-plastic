<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Products</h1>
          <p class="mt-1 text-slate-600">
            Manage your product catalog and inventory
          </p>
        </div>
        <button class="btn-primary flex items-center space-x-2">
          <Icon name="i-uil-plus" class="w-5 h-5" />
          <span>Add Product</span>
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
                placeholder="Search products by name, category or status..."
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
              <span v-if="!hasActiveFilters" class="text-sm text-slate-500">No active filters</span>
              
              <!-- Category Filter Tag -->
              <span 
                v-if="selectedCategory" 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium"
              >
                <Icon name="i-uil-box" class="w-4 h-4" />
                {{ selectedCategory }}
                <button @click="selectedCategory = ''" class="hover:text-emerald-800">
                  <Icon name="i-uil-times" class="w-4 h-4" />
                </button>
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
                  <!-- Category Filter -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <select 
                      v-model="selectedCategory" 
                      class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="">All Categories</option>
                      <option>Machinery</option>
                      <option>Household</option>
                      <option>Industrial</option>
                    </select>
                  </div>

                  <!-- Status Filter -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select 
                      v-model="selectedStatus" 
                      class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="">All Status</option>
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Archived</option>
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

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConsoleProductsCard
          v-for="product in products"
          :key="product.id"
          v-bind="product"
          @edit="handleEdit(product)"
          @preview="handlePreview(product)"
          @delete="handleDelete(product)"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';

// Sample products data
const products = ref([
  {
    id: 1,
    title: 'Recycling Machine',
    category: 'Machinery',
    status: 'Active',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg'
  },
  {
    id: 2,
    title: 'Storage Box Set',
    category: 'Household',
    status: 'Active',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s'
  },
  {
    id: 3,
    title: 'Industrial Pallet',
    category: 'Industrial',
    status: 'Draft',
    image: 'https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg'
  }
]);

// Refs for click outside detection
const filterMenuRef = ref<HTMLElement | null>(null);
const sortMenuRef = ref<HTMLElement | null>(null);

// State
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedStatus = ref('');
const sortBy = ref('newest');
const isFilterMenuOpen = ref(false);
const isSortMenuOpen = ref(false);

// Click outside handlers
onClickOutside(filterMenuRef, () => {
  isFilterMenuOpen.value = false;
});

onClickOutside(sortMenuRef, () => {
  isSortMenuOpen.value = false;
});

// Computed properties
const hasActiveFilters = computed(() => selectedCategory.value || selectedStatus.value);

// Action handlers
const handleEdit = (product) => {
  console.log('Edit product:', product);
};

const handlePreview = (product) => {
  console.log('Preview product:', product);
};

const handleDelete = (product) => {
  console.log('Delete product:', product);
};

// Sort options
const sortOptions = ref([
  { value: 'newest', label: 'Newest First', icon: 'i-uil-clock' },
  { value: 'oldest', label: 'Oldest First', icon: 'i-uil-clock' },
  { value: 'name', label: 'Name A-Z', icon: 'i-uil-sort-alpha-down' },
  { value: 'name-desc', label: 'Name Z-A', icon: 'i-uil-sort-alpha-up-alt' },
]);

// Clear filters
const clearFilters = () => {
  selectedCategory.value = '';
  selectedStatus.value = '';
};

// Select sort option
const selectSortOption = (value) => {
  sortBy.value = value;
  isSortMenuOpen.value = false;
};
</script>
