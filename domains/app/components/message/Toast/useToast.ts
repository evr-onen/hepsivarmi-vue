
export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info' | 'custom'
  duration?: number
  customIcon?: string // Custom SVG icon HTML string
  customColor?: string // Custom color for background
  customIconColor?: string // Custom color for icon
  customTextColor?: string // Custom color for text
}

// Global toast state
const toasts = ref<ToastMessage[]>([])

export const useToast = () => {
  // Generate unique ID for each toast
  const generateId = (): string => {
    return Math.random().toString(36).slice(2, 11)
  }

  // Show toast function
  const showToast = (
    message: string,
    type: ToastMessage['type'] = 'info',
    duration: number = 3000
  ) => {
    const id = generateId()
    const toast: ToastMessage = {
      id,
      message,
      type,
      duration
    }

    toasts.value.push(toast)

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  // Show custom toast function
  const showCustomToast = (
    message: string,
    options: {
      duration?: number
      customIcon?: string
      customColor?: string
      customIconColor?: string
      customTextColor?: string
    } = {}
  ) => {
    const id = generateId()
    const toast: ToastMessage = {
      id,
      message,
      type: 'custom',
      duration: options.duration || 3000,
      customIcon: options.customIcon,
      customColor: options.customColor,
      customIconColor: options.customIconColor,
      customTextColor: options.customTextColor
    }

    toasts.value.push(toast)

    // Auto remove toast after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }

  // Remove specific toast
  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  // Clear all toasts
  const clearAllToasts = () => {
    toasts.value = []
  }

  // Convenience methods for different toast types
  const showSuccess = (message: string, duration?: number) => {
      console.log('showSuccess')
    return showToast(message, 'success', duration)
  }

  const showError = (message: string, duration?: number) => {
    return showToast(message, 'error', duration)
  }

  const showWarning = (message: string, duration?: number) => {
    return showToast(message, 'warning', duration)
  }

  const showInfo = (message: string, duration?: number) => {
    return showToast(message, 'info', duration)
  }

  return {
    toasts,
    showToast,
    showCustomToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}

export default useToast
