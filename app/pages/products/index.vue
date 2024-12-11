<template>
  <NuxtLayout name="web">
    <div class="min-h-screen bg-gradient-to-br py-24 px-4">
      <div class="container mx-auto">
        <!-- Hero Section -->
        <div class="max-w-4xl mx-auto text-center mb-16">
          <div class="mb-12">
            <span
              class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-4"
            >
              Our Products
            </span>
            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore Our Product Range
            </h1>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our comprehensive collection of high-quality plastic
              products and recycling machinery designed to meet your industrial
              needs.
            </p>
          </div>
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
                <span v-if="!hasActiveFilters" class="text-sm text-slate-500"
                  >No active filters</span
                >

                <!-- Category Filter Tag -->
                <span
                  v-if="selectedCategory"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium"
                >
                  <Icon name="i-uil-box" class="w-4 h-4" />
                  {{ selectedCategory }}
                  <button
                    @click="selectedCategory = ''"
                    class="hover:text-emerald-800"
                  >
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
                  <button
                    @click="selectedStatus = ''"
                    class="hover:text-slate-800"
                  >
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
                    <span class="text-sm font-medium text-slate-700"
                      >Filters</span
                    >
                    <Icon
                      :name="
                        isFilterMenuOpen ? 'i-uil-angle-up' : 'i-uil-angle-down'
                      "
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
                      <label
                        class="block text-sm font-medium text-slate-700 mb-2"
                        >Category</label
                      >
                      <select
                        v-model="selectedCategory"
                        class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      >
                        <option value="">All Categories</option>
                        <option
                          v-for="category in uniqueCategories"
                          :key="category"
                        >
                          {{ category }}
                        </option>
                      </select>
                    </div>

                    <!-- Status Filter -->
                    <div>
                      <label
                        class="block text-sm font-medium text-slate-700 mb-2"
                        >Status</label
                      >
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
                      :name="
                        isSortMenuOpen ? 'i-uil-angle-up' : 'i-uil-angle-down'
                      "
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

        <!-- Latest Products Section -->
        <div class="mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Section Header -->
            <div class="flex justify-between items-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900">
                Latest Products
              </h2>
              <div class="flex gap-4">
                <button
                  @click="scrollLeft"
                  class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <Icon
                    name="heroicons:chevron-left"
                    class="w-6 h-6 text-slate-600"
                  />
                </button>
                <button
                  @click="scrollRight"
                  class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <Icon
                    name="heroicons:chevron-right"
                    class="w-6 h-6 text-slate-600"
                  />
                </button>
              </div>
            </div>

            <!-- Scrollable Container -->
            <div class="relative overflow-hidden">
              <div
                ref="productScrollContainer"
                class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style="scroll-behavior: smooth"
              >
                <div
                  v-for="product in filteredProducts.slice(0, 6)"
                  :key="product.id"
                  class="flex-none w-72"
                >
                  <WebProductCard :product="product" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- trending products -->
        <div class="mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Section Header -->
            <div class="flex justify-between items-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900">
                Trending Products
              </h2>
              <div class="flex gap-4">
                <button
                  @click="scrollTrendingLeft"
                  class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <Icon
                    name="heroicons:chevron-left"
                    class="w-6 h-6 text-slate-600"
                  />
                </button>
                <button
                  @click="scrollTrendingRight"
                  class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <Icon
                    name="heroicons:chevron-right"
                    class="w-6 h-6 text-slate-600"
                  />
                </button>
              </div>
            </div>

            <!-- Scrollable Container -->
            <div class="relative overflow-hidden">
              <div
                ref="trendingScrollContainer"
                class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style="scroll-behavior: smooth"
              >
                <div
                  v-for="product in filteredProducts.slice(0, 6)"
                  :key="product.id"
                  class="flex-none w-72"
                >
                  <WebProductCard :product="product" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- All Product Grid -->
        <div class="mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Grid Header -->
            <div
              class="flex flex-col md:flex-row justify-between items-center mb-8"
            >
              <div>
                <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  All Products
                </h2>
                <p class="text-slate-600">
                  {{ filteredProducts.length }} products available
                </p>
              </div>
              <div class="flex items-center gap-4 mt-4 md:mt-0">
                <button
                  @click="viewMode = 'grid'"
                  class="flex items-center gap-2 px-4 py-2 transition-colors"
                  :class="
                    viewMode === 'grid'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-emerald-600'
                  "
                >
                  <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
                  <span>Grid View</span>
                </button>
                <button
                  @click="viewMode = 'list'"
                  class="flex items-center gap-2 px-4 py-2 transition-colors"
                  :class="
                    viewMode === 'list'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-emerald-600'
                  "
                >
                  <Icon name="heroicons:bars-3" class="w-5 h-5" />
                  <span>List View</span>
                </button>
              </div>
            </div>

            <!-- Products Grid/List View -->
            <div
              v-if="viewMode === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              <WebProductCard
                v-for="product in filteredProducts.slice(0, displayedItems)"
                :key="product.id"
                :product="product"
                class="transition-all duration-300 hover:-translate-y-1"
              />
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
              <div
                v-for="product in filteredProducts.slice(0, displayedItems)"
                :key="product.id"
                class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div class="flex items-center gap-6 p-4">
                  <!-- Product Image -->
                  <div class="relative w-40 h-40 flex-shrink-0">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <span
                      v-if="product.isNew"
                      class="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full"
                    >
                      New
                    </span>
                  </div>

                  <!-- Product Info -->
                  <div class="flex-grow min-w-0">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h3 class="text-lg font-semibold text-slate-900 mb-2">
                          {{ product.name }}
                        </h3>
                        <p class="text-slate-600 text-sm mb-3 line-clamp-2">
                          {{ product.description }}
                        </p>
                        <div class="flex items-center gap-2 mb-4">
                          <span
                            class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                          >
                            {{ product.category }}
                          </span>
                        </div>
                      </div>
                      <NuxtLink
                        :to="product.link"
                        class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                      >
                        View Details
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Load More Button -->
            <div
              v-if="displayedItems < filteredProducts.length"
              class="text-center mt-8"
            >
              <button
                @click="loadMore"
                class="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <span>Load More</span>
                <Icon name="heroicons:arrow-down" class="w-4 h-4" />
              </button>
              <p class="text-sm text-slate-600 mt-2">
                Showing {{ displayedItems }} of
                {{ filteredProducts.length }} products
              </p>
            </div>

            <!-- Empty State -->
            <motion-fade-in v-if="filteredProducts.length === 0">
              <div
                class="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl"
              >
                <Icon
                  name="heroicons:cube"
                  class="mx-auto w-24 h-24 text-emerald-300 mb-6"
                />
                <h2 class="text-3xl font-bold text-slate-800 mb-4">
                  No Products Found
                </h2>
                <p class="text-slate-600 mb-8 max-w-md mx-auto">
                  Adjust your search or explore our full range of sustainable
                  solutions.
                </p>
                <button
                  @click="resetFilters"
                  class="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Reset Filters
                </button>
              </div>
            </motion-fade-in>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { products } = useProducts();

// Reactive state
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedStatus = ref("");
const isFilterMenuOpen = ref(false);
const isSortMenuOpen = ref(false);
const sortBy = ref("newest");
const filterMenuRef = ref(null);
const sortMenuRef = ref(null);
const productScrollContainer = ref(null);
const trendingScrollContainer = ref(null);
const viewMode = ref("grid");

// Load More functionality
const gridItemsPerPage = 20; // Items per page for grid view
const listItemsPerPage = 5; // Items per page for list view
const displayedItems = ref(gridItemsPerPage); // Current number of displayed items

const loadMore = () => {
  // Increase based on view mode
  const increment =
    viewMode.value === "grid" ? gridItemsPerPage : listItemsPerPage;
  displayedItems.value += increment;
};

// Watch view mode changes to reset displayed items
watch(viewMode, (newMode) => {
  displayedItems.value =
    newMode === "grid" ? gridItemsPerPage : listItemsPerPage;
});

// Sort options
const sortOptions = [
  { label: "Newest First", value: "newest", icon: "i-uil-clock" },
  { label: "Oldest First", value: "oldest", icon: "i-uil-history" },
  { label: "Name A-Z", value: "name_asc", icon: "i-uil-sort-amount-down" },
  { label: "Name Z-A", value: "name_desc", icon: "i-uil-sort-amount-up" },
];

// Computed properties
const hasActiveFilters = computed(() => {
  return selectedCategory.value || selectedStatus.value;
});

const uniqueCategories = computed(() => {
  return [...new Set(products.map((p) => p.category))];
});

const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchesSearch =
      !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      !selectedCategory.value || product.category === selectedCategory.value;

    const matchesStatus =
      !selectedStatus.value || product.status === selectedStatus.value;

    return matchesSearch && matchesCategory && matchesStatus;
  });
});

// Methods
const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  selectedStatus.value = "";
};

const selectSortOption = (value) => {
  sortBy.value = value;
  isSortMenuOpen.value = false;
};

// Click outside to close dropdowns
onMounted(() => {
  document.addEventListener("click", (event) => {
    if (filterMenuRef.value && !filterMenuRef.value.contains(event.target)) {
      isFilterMenuOpen.value = false;
    }
    if (sortMenuRef.value && !sortMenuRef.value.contains(event.target)) {
      isSortMenuOpen.value = false;
    }
  });
});

// Scroll Methods
const scrollLeft = () => {
  if (productScrollContainer.value) {
    const container = productScrollContainer.value;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (productScrollContainer.value) {
    const container = productScrollContainer.value;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

// Trending Products Scroll Methods
const scrollTrendingLeft = () => {
  if (trendingScrollContainer.value) {
    const container = trendingScrollContainer.value;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

const scrollTrendingRight = () => {
  if (trendingScrollContainer.value) {
    const container = trendingScrollContainer.value;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
/* Grid Transitions */
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.5s ease;
}

.product-grid-enter-from,
.product-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.product-grid-move {
  transition: transform 0.5s ease;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
