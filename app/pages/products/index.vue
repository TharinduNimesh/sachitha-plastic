<template>
  <NuxtLayout name="web">
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-24 px-4">
      <div class="container mx-auto">
        <!-- Hero Section -->
        <div class="max-w-4xl mx-auto text-center mb-16">
          <div class="mb-12">
            <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-4">
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

          <!-- Search and Filter Container -->
          <div class="relative z-10">
            <div class="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-100">
              <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
                <!-- Search Input -->
                <div class="relative flex-grow w-full">
                  <input v-model="searchQuery" type="text" placeholder="Search sustainable products..."
                    class="w-full px-5 py-4 pl-12 text-slate-700 bg-slate-100/50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300">
                  <Icon name="heroicons:magnifying-glass"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                </div>

                <!-- Category Dropdown -->
                <div class="w-full md:w-auto">
                  <select v-model="selectedCategory"
                    class="w-full px-5 py-4 text-slate-700 bg-slate-100/50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 transition-all duration-300">
                    <option value="">All Categories</option>
                    <option v-for="category in uniqueCategories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <motion-fade-in>
          <transition-group tag="div" name="product-grid"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div v-for="product in filteredProducts" :key="product.id">
              <WebProductCard :product="product" />
            </div>
          </transition-group>
        </motion-fade-in>

        <!-- Empty State -->
        <motion-fade-in v-if="filteredProducts.length === 0">
          <div class="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl">
            <Icon name="heroicons:cube" class="mx-auto w-24 h-24 text-emerald-300 mb-6" />
            <h2 class="text-3xl font-bold text-slate-800 mb-4">
              No Products Found
            </h2>
            <p class="text-slate-600 mb-8 max-w-md mx-auto">
              Adjust your search or explore our full range of sustainable solutions.
            </p>
            <button @click="resetFilters"
              class="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Reset Filters
            </button>
          </div>
        </motion-fade-in>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { products } = useProducts();

// Reactive state
const searchQuery = ref('');
const selectedCategory = ref('');

// Computed properties
const uniqueCategories = computed(() => {
  return [...new Set(products.map(p => p.category))];
});

const filteredProducts = computed(() => {
  return products.filter(product => {
    const matchesSearch = !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory = !selectedCategory.value ||
      product.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

// Methods
const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
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
</style>
