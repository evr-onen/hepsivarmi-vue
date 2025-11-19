<template>
  <div class="alert" :data-type="alertOptions.type">
    <Modal v-model="isOpen" width="sm" :title="alertOptions.title" :overlay-close="false">
      <template #default>
        <div class="alert-content">
          <div class="alert-icon">
            <component :is="iconComponent" class="icon-svg" width="80" height="80" />
          </div>
          <div v-if="alertOptions.message" class="alert-message">
            {{ alertOptions.message }}
          </div>
        </div>
      </template>
      <template #footer>
        <Button class="" label="OK" severity="gradient" color="success" @click="handleConfirm">
          {{ alertOptions.confirmText }}
        </Button>
        <Button class="" label="Cancel" severity="gradient" color="primary" @click="handleCancel">
          {{ alertOptions.cancelText }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
// Vue 3 Composition API functions are auto-imported in Nuxt 3
import WarningToast from '~/domains/app/assets/icons/warning-toast.vue'
import SuccessToast from '~/domains/app/assets/icons/success-toast.vue'
import ErrorToast from '~/domains/app/assets/icons/error-toast.vue'
import type { AlertType } from "~/domains/app/components/message/Alert/alert.types"
import useAlert from './useAlert'
import Button from '~/domains/app/components/form/Button/index.vue'
// Component name
defineOptions({
  name: 'AlertModal'
})

const props = withDefaults(defineProps<AlertType>(), {
  title: 'Are you sure?',
  message: '',
  type: 'warning',
  confirmText: 'OK',
  cancelText: 'Cancel'
})

const { isOpen, alertOptions, handleConfirm, handleCancel } = useAlert(props)

// Icon component mapping
const iconComponent = computed(() => {
  switch (alertOptions.value.type) {
    case 'success':
      return SuccessToast
    case 'error':
      return ErrorToast
    case 'warning':
      return WarningToast
    case 'info':
      return WarningToast // You can add an info icon later
    default:
      return WarningToast
  }
})


// Expose methods for parent components
defineExpose({
  showAlert: (options?: Partial<AlertType>) => {
    if (options) {
      Object.assign(alertOptions.value, options)
    }
    isOpen.value = true
  },
  hideAlert: () => {
    isOpen.value = false
  }
})
</script>

<style scoped lang="scss">
@import './alert.style.scss';

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }

  &.btn-primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &.btn-secondary {
    background-color: #6b7280;
    color: white;

    &:hover {
      background-color: #4b5563;
    }
  }
}
</style>