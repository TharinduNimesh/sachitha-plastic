interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timeout?: number
}

export interface ToastRef {
  add: (message: string, type: Toast['type'], timeout?: number) => void
  remove: (id: number) => void
}

export function useToast() {
  // Get toast ref from provide/inject
  const toast = inject<Ref<ToastRef | undefined>>('toastRef')

  if (!toast) {
    throw new Error('Toast component not found in the current context');
  }

  // Show success toast
  function success(message: string, timeout?: number) {
    toast?.value?.add(message, 'success', timeout)
  }

  // Show error toast
  function error(message: string, timeout?: number) {
    toast?.value?.add(message, 'error', timeout)
  }

  // Show info toast
  function info(message: string, timeout?: number) {
    toast?.value?.add(message, 'info', timeout)
  }

  return {
    success,
    error,
    info
  }
}
