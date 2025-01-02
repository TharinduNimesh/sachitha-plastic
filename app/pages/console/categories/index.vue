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
              <span v-if="!hasActiveFilters" class="text-sm text-slate-500">
                {{ filteredCategories.length }} categories found
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
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConsoleCategoriesCard
          v-for="category in filteredCategories"
          :key="category.id"
          v-bind="category"
          @edit="handleEdit(category)"
          @delete="handleDelete(category)"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p class="mt-4 text-sm text-slate-600">Loading categories...</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredCategories.length === 0" class="text-center py-12">
        <Icon name="i-uil-box" class="mx-auto h-12 w-12 text-slate-400" />
        <h3 class="mt-2 text-sm font-semibold text-slate-900">No categories found</h3>
        <p class="mt-1 text-sm text-slate-500">
          {{ categories.length === 0 ? 'Get started by creating a new category.' : 'Try adjusting your search or filters.' }}
        </p>
      </div>

      <!-- Modals -->
      <CommonModalNewCategoryModal
        v-model="showNewCategoryModal"
        @category-created="handleCategoryCreated"
      />
      <CommonModalEditCategoryModal
        v-if="showEditCategoryModal && selectedCategory"
        v-model="showEditCategoryModal"
        :category="selectedCategory"
        @category-updated="handleCategoryUpdated"
      />
      <CommonModalDeleteCategoryModal
        v-model="showDeleteModal"
        :category="categoryToDelete"
        @deleted="handleCategoryDeleted"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'
import { onClickOutside } from '@vueuse/core'

type Category = Database['public']['Tables']['categories']['Row']

const client = useSupabaseClient<Database>()
const toast = useToast()

const loading = ref(true)
const categories = ref<Category[]>([])
const showNewCategoryModal = ref(false)
const showEditCategoryModal = ref(false)
const showDeleteModal = ref(false)
const selectedCategory = ref<Category | null>(null)
const categoryToDelete = ref<Category | null>(null)

// Search and Filter
const searchQuery = ref('')
const isSortMenuOpen = ref(false)
const sortBy = ref('newest')
const sortMenuRef = ref()

// Close sort menu when clicking outside
onClickOutside(sortMenuRef, () => {
  isSortMenuOpen.value = false
})

// Sort options
const sortOptions = [
  { label: 'Newest First', value: 'newest', icon: 'i-uil-sort-amount-down' },
  { label: 'Oldest First', value: 'oldest', icon: 'i-uil-sort-amount-up' },
  { label: 'Name (A-Z)', value: 'name-asc', icon: 'i-uil-sort-alpha-down' },
  { label: 'Name (Z-A)', value: 'name-desc', icon: 'i-uil-sort-alpha-up' },
]

// Computed properties
const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== ''
})

const filteredCategories = computed(() => {
  let result = [...categories.value]

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(category => 
      category.name.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default: // newest
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  return result
})

// Fetch categories
const fetchCategories = async () => {
  try {
    const { data, error } = await client
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    categories.value = data
  } catch (error: any) {
    toast.error('Failed to load categories')
    console.error('Error fetching categories:', error)
  } finally {
    loading.value = false
  }
}

// Handle category created
const handleCategoryCreated = () => {
  fetchCategories()
}

// Handle edit category
const handleEdit = (category: Category) => {
  selectedCategory.value = category
  showEditCategoryModal.value = true
}

// Handle category updated
const handleCategoryUpdated = () => {
  selectedCategory.value = null
  fetchCategories()
}

// Handle delete category
const handleDelete = (category: Category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

// Handle category deleted
const handleCategoryDeleted = () => {
  categoryToDelete.value = null
  fetchCategories()
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  sortBy.value = 'newest'
}

// Handle sort option selection
const selectSortOption = (value: string) => {
  sortBy.value = value
  isSortMenuOpen.value = false
}

watch(showNewCategoryModal, () => {
  if (!showNewCategoryModal.value) {
    fetchCategories()
  }
});

// Initial fetch
onMounted(() => {
  fetchCategories()
})

// Add meta information for SEO
useHead({
  title: 'Categories - Console',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>