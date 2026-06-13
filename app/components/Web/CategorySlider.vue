<template>
  <section class="py-24 bg-white relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div class="max-w-2xl">
          <span class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-4">
            Discover
          </span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Shop by <span class="text-emerald-600">Categories</span>
          </h2>
          <p class="mt-4 text-slate-600 text-lg">
            Browse our extensive collection of sustainable plastics, high-quality machinery, and essential accessories.
          </p>
        </div>
        
        <div class="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
          <NuxtLink to="/categories" class="hidden md:inline-flex items-center mr-4 text-emerald-600 font-medium hover:text-emerald-700 transition-colors group">
            View All
            <svg class="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
          <div class="flex gap-3">
            <button @click="scrollLeft"
              class="p-3 sm:p-4 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-200 hover:text-emerald-600 transition-all duration-300 group">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="scrollRight"
              class="p-3 sm:p-4 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-200 hover:text-emerald-600 transition-all duration-300 group">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Scrollable Container -->
      <div class="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div ref="scrollContainer" class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
          style="scroll-behavior: smooth;">
          <!-- Category Cards -->
          <div v-for="category in categories" :key="category.id" class="flex-none w-[280px] sm:w-[320px] group cursor-pointer">
            <NuxtLink :to="`/products/category/${category.id}`" class="block h-full">
              <div class="relative h-[400px] rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                <!-- Image -->
                <img :src="category.image" :alt="category.name"
                  class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <!-- Content -->
                <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 class="text-2xl font-bold text-white mb-2 leading-tight">{{ category.name }}</h3>
                  <div class="flex items-center text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span>Explore Products</span>
                    <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center md:hidden">
        <NuxtLink to="/categories" class="inline-flex items-center px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-medium hover:bg-emerald-100 transition-colors group">
          View All Categories
          <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const scrollContainer = ref(null)
const supabase = useSupabaseClient();
const categories = ref([]);

async function loadCategories() {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) {
    console.error(error)
  } else {
    categories.value = data
  } 
}

await loadCategories()

const scrollLeft = () => {
  if (scrollContainer.value) {
    const scrollAmount = window.innerWidth > 640 ? scrollContainer.value.offsetWidth / 2 : scrollContainer.value.offsetWidth;
    scrollContainer.value.scrollLeft -= scrollAmount;
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    const scrollAmount = window.innerWidth > 640 ? scrollContainer.value.offsetWidth / 2 : scrollContainer.value.offsetWidth;
    scrollContainer.value.scrollLeft += scrollAmount;
  }
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
