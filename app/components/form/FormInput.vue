<template>
  <div>
    <div class="flex justify-between items-center mb-1">
      <label v-if="label" class="block text-sm font-medium text-slate-700">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
    </div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full px-3 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200',
        error 
          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
          : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
      ]"
      v-bind="$attrs"
      :required="required"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
