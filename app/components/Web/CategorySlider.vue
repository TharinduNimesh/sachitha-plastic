<template>
  <section class="py-20 bg-emerald-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900">Shop by categories</h2>
        <div class="flex gap-4">
          <button @click="scrollLeft"
            class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300">
            <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="scrollRight"
            class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300">
            <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable Container -->
      <div class="relative overflow-hidden">
        <div ref="scrollContainer" class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style="scroll-behavior: smooth;">
          <!-- Category Cards -->
          <div v-for="category in categories" :key="category.id" class="flex-none w-72">
            <NuxtLink :to="`/products/category/${category.id}`" class="group block relative">
              <div class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                <img :src="category.image" :alt="category.name"
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
              <div class="absolute bottom-6 left-6">
                <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
              </div>
            </NuxtLink>
          </div>
        </div>
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
  // load categories from the supabase and asign them into categories ref
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
    scrollContainer.value.scrollLeft -= scrollContainer.value.offsetWidth
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += scrollContainer.value.offsetWidth
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
