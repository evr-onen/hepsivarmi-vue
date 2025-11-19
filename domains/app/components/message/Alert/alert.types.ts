export interface AlertType {
  message?: string
  title?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}