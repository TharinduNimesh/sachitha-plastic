<template>
  <CommonModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="title"
    class="max-w-md"
  >
    <p class="text-slate-600">{{ message }}</p>
    
    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <button
          @click="onCancel"
          class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          {{ cancelLabel }}
        </button>
        <button
          @click="onConfirm"
          class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'confirm': []
  'cancel': []
}>()

const onConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const onCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>