<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
        <div class="mt-2">
          <div class="text-2xl font-bold text-slate-900">{{ value }}</div>
          <div class="flex items-center mt-1">
            <span
              :class="[
                'text-sm font-medium',
                trend > 0 ? 'text-emerald-600' : 'text-red-600',
              ]"
            >
              {{ trend > 0 ? '+' : '' }}{{ trend }}% since last month
            </span>
          </div>
        </div>
      </div>
      <div class="p-3 rounded-lg" :class="iconBgClass">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="mt-4">
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  trend: {
    type: Number,
    required: true,
  },
  iconBgClass: {
    type: String,
    default: 'bg-emerald-50',
  },
})
</script>
