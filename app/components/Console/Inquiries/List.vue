<template>
  <div class="group border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
    <div class="p-4 sm:p-6">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-slate-900">{{ subject }}</h3>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm text-slate-500">
            <span class="flex items-center gap-1.5">
              <Icon name="i-uil-user" class="w-4 h-4 flex-shrink-0" />
              {{ name }}
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="i-uil-envelope" class="w-4 h-4 flex-shrink-0" />
              <span class="truncate">{{ email }}</span>
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="i-uil-clock" class="w-4 h-4 flex-shrink-0" />
              {{ formattedDate }}
            </span>
          </div>
        </div>

        <!-- Status Badge -->
        <div
          class="px-3 py-1 rounded-full text-sm font-medium w-fit"
          :class="{
            'bg-yellow-50 text-yellow-600': !status || status === 'Pending',
            'bg-emerald-50 text-emerald-600': status === 'Resolved'
          }"
        >
          {{ status || 'Pending' }}
        </div>
      </div>

      <!-- Message Content -->
      <p class="text-slate-600 line-clamp-2 mb-4">{{ message }}</p>

      <!-- Action Buttons -->
      <div
        class="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          v-if="!status || status === 'Pending'"
          @click="$emit('resolve')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Icon name="i-uil-check" class="w-4 h-4 flex-shrink-0" />
          <span>Mark as Resolved</span>
        </button>
        <button
          @click="$emit('delete')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Icon name="i-uil-trash-alt" class="w-4 h-4 flex-shrink-0" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types'

type Inquiry = Database['public']['Tables']['inquiries']['Row']
type InquiryStatus = Database['public']['Enums']['InquiryStatus']
type InquiryWithStatus = Inquiry & { status?: InquiryStatus }

interface Props extends InquiryWithStatus {}

const props = defineProps<Props>()
defineEmits(['resolve', 'delete'])

const formattedDate = computed(() => {
  if (!props.created_at) return ''
  
  try {
    const date = new Date(props.created_at)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  } catch (error) {
    console.error('Error formatting date:', error)
    return props.created_at
  }
})
</script>
