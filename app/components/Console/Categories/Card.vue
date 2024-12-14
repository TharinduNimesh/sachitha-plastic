<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden group">
    <!-- Category Image -->
    <div class="aspect-[4/3] relative overflow-hidden">
      <img 
        :src="image" 
        :alt="name"
        class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Actions Overlay -->
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
        <button
          @click="$emit('edit')"
          class="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
        >
          <Icon name="i-uil-edit" class="w-5 h-5" />
        </button>
        <button
          @click="$emit('delete')"
          class="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
        >
          <Icon name="i-uil-trash-alt" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Category Info -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-slate-900 mb-1">{{ name }}</h3>
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-500">
          {{ formatDate(created_at) }}
        </span>
        <span class="text-sm font-medium text-emerald-600">
          {{ products_count }} Products
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: number
  name: string
  image: string
  created_at: string
  products_count?: number
}

defineProps<Props>()
defineEmits<{
  'edit': []
  'delete': []
}>()

// Format date helper
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
