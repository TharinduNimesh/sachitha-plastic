<template>
  <div class="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-20">
    <!-- Section Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between mb-12"
    >
      <div class="mb-6 md:mb-0">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">
          Featured Products
        </h2>
        <p class="text-lg text-slate-600 max-w-2xl">
          Discover our collection of high-quality plastic products and
          manufacturing solutions
        </p>
      </div>
      <NuxtLink
        to="/products"
        class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium group whitespace-nowrap"
      >
        View All Products
        <svg
          class="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </NuxtLink>
    </div>

    <!-- Products Grid/List View -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"
      ></div>
    </div>

    <template v-else>
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        <WebProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          class="transition-all duration-300 hover:-translate-y-1"
        />
      </div>

      <div v-else class="space-y-6">
        <WebProductListCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-16">
        <Icon
          name="heroicons:magnifying-glass"
          class="w-12 h-12 mx-auto text-slate-400 mb-4"
        />
        <h3 class="text-lg font-medium text-slate-900 mb-2">
          No products found
        </h3>
        <p class="text-slate-600">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <button
          @click="resetFilters"
          class="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/database.types";
import type { Product } from "~/types/product.types";
import { debounce } from "lodash-es";

interface ExtendedProduct extends Omit<Product, 'category'> {
  category: string;
}

// State
const loading = ref(false);
const products = ref<ExtendedProduct[]>([]);
const searchQuery = ref("");
const selectedCategory = ref("");
const viewMode = ref<"grid" | "list">("grid");
const sortBy = ref<"newest" | "oldest" | "name_asc" | "name_desc">("newest");
const isFilterMenuOpen = ref(false);
const filterMenuRef = ref<HTMLElement | null>(null);

// Initial items to display (default for mobile)
const itemsToDisplay = ref(3);

// Calculate number of items to display based on viewport
const getItemsToDisplay = () => {
  // Check if we're in browser environment
  if (process.client) {
    const width = window.innerWidth;
    if (width >= 1280) return 8; // xl:grid-cols-4 -> 2 rows × 4 columns
    if (width >= 1024) return 6; // lg:grid-cols-3 -> 2 rows × 3 columns
    if (width >= 640) return 4;  // sm:grid-cols-2 -> 2 rows × 2 columns
    return 3; // 1 column -> 3 rows × 1 column
  }
  return 3; // Default for SSR
}

// Update items to display on resize
const updateItemsToDisplay = debounce(() => {
  itemsToDisplay.value = getItemsToDisplay();
}, 250);

// Supabase Client
const client = useSupabaseClient<Database>();

// Fetch Products
const fetchProducts = async () => {
  try {
    loading.value = true;
    const { data, error } = await client
      .from('products')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('status', 'Active')
      .limit(itemsToDisplay.value)
      .order('created_at', { ascending: false });

    if (error) throw error;

    products.value = data?.map(product => ({
      ...product,
      category: product.category?.name || 'Uncategorized',
    })) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed
const hasActiveFilters = computed(() => Boolean(selectedCategory.value));

const uniqueCategories = computed(() => [
  ...new Set(products.value?.map((p) => p.category) || []),
]);

const filteredProducts = computed(() => {
  if (!products.value?.length) return [];

  return products.value
    .filter((product) => {
      const searchTerm = searchQuery.value.toLowerCase();
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm) &&
        !product.description.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }

      if (
        selectedCategory.value &&
        product.category !== selectedCategory.value
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default: // newest
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });
});

// Methods
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  isFilterMenuOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    filterMenuRef.value &&
    !filterMenuRef.value.contains(event.target as Node)
  ) {
    isFilterMenuOpen.value = false;
  }
};

// Lifecycle
onMounted(() => {
  // Set initial items to display based on client viewport
  itemsToDisplay.value = getItemsToDisplay();
  // Then fetch products
  fetchProducts();
  // Add resize listener
  if (process.client) {
    window.addEventListener('resize', updateItemsToDisplay);
  }
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', updateItemsToDisplay);
  }
  document.removeEventListener("click", handleClickOutside);
});

// Watch for viewport changes and refetch products if needed
watch(itemsToDisplay, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    fetchProducts();
  }
});
</script>
