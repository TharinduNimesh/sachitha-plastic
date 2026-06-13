<template>
  <NuxtLayout name="web">
    <div class="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-4">
            Our Categories
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Explore Our Product Range</h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our extensive collection of high-quality plastic products and machinery, carefully organized to help you find exactly what you need.
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.id" 
            :to="`/products/category/${category.id}`" 
            class="group block relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img :src="category.image" :alt="category.name" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">{{ category.name }}</h3>
              <div class="mt-4 flex items-center text-emerald-600 font-medium">
                <span>View Products</span>
                <svg class="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Categories - Samarasinghe Trade Center',
  meta: [
    {
      name: 'description',
      content: 'Explore our wide range of product categories including household items, garden accessories, and recycling machinery.'
    }
  ]
})

const supabase = useSupabaseClient()
const categories = ref([])

async function loadCategories() {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) {
    console.error(error)
  } else {
    categories.value = data
  } 
}

await loadCategories()
</script>
