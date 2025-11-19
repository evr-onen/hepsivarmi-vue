import { ref, watch } from 'vue'

export interface AlertOptions {
  title?: string
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

const useAlert = (options: AlertOptions = {}) => {
  const isOpen = ref(false)
  const alertOptions = ref<AlertOptions>({
    title: 'Are you sure?',
    message: '',
    type: 'warning',
    confirmText: 'OK',
    cancelText: 'Cancel',
    ...options
  })

  const showAlert = (newOptions?: Partial<AlertOptions>) => {
    if (newOptions) {
      alertOptions.value = { ...alertOptions.value, ...newOptions }
    }
    isOpen.value = true
  }

  const hideAlert = () => {
    isOpen.value = false
  }

  const handleConfirm = async () => {
    if (alertOptions.value.onConfirm) {
      await alertOptions.value.onConfirm()
    }
    hideAlert()
  }

  const handleCancel = async () => {
    if (alertOptions.value.onCancel) {
      await alertOptions.value.onCancel()
    }
    hideAlert()
  }

  return {
    isOpen,
    alertOptions,
    showAlert,
    hideAlert,
    handleConfirm,
    handleCancel
  }
}

export default useAlert