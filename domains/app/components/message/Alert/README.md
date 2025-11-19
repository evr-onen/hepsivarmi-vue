# Alert Component

A customizable alert modal component for displaying confirmation dialogs, warnings, and informational messages.

## Features

- Multiple alert types: `success`, `error`, `warning`, `info`
- Customizable title, message, and button text
- Callback functions for confirm and cancel actions
- Responsive design with mobile support
- Dark mode support
- Smooth animations and transitions

## Usage

### Basic Usage

```vue
<template>
  <div>
    <button @click="showSuccessAlert">Show Success Alert</button>
    <button @click="showErrorAlert">Show Error Alert</button>
    <button @click="showWarningAlert">Show Warning Alert</button>
    
    <Alert 
      ref="alertRef"
      :title="alertTitle"
      :message="alertMessage"
      :type="alertType"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      :on-confirm="handleConfirm"
      :on-cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Alert from '~/domains/app/components/message/Alert/index.vue'

const alertRef = ref()
const alertTitle = ref('')
const alertMessage = ref('')
const alertType = ref('warning')
const confirmText = ref('OK')
const cancelText = ref('Cancel')

const showSuccessAlert = () => {
  alertTitle.value = 'Success!'
  alertMessage.value = 'Your action was completed successfully.'
  alertType.value = 'success'
  confirmText.value = 'Great!'
  cancelText.value = 'Close'
  alertRef.value?.showAlert()
}

const showErrorAlert = () => {
  alertTitle.value = 'Error!'
  alertMessage.value = 'Something went wrong. Please try again.'
  alertType.value = 'error'
  confirmText.value = 'Try Again'
  cancelText.value = 'Cancel'
  alertRef.value?.showAlert()
}

const showWarningAlert = () => {
  alertTitle.value = 'Warning!'
  alertMessage.value = 'Are you sure you want to delete this item?'
  alertType.value = 'warning'
  confirmText.value = 'Delete'
  cancelText.value = 'Cancel'
  alertRef.value?.showAlert()
}

const handleConfirm = async () => {
  console.log('User confirmed the action')
  // Add your confirmation logic here
}

const handleCancel = async () => {
  console.log('User cancelled the action')
  // Add your cancellation logic here
}
</script>
```

### Using with Composable

```vue
<template>
  <div>
    <button @click="showAlert">Show Alert</button>
    
    <Alert 
      :title="alertOptions.title"
      :message="alertOptions.message"
      :type="alertOptions.type"
      :confirm-text="alertOptions.confirmText"
      :cancel-text="alertOptions.cancelText"
      :on-confirm="alertOptions.onConfirm"
      :on-cancel="alertOptions.onCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Alert from '~/domains/app/components/message/Alert/index.vue'
import useAlert from '~/domains/app/components/message/Alert/useAlert'

const { isOpen, alertOptions, showAlert, handleConfirm, handleCancel } = useAlert({
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item? This action cannot be undone.',
  type: 'warning',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  onConfirm: async () => {
    console.log('Item deleted')
    // Add your delete logic here
  },
  onCancel: async () => {
    console.log('Delete cancelled')
  }
})
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Are you sure?'` | The title displayed in the alert header |
| `message` | `string` | `''` | The message content displayed in the alert body |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'warning'` | The type of alert determining icon and colors |
| `confirmText` | `string` | `'OK'` | Text for the confirm button |
| `cancelText` | `string` | `'Cancel'` | Text for the cancel button |
| `onConfirm` | `() => void \| Promise<void>` | `undefined` | Callback function called when confirm button is clicked |
| `onCancel` | `() => void \| Promise<void>` | `undefined` | Callback function called when cancel button is clicked |

## Methods

| Method | Description |
|--------|-------------|
| `showAlert(options?)` | Shows the alert modal with optional new options |
| `hideAlert()` | Hides the alert modal |

## Alert Types

- **Success**: Green color scheme, typically used for successful operations
- **Error**: Red color scheme, typically used for error messages
- **Warning**: Orange color scheme, typically used for warnings and confirmations
- **Info**: Blue color scheme, typically used for informational messages

## Styling

The component uses SCSS for styling and supports:
- Responsive design
- Dark mode (via `prefers-color-scheme`)
- Smooth transitions and animations
- Customizable colors based on alert type

## Dependencies

- Vue 3 Composition API
- Modal component (`~/domains/app/components/overlay/modal/index.vue`)
- Button component (`~/domains/app/components/form/Button/index.vue`)
- Icon components (`~/domains/app/assets/icons/`)
