<template>
  <TransitionGroup
    tag="div"
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
    class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg max-w-md transform transition-all duration-300',
        toast.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
        toast.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' :
        toast.type === 'info' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
        'bg-slate-50 text-slate-600 border border-slate-100'
      ]"
    >
      <!-- Icon -->
      <Icon
        :name="
          toast.type === 'success' ? 'i-uil-check-circle' :
          toast.type === 'error' ? 'i-uil-exclamation-circle' :
          toast.type === 'info' ? 'i-uil-info-circle' :
          'i-uil-bell'
        "
        class="w-5 h-5 flex-shrink-0"
      />

      <!-- Message -->
      <p class="text-sm font-medium">{{ toast.message }}</p>

      <!-- Close Button -->
      <button
        @click="removeToast(toast.id)"
        class="ml-auto p-1 hover:bg-black/5 rounded-lg transition-colors duration-200"
      >
        <Icon name="i-uil-times" class="w-4 h-4" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timeout?: number
}

const toasts = ref<Toast[]>([])
let toastId = 0

// Add new toast
function addToast(message: string, type: Toast['type'] = 'info', timeout: number = 5000) {
  const id = ++toastId
  const toast: Toast = {
    id,
    message,
    type,
    timeout
  }
  toasts.value.push(toast)

  if (timeout > 0) {
    setTimeout(() => {
      removeToast(id)
    }, timeout)
  }

  return id
}

// Remove toast by id
function removeToast(id: number) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose methods to be used by other components
defineExpose({
  add: addToast,
  remove: removeToast
})
</script>
