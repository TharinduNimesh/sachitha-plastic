<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
  >
    <!-- Product Image Container -->
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
      />

      <!-- Overlay with Actions -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6"
      >
        <!-- Quick View Button -->
        <NuxtLink
          :to="product.link"
          class="w-full px-6 py-3 bg-white/95 backdrop-blur-sm text-slate-900 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-medium hover:bg-emerald-50 text-center"
        >
          Quick View
          <svg
            class="w-5 h-5 ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-emerald-600 rounded-lg text-sm font-medium"
        >
          {{ product.category }}
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-6 space-y-3">
      <!-- Name -->
      <h3
        class="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-1"
      >
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-slate-600 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Bottom Meta -->
      <div
        class="pt-3 flex items-center justify-between border-t border-slate-100"
      >
        <!-- Status Indicator -->
        <div class="flex items-center space-x-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="text-sm text-slate-600">In Stock</span>
        </div>

        <!-- Learn More Link -->
        <NuxtLink
          :to="product.link"
          class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
        >
          Learn More
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      image: "",
      name: "",
      category: "",
      description: "",
      link: "",
    }),
  },
});
</script>
