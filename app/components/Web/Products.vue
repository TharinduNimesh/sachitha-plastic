<template>
  <div class="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Search and Filters -->
    <div class="bg-white rounded-xl shadow-sm  py-6">
      <div class="flex flex-col gap-6">
        <!-- Search Bar -->
        <div class="relative max-w-2xl">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
            />
            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <!-- Active Filters Display -->
          <div class="flex flex-wrap items-center gap-2">
            <span v-if="!hasActiveFilters" class="text-sm text-slate-500">No active filters</span>
            <div v-else class="flex items-center gap-2">
              <button
                @click="resetFilters"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm hover:bg-emerald-100 transition-colors duration-300"
              >
                <span>{{ selectedCategory }}</span>
                <Icon name="heroicons:x-mark" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center gap-3 ml-auto">
            <!-- Filter Button -->
            <div class="relative" ref="filterMenuRef">
              <button
                @click="isFilterMenuOpen = !isFilterMenuOpen"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-300"
              >
                <Icon name="heroicons:funnel" class="w-5 h-5 text-slate-500" />
                <span class="text-sm font-medium text-slate-700">Filters</span>
              </button>

              <!-- Filter Menu -->
              <div
                v-show="isFilterMenuOpen"
                class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50"
              >
                <div class="p-4">
                  <h3 class="font-medium text-slate-900 mb-3">Category</h3>
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

            <!-- Sort Dropdown -->
            <select
              v-model="sortBy"
              class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid/List View -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>

    <template v-else>
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
        <h3 class="text-lg font-medium text-slate-900 mb-2">No products found</h3>
        <p class="text-slate-600">Try adjusting your search or filter to find what you're looking for.</p>
        <button
          @click="resetFilters"
          class="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <!-- Load More -->
      <div v-else-if="hasMoreItems" class="flex justify-center mt-12">
        <button
          @click="loadMore"
          class="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors duration-300"
        >
          Load More
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'
import type { Product } from '~/types/product.types';

// State
const loading = ref(false)
const products = ref<Product[]>([])
const searchQuery = ref("")
const selectedCategory = ref("")
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref<'newest' | 'oldest' | 'name_asc' | 'name_desc'>('newest')
const displayedItems = ref(12)
const isFilterMenuOpen = ref(false)
const filterMenuRef = ref()

// Supabase Client
const client = useSupabaseClient<Database>()

// Fetch Products
const fetchProducts = async () => {
  try {
    loading.value = true

    const { data, error } = await client
      .from('products')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('status', 'Active')
      .order('created_at', { ascending: false })

    if (error) throw error

    products.value = data?.map(product => ({
      ...product,
      category: product.category?.name || 'Uncategorized'
    })) || []
  } catch (error) {
    console.error('Error fetching products:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

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
    .slice(0, displayedItems.value)
})

const hasMoreItems = computed(() => {
  const filtered = products.value?.filter(product => {
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
  return filtered.length > displayedItems.value
})

// Methods
const loadMore = () => {
  displayedItems.value += 12
}

const resetFilters = () => {
  searchQuery.value = ""
  selectedCategory.value = ""
  isFilterMenuOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (filterMenuRef.value && !filterMenuRef.value.contains(event.target as Node)) {
    isFilterMenuOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts()
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>
