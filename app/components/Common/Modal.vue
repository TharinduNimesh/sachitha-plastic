<!-- Base Modal Component -->
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        @click="closeOnBackdrop"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <!-- Modal Panel -->
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            @click.stop
          >
            <!-- Header -->
            <div class="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 class="text-lg font-semibold text-gray-900" id="modal-title">
                {{ title }}
              </h3>
              <button
                type="button"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                @click="$emit('update:modelValue', false)"
              >
                <span class="sr-only">Close</span>
                <Icon name="i-uil-times" class="w-5 h-5" />
              </button>
            </div>

            <!-- Body -->
            <div class="bg-white px-4 py-4">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="bg-gray-50 px-4 py-3 flex justify-end space-x-3 border-t border-gray-200">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title: string
  closeOnOutsideClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOutsideClick: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const closeOnBackdrop = () => {
  if (props.closeOnOutsideClick) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
