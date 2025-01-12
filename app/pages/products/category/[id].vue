<template>
  <NuxtLayout name="web">
    <div class="pt-32 pb-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        </div>

        <template v-else-if="category">
          <!-- Breadcrumb -->
          <nav class="mb-8">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-slate-600 hover:text-emerald-600">Home</NuxtLink>
              </li>
              <li><span class="text-slate-400">/</span></li>
              <li>
                <NuxtLink to="/products" class="text-slate-600 hover:text-emerald-600">Products</NuxtLink>
              </li>
              <li><span class="text-slate-400">/</span></li>
              <li>
                <NuxtLink to="/products/category" class="text-slate-600 hover:text-emerald-600">Category</NuxtLink>
              </li>
              <li><span class="text-slate-400">/</span></li>
              <li class="text-emerald-600 font-medium">{{ category.name }}</li>
            </ol>
          </nav>

          <!-- Category Header -->
          <div class="mb-12">
            <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ category.name }}</h1>
            <p class="text-lg text-slate-600">{{ category.description }}</p>
          </div>

          <!-- Products Grid -->
          <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <WebProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              class="transition-all duration-300 hover:-translate-y-1"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <Icon name="heroicons:inbox" class="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h3 class="text-lg font-medium text-slate-900 mb-2">No products found</h3>
            <p class="text-slate-600">There are no products in this category yet.</p>
          </div>
        </template>

        <!-- Not Found State -->
        <div v-else class="text-center py-16">
          <WebProductNotfound />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'
import type { Product } from '~/types/product.types'

const route = useRoute()
const loading = ref(true)
const category = ref<Database['public']['Tables']['categories']['Row'] | null>(null)
const products = ref<Product[]>([])

// Fetch category and its products
const fetchCategoryData = async () => {
  try {
    loading.value = true
    const client = useSupabaseClient<Database>()
    
    // Fetch category
    const { data: categoryData, error: categoryError } = await client
      .from('categories')
      .select('*')
      .eq('id', Number(route.params.id))
      .single()

    if (categoryError) throw categoryError
    category.value = categoryData

    // Fetch products in this category
    const { data, error } = await client
      .from('products')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('status', 'Active')
      .eq('category_id', Number(route.params.id))
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

// Fetch data on mount
onMounted(() => {
  fetchCategoryData()
})

// Watch for route changes to refetch data
watch(() => route.params.id, () => {
  fetchCategoryData()
})
</script>
