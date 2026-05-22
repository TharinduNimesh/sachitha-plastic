<template>
  <div class="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <!-- Product Image with Overlay -->
    <div class="relative aspect-[4/3] overflow-hidden bg-slate-50 sm:aspect-[16/10] lg:aspect-[4/3]">
      <img
        v-if="imageSource && !imageLoadError"
        :src="imageSource"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        @error="imageLoadError = true"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
        <Icon name="i-uil-image" class="h-20 w-20" />
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4 flex space-x-2">
        <span
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-full shadow-sm',
            status === 'Active' 
              ? 'bg-emerald-500 text-white ring-2 ring-emerald-500/20'
              : 'bg-orange-500 text-white ring-2 ring-orange-500/20',
          ]"
        >
          {{ status }}
        </span>
      </div>

      <!-- Hover Overlay with Actions -->
      <div class="absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-all duration-300 md:block opacity-0 group-hover:opacity-100">
        <div class="absolute bottom-0 left-0 right-0 p-4 lg:p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <!-- Action Buttons Container -->
          <div class="mx-auto grid max-w-md grid-cols-2 gap-2">
            <button 
              class="group/btn relative inline-flex min-h-12 w-full items-center justify-start gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:shadow-xl"
              aria-label="Edit product"
              @click="navigateTo(`/console/products/${id}?editable=true`)"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors group-hover/btn:bg-white/15 group-hover/btn:text-white">
                <Icon name="i-uil-edit" class="h-4.5 w-4.5" />
              </span>
              <span class="hidden text-sm font-semibold tracking-tight sm:inline">Edit</span>
            </button>
            <button 
              class="group/btn relative inline-flex min-h-12 w-full items-center justify-start gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white hover:shadow-xl"
              aria-label="Preview product"
              @click="navigateTo(`/console/products/${id}`)"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors group-hover/btn:bg-white/15 group-hover/btn:text-white">
                <Icon name="i-uil-eye" class="h-4.5 w-4.5" />
              </span>
              <span class="hidden text-sm font-semibold tracking-tight sm:inline">Preview</span>
            </button>
            <button 
              class="group/btn relative inline-flex min-h-12 w-full items-center justify-start gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white hover:shadow-xl"
              aria-label="Toggle product status"
              @click="$emit('toggle-status')"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-colors group-hover/btn:bg-white/15 group-hover/btn:text-white">
                <Icon :name="status === 'Active' ? 'i-uil-archive' : 'i-uil-history'" class="h-4.5 w-4.5" />
              </span>
              <span class="hidden text-sm font-semibold tracking-tight sm:inline">{{ status === 'Active' ? 'Archive' : 'Activate' }}</span>
            </button>
            <button 
              class="group/btn relative inline-flex min-h-12 w-full items-center justify-start gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-xl"
              aria-label="Delete product"
              @click="$emit('delete')"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 transition-colors group-hover/btn:bg-white/15 group-hover/btn:text-white">
                <Icon name="i-uil-trash-alt" class="h-4.5 w-4.5" />
              </span>
              <span class="hidden text-sm font-semibold tracking-tight sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex flex-1 flex-col p-4 sm:p-5">
      <!-- Category -->
      <div class="flex items-center space-x-2">
        <span class="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
          <Icon :name="categoryIcon || ''" class="mr-1.5 h-4 w-4" />
          {{ category }}
        </span>
      </div>
      
      <!-- Title -->
      <h3 class="mt-3 line-clamp-2 text-lg font-semibold text-slate-800 transition-colors duration-300 group-hover:text-emerald-600">
        {{ title }}
      </h3>
      
      <!-- Meta Info -->
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span class="flex items-center space-x-1.5 rounded-lg bg-slate-50 px-2.5 py-1">
          <Icon name="i-uil-eye" class="h-4 w-4 text-slate-500" />
          <span class="text-sm font-medium text-slate-600">{{ views }}</span>
        </span>
        <span 
          :class="[
            'rounded-lg px-3 py-1 text-sm font-medium',
            availability === 'InStock' 
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-orange-50 text-orange-600'
          ]"
        >
          {{ formatAvailability(availability) }}
        </span>
      </div>

      <!-- Mobile Actions -->
      <div class="mt-5 grid grid-cols-2 gap-2 md:hidden">
        <button
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          aria-label="Edit product"
          @click="navigateTo(`/console/products/${id}?editable=true`)"
        >
          <Icon name="i-uil-edit" class="h-4 w-4" />
          <span class="hidden sm:inline">Edit</span>
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          aria-label="Preview product"
          @click="navigateTo(`/console/products/${id}`)"
        >
          <Icon name="i-uil-eye" class="h-4 w-4" />
          <span class="hidden sm:inline">Preview</span>
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
          aria-label="Toggle product status"
          @click="$emit('toggle-status')"
        >
          <Icon :name="status === 'Active' ? 'i-uil-archive' : 'i-uil-history'" class="h-4 w-4" />
          <span class="hidden sm:inline">{{ status === 'Active' ? 'Archive' : 'Activate' }}</span>
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          aria-label="Delete product"
          @click="$emit('delete')"
        >
          <Icon name="i-uil-trash-alt" class="h-4 w-4" />
          <span class="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

const imageLoadError = ref(false)

type Availability = Database['public']['Enums']['Availability']

interface Props {
  id: number;
  title: string;
  category: string;
  status: string;
  image: string;
  availability: Availability;
  views?: number;
}

const props = withDefaults(defineProps<Props>(), {
  views: 0
});

const imageSource = computed(() => {
  if (!props.image) {
    return ''
  }

  return props.image.startsWith('/')
    ? props.image
    : `${useRuntimeConfig().public.supabase.url}/storage/v1/object/public/product_images/${props.image}`
})

const formatAvailability = (availability: Availability) => {
  return availability === 'InStock' ? 'In Stock' : 'Out of Stock';
};

const router = useRouter();

// Navigation helper
const navigateTo = (path: string) => {
  router.push(path);
};

defineEmits(['toggle-status', 'delete']);

// Compute category icon based on category
const categoryIcon = computed(() => {
  const icons: Record<string, string> = {
    'Machinery': 'i-uil-processor',
    'Household': 'i-uil-home',
    'Industrial': 'i-uil-building',
    'default': 'i-uil-box'
  };
  return icons[props.category as keyof typeof icons] || icons.default;
});

// Sample product images (you can replace these with your actual images)
const productImages = {
  'Recycling Machine': 'https://5.imimg.com/data5/SELLER/Default/2023/9/347707470/VD/KJ/VV/27965550/plastic-waste-recycling-machine.jpg',
  'Storage Box Set': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxLMTE9gHymaANt4Btb9Ubn_u15SIyo_BSA&s',
  'Industrial Pallet': 'https://cdn.webshopapp.com/shops/31781/files/452353570/industrial-plastic-pallet-1200x1000x150-mm-3-runne.jpg',
  'Water Tank': 'https://onlinestore.anton.lk/front_img/1697609421DSC_8433_1000L_MAX_TANK.JPG',
  'default': 'https://placehold.co/600x400/e2e8f0/64748b?text=Product+Image'
};
</script>
