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
        <NuxtLink to="/console/products/new" class="btn-primary flex items-center space-x-2">
          <Icon name="i-uil-plus" class="w-5 h-5" />
          <span>Add Product</span>
        </NuxtLink>
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
                      <option value="Active">Active</option>
                      <option value="Hidden">Archived</option>
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
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>

      <div v-else-if="error" class="p-4 bg-red-50 text-red-600 rounded-xl">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConsoleProductsCard
          v-for="product in filteredProducts"
          :key="product.id"
          :id="product.id"
          :title="product.name"
          :category="product.category.name"
          :status="product.status === 'Hidden' ? 'Archived' : product.status"
          :image="product.primary_image || ''"
          @edit="handleEdit(product)"
          @preview="handlePreview(product)"
          @archive="handleDelete(product)"
          @toggle-status="toggleStatus(product)"
        />
      </div>
    </div>
    
    <!-- Add Confirmation Modal -->
    <CommonConfirmModal
      v-model="showConfirmModal"
      title="Archive Product"
      :message="confirmMessage"
      confirm-label="Archive"
      @confirm="confirmArchive"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Database } from '~/types/database.types'

type Product = Database['public']['Tables']['products']['Row'] & {
  category: Database['public']['Tables']['categories']['Row']
}

// Replace dummy products with real data
const { fetchProducts, updateProduct, loading, error } = useProducts()
const products = ref<Product[]>([])

// Fetch products on mount
onMounted(async () => {
  products.value = await fetchProducts()
})

// Refs for click outside detection
const filterMenuRef = ref<HTMLElement | null>(null)
const sortMenuRef = ref<HTMLElement | null>(null)

// State
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const sortBy = ref('newest')
const isFilterMenuOpen = ref(false)
const isSortMenuOpen = ref(false)

// Click outside handlers
onClickOutside(filterMenuRef, () => {
  isFilterMenuOpen.value = false
})

onClickOutside(sortMenuRef, () => {
  isSortMenuOpen.value = false
})

// Computed properties
const hasActiveFilters = computed(() => selectedCategory.value || selectedStatus.value)

// Modified computed property to work with real data
const filteredProducts = computed(() => {
  let filtered = [...products.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query) ||
      product.status.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.category.name === selectedCategory.value
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(product => 
      product.status === selectedStatus.value
    )
  }

  // Sort products
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name))
      break
  }

  return filtered
})

const handlePreview = (product: Product) => {
  console.log('Preview product:', product)
}

const { success, error: toastError } = useToast()

// Add state for confirmation modal
const showConfirmModal = ref(false)
const productToArchive = ref<Product | null>(null)
const confirmMessage = computed(() => 
  productToArchive.value 
    ? `Are you sure you want to archive "${productToArchive.value.name}"? This will hide the product from the website.`
    : ''
)

const handleDelete = (product: Product) => {
  productToArchive.value = product
  showConfirmModal.value = true
}

const confirmArchive = async () => {
  if (!productToArchive.value) return

  const { success: isSuccess } = await updateProduct(productToArchive.value.id, {
    status: 'Hidden'
  })

  if (isSuccess) {
    success(`${productToArchive.value.name} has been archived successfully.`)
  } else {
    toastError('Failed to archive product. Please try again.')
  }

  productToArchive.value = null
}

// Sort options
const sortOptions = ref([
  { value: 'newest', label: 'Newest First', icon: 'i-uil-clock' },
  { value: 'oldest', label: 'Oldest First', icon: 'i-uil-clock' },
  { value: 'name', label: 'Name A-Z', icon: 'i-uil-sort-alpha-down' },
  { value: 'name-desc', label: 'Name Z-A', icon: 'i-uil-sort-alpha-up-alt' },
])

// Clear filters
const clearFilters = () => {
  selectedCategory.value = ''
  selectedStatus.value = ''
}

// Select sort option
const selectSortOption = (value: string) => {
  sortBy.value = value
  isSortMenuOpen.value = false
}

// Add status toggle function
const toggleStatus = async (product: Product) => {
  const newStatus = product.status === 'Active' ? 'Hidden' : 'Active'
  const { success: isSuccess } = await updateProduct(product.id, {
    status: newStatus
  })

  if (isSuccess) {
    // Update the product in the local state
    products.value = products.value.map(p => 
      p.id === product.id ? { ...p, status: newStatus } : p
    )
    success(`Product ${newStatus === 'Active' ? 'activated' : 'archived'} successfully.`)
  } else {
    toastError('Failed to update product status. Please try again.')
  }
}
</script>
