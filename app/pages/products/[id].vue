<template>
  <NuxtLayout name="web">
    <div v-if="loading" class="pt-32 pb-16 flex justify-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
    </div>

    <div v-else-if="product" class="pt-32 pb-16">
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
          <!-- Product Images -->
          <div class="my-12">
            <!-- Image Slider -->
            <div class="relative aspect-[3/2] rounded-2xl overflow-hidden bg-slate-100">
              <img v-if="allImages.length > 0" :src="getImageUrl(allImages[currentImageIndex] ?? '')"
                :alt="product.name" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                <Icon name="heroicons:photo" class="w-12 h-12" />
              </div>

              <!-- Navigation Buttons -->
              <template v-if="allImages.length > 1">
                <button @click="prevImage"
                  class="w-12 h-12 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white transition-colors duration-300">
                  <Icon name="heroicons:chevron-left" class="w-6 h-6 text-slate-600" />
                </button>
                <button @click="nextImage"
                  class="w-12 h-12 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white transition-colors duration-300">
                  <Icon name="heroicons:chevron-right" class="w-6 h-6 text-slate-600" />
                </button>
              </template>
            </div>

            <!-- Thumbnail Grid -->
            <div v-if="allImages.length > 1" class="grid grid-cols-6 gap-4 mt-4">
              <button v-for="(image, index) in allImages" :key="index" @click="currentImageIndex = index"
                class="aspect-square rounded-lg overflow-hidden bg-slate-100 relative" :class="currentImageIndex === index ? 'ring-2 ring-emerald-500' : ''
                  ">
                <img :src="getImageUrl(image)" :alt="`${product.name} - Image ${index + 1}`"
                  class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="bg-white rounded-lg space-y-6">
            <div>
              <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm font-medium mb-4">
                {{ product.category.name }}
              </span>
              <h1 class="text-4xl font-bold text-slate-900">
                {{ product.name }}
              </h1>
            </div>

            <!-- Description -->
            <div class="prose prose-slate max-w-none">
              <div class="text-lg text-slate-600" v-html="product.description"></div>
            </div>

            <!-- Status and Actions -->
            <div class="pt-6 border-t border-slate-200">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full" :class="{
                    'bg-emerald-500': product.availability === 'InStock',
                    'bg-red-500': product.availability === 'OutOfStock',
                  }"></span>
                  <span class="text-sm font-medium text-slate-900">
                    {{
                      product.availability === "InStock"
                        ? "In Stock"
                        : "Out of Stock"
                    }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Contact Button -->
            <div class="pt-6">
              <a href="mailto:info@stclk.com"
                class="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 font-medium shadow-lg">
                Contact for Pricing
                <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>

        <!-- Similar Products Section -->
        <div v-if="similarProducts.length > 0" class="mt-24">
          <div class="flex justify-between items-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900">Similar Products</h2>
            <div class="flex gap-4">
              <button @click="scrollLeft"
                class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300 w-12 h-12 flex items-center justify-center">
                <Icon name="heroicons:chevron-left" class="w-6 h-6 text-slate-600" />
              </button>
              <button @click="scrollRight"
                class="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 transition-colors duration-300 w-12 h-12 flex items-center justify-center">
                <Icon name="heroicons:chevron-right" class="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>

          <div class="relative overflow-hidden">
            <div ref="scrollContainer" class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
              style="scroll-behavior: smooth;">
              <div v-for="similarProduct in mappedSimilarProducts" :key="similarProduct.id" class="flex-none w-72">
                <WebProductCard :product="similarProduct" class="transition-all duration-300 hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="pt-32 pb-16 text-center">
      <WebProductNotfound />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Database } from "~/types/database.types";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  category: Database["public"]["Tables"]["categories"]["Row"];
  images: Database["public"]["Tables"]["product_images"]["Row"][];
};

// State
const loading = ref(true);
const product = ref<Product | null>(null);
const similarProducts = ref<Product[]>([]);
const currentImageIndex = ref(0);
const route = useRoute();
const config = useRuntimeConfig();

// Methods
const getImageUrl = (path: string) => {
  return `${config.public.supabase.url}/storage/v1/object/public/product_images/${path}`;
};

const allImages = ref<string[]>([]);

const nextImage = () => {
  if (currentImageIndex.value < allImages.value.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = allImages.value.length - 1;
  }
};

// Fetch similar products
const fetchSimilarProducts = async (categoryId: number, currentProductId: number) => {
  try {
    const client = useSupabaseClient<Database>();
    const { data, error } = await client
      .from('products')
      .select(`
        *,
        category:categories(name),
        images:product_images()
      `)
      .eq('category_id', categoryId)
      .eq('status', 'Active')
      .neq('id', currentProductId)
      .limit(10);

    if (error) throw error;

    similarProducts.value = data.map((product: any) => ({
      ...product,
      category: product.category.name,
    }));
  } catch (error) {
    console.error('Error fetching similar products:', error);
    similarProducts.value = [];
  }
};

// Fetch product data
const fetchProduct = async () => {
  try {
    const client = useSupabaseClient<Database>();
    const { data: productData, error } = await client
      .from("products")
      .select(
        `
        *,
        category:categories(name),
        images:product_images(path)
      `
      )
      .eq("status", "Active")
      .eq("id", Number(route.params.id))
      .single();

    if (error) throw error;

    product.value = productData as Product;
    allImages.value = [
      productData.primary_image,
      ...productData.images.map((img: any) => img.path),
    ];

    // Fetch similar products
    if (productData) {
      await fetchSimilarProducts(productData.category_id, productData.id);

      // Update product statistics
      const today = new Date().toISOString().split("T")[0] as string;
      await client.from("product_statistics").upsert(
        {
          product_id: productData.id,
          date: today,
          views: 1,
        },
        {
          onConflict: "product_id,date",
        }
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

interface Views {
  product_id: number;
  date: string;
}

const isVisitToday = () => {
  const products: Views[] = JSON.parse(localStorage.getItem("visited-products") || "[]");
  const today = new Date().toISOString().split("T")[0];
  return products.some(p => p.date === today && p.product_id === Number(route.params.id));
};

const markAsVisited = async () => {
  const supabase = useSupabaseClient<Database>();
  const today = new Date().toISOString().split("T")[0] as string;
  const products: Views[] = JSON.parse(localStorage.getItem("visited-products") || "[]");

  const productId = route.params.id;
  if (!productId) return;

  products.push({ product_id: Number(productId), date: today });
  localStorage.setItem("visited-products", JSON.stringify(products));

  await supabase.rpc("increment_product_views", {
    product_id_input: Number(productId),
  });
};

const scrollContainer = ref<HTMLElement | null>(null)

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

// Map similarProducts to match WebProductCard expected type
const mappedSimilarProducts = computed(() =>
  similarProducts.value.map(product => ({
    ...product,
    category: product.category.name
  }))
);

// Lifecycle
onMounted(async () => {
  fetchProduct();
  if (!isVisitToday()) {
    await markAsVisited();
  }
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
