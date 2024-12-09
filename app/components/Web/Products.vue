<template>
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div class="mb-6 md:mb-0">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">
            Featured Products
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl">
            Discover our collection of high-quality plastic products and
            manufacturing solutions
          </p>
        </div>
        <NuxtLink to="/products"
          class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium group whitespace-nowrap">
          View All Products
          <svg class="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <WebProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { products } = useProducts();
const displayedProducts = computed(() => products.slice(0, 8));
</script>
