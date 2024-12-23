<template>
  <div class="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
    <!-- Product Image with Overlay -->
    <div class="aspect-[4/3] relative bg-slate-50 overflow-hidden">
      <img
        :src="`${$config.public.supabase.url}/storage/v1/object/public/product_images/${image}`"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
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
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <!-- Action Buttons Container -->
          <div class="flex items-center justify-center gap-3">
            <button 
              class="relative flex items-center gap-2 px-4 py-2.5 bg-white/95 text-slate-700 rounded-xl shadow-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 group/btn"
              @click="navigateTo(`/console/products/${id}?editable=true`)"
            >
              <Icon name="i-uil-edit" class="w-5 h-5" />
              <span class="text-sm font-medium">Edit</span>
              <span class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              class="relative flex items-center gap-2 px-4 py-2.5 bg-white/95 text-slate-700 rounded-xl shadow-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 group/btn"
              @click="navigateTo(`/console/products/${id}`)"
            >
              <Icon name="i-uil-eye" class="w-5 h-5" />
              <span class="text-sm font-medium">Preview</span>
              <span class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              class="relative flex items-center gap-2 px-4 py-2.5 bg-white/95 text-slate-700 rounded-xl shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 group/btn"
              @click="$emit('toggle-status')"
            >
              <Icon :name="status === 'Active' ? 'i-uil-archive' : 'i-uil-history'" class="w-5 h-5" />
              <span class="text-sm font-medium">{{ status === 'Active' ? 'Archive' : 'Activate' }}</span>
              <span class="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-5">
      <!-- Category -->
      <div class="flex items-center space-x-2">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium">
          <Icon :name="categoryIcon || ''" class="w-4 h-4 mr-1.5" />
          {{ category }}
        </span>
      </div>
      
      <!-- Title -->
      <h3 class="mt-3 text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
        {{ title }}
      </h3>
      
      <!-- Meta Info -->
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50">
            <Icon name="i-uil-eye" class="w-4 h-4 text-slate-500" />
            <span class="text-sm font-medium text-slate-600">2.4k</span>
          </span>
          <span class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50">
            <Icon name="i-uil-shopping-cart" class="w-4 h-4 text-slate-500" />
            <span class="text-sm font-medium text-slate-600">156</span>
          </span>
        </div>
        <span class="text-lg font-semibold text-emerald-600">$299.00</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: number; // Add id to props
  title: string;
  category: string;
  status: string;
  image: string;
}

const props = defineProps<Props>();
const router = useRouter();

// Navigation helper
const navigateTo = (path: string) => {
  router.push(path);
};

// Emit only toggle-status event now
defineEmits(['toggle-status']);

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
