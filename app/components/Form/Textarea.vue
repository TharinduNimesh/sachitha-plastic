<template>
  <div>
    <div class="flex justify-between items-center mb-1">
      <label v-if="label" class="block text-sm font-medium text-slate-700">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
    </div>
    
    <div class="relative">
      <textarea
        :id="id"
        v-model="inputValue"
        :name="name"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :maxlength="maxLength"
        :class="[
          'w-full px-3 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200',
          error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500',
          !resizable && 'resize-none'
        ]"
        @input="$emit('update:modelValue', $event?.target?.value)"
      />
      
      <!-- Character Count -->
      <div
        v-if="maxLength"
        class="absolute bottom-2 right-2 text-xs text-slate-500"
      >
        {{ inputValue.length }}/{{ maxLength }}
      </div>
    </div>

    <!-- Help Text -->
    <p
      v-if="helpText && !error"
      class="mt-1 text-sm text-slate-500"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  name?: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  error?: string
  helpText?: string
  maxLength?: number
  resizable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Generate unique ID for input-label association
const id = computed(() => {
  return `textarea-${Math.random().toString(36).substr(2, 9)}`
})

// Computed value for v-model
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (props.maxLength && value.length > props.maxLength) {
      return
    }
    emit('update:modelValue', value)
  }
})
</script>
