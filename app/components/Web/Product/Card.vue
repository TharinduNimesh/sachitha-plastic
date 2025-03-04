<template>
  <NuxtLink
    v-if="!product.isEmpty"
    :to="`/products/${product.id}`"
    class="group block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <!-- Product Image with consistent aspect ratio -->
    <div class="relative aspect-square overflow-hidden bg-slate-100">
      <img
        v-if="product.primary_image"
        :src="getImageUrl(product.primary_image)"
        :alt="product.name"
        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
        <Icon name="i-uil-image" class="w-12 h-12" />
      </div>
      <!-- Category Badge - Enhanced with eco-friendly design -->
      <div v-if="product.category" class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-lg shadow-sm">
        <Icon name="i-uil-apps" class="w-4 h-4 text-emerald-600" />
        <span class="text-sm font-medium text-emerald-700">{{ product.category }}</span>
      </div>
      <!-- Out of Stock Badge -->
      <div
        v-if="product.availability === 'OutOfStock'"
        class="absolute top-3 right-3 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full"
      >
        Out of Stock
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors mb-2">
        {{ product.name }}
      </h3>

      <div 
        class="prose prose-sm text-slate-600 line-clamp-2"
        v-html="cleanDescription"
      />
      
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon 
            :name="product.availability === 'InStock' ? 'i-uil-box' : 'i-uil-times-circle'"
            class="w-4 h-4"
            :class="product.availability === 'InStock' ? 'text-emerald-500' : 'text-red-500'"
          />
          <span 
            class="text-sm font-medium"
            :class="product.availability === 'InStock' ? 'text-emerald-700' : 'text-red-700'"
          >
            {{ product.availability === 'InStock' ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>
        <div class="flex items-center gap-1 text-emerald-600">
          <span class="text-sm font-medium">View Details</span>
          <Icon 
            name="i-uil-angle-right" 
            class="w-5 h-5 group-hover:translate-x-1 transition-transform" 
          />
        </div>
      </div>
    </div>
  </NuxtLink>
  <!-- Empty slot placeholder with same dimensions -->
  <div
    v-else
    class="opacity-0 bg-transparent rounded-2xl border border-transparent"
    aria-hidden="true"
  ></div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product.types'
import type { Database } from '~/types/database.types'

interface ExtendedProduct extends Product {
  isEmpty?: boolean;
  category: string; // Add category as string since it comes from the join
}

const props = defineProps<{
  product: ExtendedProduct
}>()

const config = useRuntimeConfig()

const getImageUrl = (path: string | null): string | undefined => {
  if (!path) return undefined
  return `${config.public.supabase.url}/storage/v1/object/public/product_images/${path}`
}

const cleanDescription = computed(() => {
  if (!props.product?.description) return '';

  // Strip HTML tags and entities
  return props.product.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
})
</script>
