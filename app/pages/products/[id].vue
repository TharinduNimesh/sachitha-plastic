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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
          <!-- Product Image -->
          <div class="my-12">
            <!-- Image Slider for the Big Image -->
            <div class="relative aspect-[3/2] rounded-2xl overflow-hidden bg-slate-100">
              <img v-if="product.image && product.image.length > 0" :src="allImages[currentImageIndex]"
                :alt="product.name" class="w-full h-full object-cover" />
              <button v-if="product.image && product.image.length > 0" @click="prevImage"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 rounded-full border border-slate-200 hover:bg-blue-50 transition-colors duration-300">
                <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button v-if="product.image && product.image.length > 0" @click="nextImage"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 rounded-full border border-slate-200 hover:bg-blue-50 transition-colors duration-300">
                <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Two Smaller Images -->
            <div class="grid grid-cols-6 gap-4 mt-4">
              <div v-for="(image, index) in allImages" :key="index" class="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <img :src="image" :alt="product.name" class="w-full h-full object-cover" />
              </div>
            </div>
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
                <h3 class="text-lg font-semibold text-slate-900">Key Features:</h3>
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

        <!-- Similar Products Section -->
        <WebProductSimilarProduct :products="similarProducts" />
      </div>
    </div>
    <div v-else class="pt-32 pb-16 text-center">
      <WebProductNotfound />
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const allImages = computed(() => {
  console.log('Product:', product.value); // Debugging statement
  return product.value?.image ?? []; // Fallback to an empty array if undefined
});

const currentImageIndex = ref(0);

const nextImage = () => {
  if (allImages.value.length === 0) return;
  currentImageIndex.value =
    (currentImageIndex.value + 1) % allImages.value.length;
};

const prevImage = () => {
  if (allImages.value.length === 0) return;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + allImages.value.length) % allImages.value.length;
};

const route = useRoute();
const { getProductByLink, getSimilarProducts } = useProducts();

const product = computed(() => {
  const slug = route.params.id;
  return getProductByLink(`/products/${slug}`);
});

const similarProducts = computed(() => {
  return getSimilarProducts(product.value?.category, product.value?.id);
});
</script>
