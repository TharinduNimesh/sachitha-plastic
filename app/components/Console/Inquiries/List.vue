<template>
  <div
    class="group border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
  >
    <div class="p-6">
      <!-- Header Section -->
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">{{ subject }}</h3>
          <div class="mt-1 flex items-center gap-3 text-sm text-slate-500">
            <span class="flex items-center gap-1.5">
              <Icon name="i-uil-user" class="w-4 h-4" />
              {{ name }}
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="i-uil-envelope" class="w-4 h-4" />
              {{ email }}
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="i-uil-clock" class="w-4 h-4" />
              {{ formattedDate }}
            </span>
          </div>
        </div>

        <!-- Status Badge -->
        <div
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="{
            'bg-yellow-50 text-yellow-600': status === 'Pending',
            'bg-emerald-50 text-emerald-600': status === 'Resolved',
            'bg-red-50 text-red-600': status === 'Spam',
          }"
        >
          {{ status }}
        </div>
      </div>

      <!-- Message Content -->
      <p class="text-slate-600 line-clamp-2">{{ message }}</p>

      <!-- Action Buttons -->
      <div
        class="mt-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          v-if="status === 'Pending'"
          @click="$emit('resolve')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Icon name="i-uil-check" class="w-4 h-4" />
          Mark as Resolved
        </button>
        <button
          @click="$emit('delete')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Icon name="i-uil-trash-alt" class="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "Pending" | "Resolved" | "Spam";
}

const props = defineProps<Props>();
defineEmits(["resolve", "delete"]);

const formattedDate = computed(() => {
  const date = new Date(props.date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
});
</script>
