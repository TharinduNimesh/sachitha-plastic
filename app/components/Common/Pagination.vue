<!-- Simple pagination component -->
<template>
  <div class="flex w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
    <!-- Previous button -->
    <button
      @click="$emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage === 1"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
    >
      <Icon name="i-uil-angle-left" class="h-4 w-4 sm:h-5 sm:w-5" />
    </button>

    <!-- Page numbers -->
    <div class="flex max-w-full items-center gap-1 overflow-x-auto px-1 sm:gap-2 sm:overflow-visible sm:px-0">
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="$emit('update:currentPage', page)"
        :class="[
          'inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border text-xs font-medium sm:h-10 sm:w-10 sm:text-sm',
          currentPage === page
            ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
        ]"
      >
        <span v-if="page !== -1">{{ page }}</span>
        <span v-else class="text-slate-400">...</span>
      </button>
    </div>

    <!-- Next button -->
    <button
      @click="$emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
    >
      <Icon name="i-uil-angle-right" class="h-4 w-4 sm:h-5 sm:w-5" />
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