<template>
  <div
    class="group relative bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden"
    @click="navigateToProduct"
  >
    <div class="flex">
      <!-- Product Image -->
      <div class="relative w-48 h-48">
        <img
          :src="`${$config.public.supabase.url}/storage/v1/object/public/product_images/${product.primary_image}`"
          :alt="product.name"
          class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <!-- Category Badge -->
        <div class="absolute top-4 left-4" @click.stop>
          <NuxtLink
            :to="`/products/category/${(product.category || '').toLowerCase()}`"
            class="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-emerald-600 rounded-lg text-sm font-medium hover:bg-white hover:text-emerald-700 transition-colors duration-300"
          >
            {{ product.category || "Uncategorized" }}
          </NuxtLink>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1 p-6">
        <div class="h-full flex flex-col">
          <!-- Name -->
          <h3
            class="text-xl font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 mb-3"
          >
            {{ product.name }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-slate-600 mb-4" v-text="cleanDescription"></p>

          <div class="mt-auto">
            <!-- Bottom Meta -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <!-- Status Indicator -->
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span class="text-sm text-slate-600">In Stock</span>
              </div>

              <!-- Learn More Link -->
              <div @click.stop>
                <NuxtLink
                  :to="`/products/${product.id}`"
                  class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                >
                  View Details
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
});

const router = useRouter();

const navigateToProduct = () => {
  router.push(`/products/${props.product.id}`);
};

const cleanDescription = computed(() => {
  if (!props.product?.description) return '';
  
  // Strip HTML tags using regex
  const strippedText = props.product.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/</g, '<') // Replace < with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
    
  // Limit to 250 characters for list view (more space available)
  return strippedText.length > 250 ? `${strippedText.substring(0, 250)}...` : strippedText;
});
</script>
