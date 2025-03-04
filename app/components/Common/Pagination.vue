<!-- Simple pagination component -->
<template>
  <div class="flex items-center justify-center gap-2">
    <!-- Previous button -->
    <button
      @click="$emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon name="i-uil-angle-left" class="w-5 h-5" />
    </button>

    <!-- Page numbers -->
    <div class="flex items-center gap-2">
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="$emit('update:currentPage', page)"
        :class="[
          'inline-flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-medium',
          currentPage === page
            ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next button -->
    <button
      @click="$emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Icon name="i-uil-angle-right" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  'update:currentPage': [page: number]
}>()

// Calculate which page numbers to display
const displayedPages = computed(() => {
  const pages: number[] = []
  const maxVisiblePages = 5
  
  if (props.totalPages <= maxVisiblePages) {
    // Show all pages if total pages is less than max visible
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  // Always show first page
  pages.push(1)

  // Calculate range around current page
  let start = Math.max(2, props.currentPage - 1)
  let end = Math.min(props.totalPages - 1, props.currentPage + 1)

  // Adjust range if at the edges
  if (props.currentPage <= 2) {
    end = 4
  } else if (props.currentPage >= props.totalPages - 1) {
    start = props.totalPages - 3
  }

  // Add ellipsis and numbers
  if (start > 2) pages.push(-1) // Ellipsis
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (end < props.totalPages - 1) pages.push(-1) // Ellipsis
  
  // Always show last page
  if (props.totalPages > 1) {
    pages.push(props.totalPages)
  }

  return pages
})
</script>