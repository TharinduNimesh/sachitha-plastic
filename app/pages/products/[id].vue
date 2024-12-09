<template>
  <NuxtLayout name="web">
    <div v-if="product" class="pt-32 pb-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-slate-600 hover:text-emerald-600 font-semibold">
                Home
              </NuxtLink>
            </li>
            <li><span class="text-slate-400">/</span></li>
            <li>
              <NuxtLink to="/products" class="text-slate-600 hover:text-emerald-600 font-semibold">
                Products
              </NuxtLink>
            </li>
            <li><span class="text-slate-400">/</span></li>
            <li class="text-emerald-600 font-medium">{{ product.name }}</li>
          </ol>
        </nav>

        <!-- Product Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
          </div>

          <!-- Product Info -->
          <div class="bg-white rounded-lg space-y-6">
            <div>
              <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm font-medium mb-4">
                {{ product.category }}
              </span>
              <h1 class="text-4xl font-bold text-slate-900">
                {{ product.name }}
              </h1>
            </div>

            <!-- Description -->
            <div class="prose prose-slate max-w-none">
              <p class="text-lg text-slate-600">{{ product.description }}</p>

              <!-- Additional details -->
              <div class="mt-6 space-y-4">
                <h3 class="text-lg font-semibold text-slate-900">
                  Key Features:
                </h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(feature, index) in product.features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Status and Actions -->
            <div class="pt-6 border-t border-slate-200">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span class="text-sm font-medium text-slate-900">
                    In Stock
                  </span>
                </div>
              </div>
            </div>

            <!-- Contact Button -->
            <div class="pt-6">
              <a href="mailto:contact@example.com"
                class="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-medium shadow-lg">
                Contact for Pricing
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="pt-32 pb-16 text-center">
       <Notfound />
    </div>
  </NuxtLayout>
</template>

<script setup>
import Notfound from '~/components/Web/Product/Notfound.vue';

const route = useRoute();
const { getProductByLink } = useProducts();

const product = computed(() => {
  const slug = route.params.id;
  return getProductByLink(`/products/${slug}`);
});
</script>
