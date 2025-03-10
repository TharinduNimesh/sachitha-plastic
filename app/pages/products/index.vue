<template>
  <NuxtLayout name="web">
    <div class="min-h-screen bg-gradient-to-br py-24 px-4">
      <div class="container mx-auto">
        <!-- Hero Section -->
        <div class="max-w-4xl mx-auto text-center mb-16">
          <div class="mb-12">
            <span class="px-3 py-1 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-full">
              Our Products
            </span>
          </div>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">
            Explore Our Product Range
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our collection of high-quality plastic products and manufacturing solutions designed for durability and sustainability.
          </p>
        </div>

        <!-- Filters Section -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <!-- Search and Filter -->
          <div class="flex items-center gap-4 w-full md:w-auto">
            <div class="relative flex-1 md:flex-none md:w-80">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <Icon
                name="heroicons:magnifying-glass"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
            </div>

            <div class="relative" ref="filterMenuRef">
              <button
                @click="isFilterMenuOpen = !isFilterMenuOpen"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Icon name="heroicons:funnel" class="w-5 h-5" />
                <span>Filter</span>
                <span v-if="selectedCategory" class="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-sm">
                  {{ selectedCategory }}
                </span>
              </button>

              <!-- Filter Menu -->
              <div
                v-show="isFilterMenuOpen"
                class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
              >
                <div class="p-4">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-medium text-slate-900">Category</h3>
                    <button
                      v-if="selectedCategory"
                      @click="selectedCategory = ''"
                      class="text-sm text-slate-500 hover:text-slate-700"
                    >
                      Reset
                    </button>
                  </div>
                  <select
                    v-model="selectedCategory"
                    class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="">All Categories</option>
                    <option
                      v-for="category in uniqueCategories"
                      :key="category"
                      :value="category"
                    >
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- View Mode Toggle -->
            <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'p-2 rounded-lg transition-colors duration-300',
                  viewMode === 'grid'
                    ? 'bg-white shadow text-emerald-600'
                    : 'text-slate-600 hover:text-slate-900',
                ]"
              >
                <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'p-2 rounded-lg transition-colors duration-300',
                  viewMode === 'list'
                    ? 'bg-white shadow text-emerald-600'
                    : 'text-slate-600 hover:text-slate-900',
                ]"
              >
                <Icon name="heroicons:bars-3" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Sort -->
          <div class="relative" ref="sortMenuRef">
            <button
              @click="isSortMenuOpen = !isSortMenuOpen"
              class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Icon name="heroicons:arrows-up-down" class="w-5 h-5" />
              <span>Sort by: {{ sortOptions.find(opt => opt.value === sortBy)?.label }}</span>
            </button>

            <!-- Sort Menu -->
            <div
              v-show="isSortMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
            >
              <div class="py-1">
                <button
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="selectSortOption(option.value)"
                  class="w-full px-4 py-2 text-left hover:bg-slate-50 text-sm"
                  :class="sortBy === option.value ? 'text-emerald-600' : 'text-slate-700'"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest Products Section -->
        <div class="mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Section Header -->
            <div class="flex justify-between items-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900">Latest Products</h2>
              <div class="flex gap-2">
                <button
                  @click="scrollLeft"
                  class="w-12 h-12 flex justify-center items-center rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <Icon name="heroicons:chevron-left" class="w-6 h-6 text-slate-600" />
                </button>
                <button
                  @click="scrollRight"
                  class="w-12 h-12 flex justify-center items-center rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <Icon name="heroicons:chevron-right" class="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>

            <!-- Latest Products Grid/List View -->
            <div class="relative overflow-hidden">
              <div
                v-if="viewMode === 'grid'"
                ref="productScrollContainer"
                class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style="scroll-behavior: smooth"
              >
                <div
                  v-for="product in latestProducts"
                  :key="product.id"
                  class="flex-none w-72"
                >
                  <WebProductCard :product="product" />
                </div>
              </div>

              <div v-else class="space-y-6">
                <WebProductListCard
                  v-for="product in latestProducts"
                  :key="product.id"
                  :product="product"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- All Product Grid -->
        <div class="mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Grid Header -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">All Products</h2>
                <p class="text-slate-600">{{ filteredProducts.length }} products available</p>
              </div>
            </div>

            <!-- Products Grid/List View -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              <template v-for="product in gridProducts" :key="product.id">
                <WebProductCard
                  v-if="!product.isEmpty"
                  :product="product"
                  class="transition-all duration-300 hover:-translate-y-1"
                />
                <div v-else class="opacity-0"><!-- Empty slot placeholder --></div>
              </template>
            </div>

            <div v-else class="space-y-6">
              <WebProductListCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8">
              <CommonPagination
                v-model:currentPage="currentPage"
                :total-pages="totalPages"
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
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                @click="resetFilters"
                class="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Database } from '~/types/database.types'
import { debounce } from "lodash-es";
import type { Product } from '~/types/product.types'

interface ExtendedProduct extends Product {
  isEmpty?: boolean;
  category: string;
}

interface SortOption {
  label: string;
  value: 'newest' | 'oldest' | 'name_asc' | 'name_desc';
}

// State
const loading = ref(false)
const products = ref<ExtendedProduct[]>([])
const searchQuery = ref("")
const selectedCategory = ref("")
const viewMode = ref("grid")
const displayedItems = ref(20)
const isFilterMenuOpen = ref(false)
const isSortMenuOpen = ref(false)
const sortBy = ref<SortOption['value']>("newest")
const productScrollContainer = ref<HTMLElement | null>(null)
const filterMenuRef = ref<HTMLElement | null>(null)
const sortMenuRef = ref<HTMLElement | null>(null)
const totalCount = ref(0)

// Constants
const ITEMS_PER_PAGE = {
  grid: 20,
  list: 5
} as const

const sortOptions: SortOption[] = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Name (A-Z)', value: 'name_asc' },
  { label: 'Name (Z-A)', value: 'name_desc' },
]

// Click outside handlers
onClickOutside(filterMenuRef, () => {
  isFilterMenuOpen.value = false
})

onClickOutside(sortMenuRef, () => {
  isSortMenuOpen.value = false
})

// Methods
const loadMore = () => {
  displayedItems.value += ITEMS_PER_PAGE[viewMode.value as keyof typeof ITEMS_PER_PAGE]
}

const clearFilters = () => {
  searchQuery.value = ""
  selectedCategory.value = ""
}

const resetFilters = () => {
  searchQuery.value = ""
  selectedCategory.value = ""
  isFilterMenuOpen.value = false
}

const scrollLeft = () => {
  if (productScrollContainer.value) {
    const container = productScrollContainer.value
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  }
}

const scrollRight = () => {
  if (productScrollContainer.value) {
    const container = productScrollContainer.value
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }
}

const selectSortOption = (value: SortOption['value']) => {
  sortBy.value = value
  isSortMenuOpen.value = false
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})

// View mode changes
watch(viewMode, (newMode) => {
  displayedItems.value = ITEMS_PER_PAGE[newMode as keyof typeof ITEMS_PER_PAGE]
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = computed(() => {
  // For list view, show 5 items per page
  if (viewMode.value === 'list') return 5
  
  // For grid view, calculate based on screen size and desired rows
  const desiredRows = 5 // We want approximately 5 rows for a balanced look
  const screenWidth = window.innerWidth
  
  if (screenWidth >= 1280) {
    // xl:grid-cols-4 -> 4 columns × 5 rows = 20 items
    return 4 * desiredRows
  } else if (screenWidth >= 1024) {
    // lg:grid-cols-3 -> 3 columns × 6 rows = 18 items
    return 3 * 6 // Using 6 rows for 3 columns to maintain visual balance
  } else if (screenWidth >= 640) {
    // sm:grid-cols-2 -> 2 columns × 8 rows = 16 items
    return 2 * 8 // Using 8 rows for 2 columns for better mobile experience
  }
  // 1 column -> Show 10 items for best mobile experience
  return 10
})

// Reset pagination when viewport changes
const debouncedResize = debounce(() => {
  // Force recompute of itemsPerPage and adjust currentPage if needed
  const newItemsPerPage = itemsPerPage.value
  const totalItems = filteredProducts.value.length
  const maxPages = Math.ceil(totalItems / newItemsPerPage)
  
  // If current page would be out of bounds with new items per page, adjust it
  if (currentPage.value > maxPages) {
    currentPage.value = maxPages || 1
  }
}, 250)

// Setup resize listener
onMounted(() => {
  window.addEventListener('resize', debouncedResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize)
})

// Reset pagination when filters or view mode changes
watch([searchQuery, selectedCategory, sortBy, viewMode], () => {
  currentPage.value = 1
})

// Fetch products
const fetchProducts = async () => {
  try {
    loading.value = true;
    const client = useSupabaseClient<Database>();
    
    // First get total count
    const { count } = await client
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Active');

    // Then fetch paginated data
    const { data, error } = await client
      .from('products')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('status', 'Active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    products.value = data?.map(product => ({
      ...product,
      category: product.category?.name || 'Uncategorized',
    })) || [];

    totalCount.value = count || 0;
  } catch (error) {
    console.error('Error fetching products:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed
const hasActiveFilters = computed(() => Boolean(selectedCategory.value))

const uniqueCategories = computed(() => 
  [...new Set(products.value?.map(p => p.category) || [])]
)

const filteredProducts = computed(() => {
  if (!products.value?.length) return []

  return products.value
    .filter(product => {
      const searchTerm = searchQuery.value.toLowerCase()
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
          !product.description.toLowerCase().includes(searchTerm)) {
        return false
      }
      
      if (selectedCategory.value && product.category !== selectedCategory.value) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'name_asc':
          return a.name.localeCompare(b.name)
        case 'name_desc':
          return b.name.localeCompare(a.name)
        default: // newest
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage.value)
)

// Add empty product slots to maintain grid layout
const gridProducts = computed(() => {
  if (viewMode.value === 'list') return paginatedProducts.value
  
  const products = [...paginatedProducts.value]
  const screenWidth = window.innerWidth
  let columnsCount = 1
  
  if (screenWidth >= 1280) columnsCount = 4
  else if (screenWidth >= 1024) columnsCount = 3
  else if (screenWidth >= 640) columnsCount = 2
  
  // Calculate how many empty slots we need to add to maintain grid
  const remainder = products.length % columnsCount
  if (remainder > 0) {
    const emptySlotsNeeded = columnsCount - remainder
    // Add empty slots to maintain grid layout
    for (let i = 0; i < emptySlotsNeeded; i++) {
      products.push({ isEmpty: true } as any)
    }
  }
  
  return products
})

const latestProducts = computed(() => {
  if (!products.value?.length) return []

  return products.value
    .filter(product => {
      const searchTerm = searchQuery.value.toLowerCase()
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
          !product.description.toLowerCase().includes(searchTerm)) {
        return false
      }
      
      if (selectedCategory.value && product.category !== selectedCategory.value) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'name_asc':
          return a.name.localeCompare(b.name)
        case 'name_desc':
          return b.name.localeCompare(a.name)
        default: // newest
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })
    .slice(0, 10)
})

useHead({
  title: 'Products - Samarasinghe Trade Center',
  meta: [
    {
      name: 'description',
      content: 'Explore our wide range of high-quality plastic products and recycling machinery. From household items to industrial solutions, discover sustainable products made in Sri Lanka.'
    },
    {
      name: 'keywords',
      content: 'plastic products, recycling machinery, household items, industrial solutions, Sri Lanka, sustainable products'
    },
    { name: 'robots', content: 'index, follow' },
    { 
      name: 'canonical', 
      content: 'https://samarasinghetrade.com/products' 
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://samarasinghetrade.com/products'
    }
  ]
})
</script>

<style>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
