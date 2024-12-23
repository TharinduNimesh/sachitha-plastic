<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
    @click="navigateToProduct"
  >
    <!-- Product Image Container -->
    <div class="relative aspect-square overflow-hidden">
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
    <div class="p-6 space-y-3">
      <!-- Name -->
      <h3
        class="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-1"
      >
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p
        class="text-sm text-slate-600 line-clamp-2"
        v-text="cleanDescription"
      ></p>

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
        <div @click.stop>
          <NuxtLink
            :to="`/products/category/${product.category.toLowerCase()}`"
            class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
          >
            Learn More
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      primary_image: "",
      name: "",
      category: "",
      description: "",
      link: "",
    }),
  },
});

const navigateToProduct = () => {
  router.push(props.product.link);
};

const cleanDescription = computed(() => {
  if (!props.product?.description) return '';

  // Strip HTML tags using regex
  const strippedText = props.product.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
    
  // Limit to 150 characters and add ellipsis if needed
  return strippedText.length > 150 ? `${strippedText.substring(0, 150)}...` : strippedText;
});
</script>
