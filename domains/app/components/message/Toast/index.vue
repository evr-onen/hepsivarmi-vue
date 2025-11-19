<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="getToastClasses(toast.type)"
          class="toast"
          :style="getCustomStyles(toast)"
        >
          <div class="toast__content">
            <div class="toast__icon" :style="getIconStyles(toast)">
              <!-- Custom Icon -->
              <div v-if="toast.type === 'custom' && toast.customIcon" v-html="toast.customIcon"></div>

              <SuccessToast v-else-if="toast.type === 'success'" width="20" height="20"/>

              <ErrorToast v-else-if="toast.type === 'error'" width="20" height="20" />

              <WarningToast v-else-if="toast.type === 'warning'" width="20" height="20" />

              <!-- Default Icon for custom without icon -->
              <svg v-else-if="toast.type === 'custom'" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <div class="toast__message" :style="getTextStyles(toast)">
              {{ toast.message }}
            </div>
            <button
              class="toast__close"
              aria-label="Close toast"
              @click="removeToast(toast.id)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 6.586L11.95 2.636a1 1 0 111.414 1.414L9.414 8l3.95 3.95a1 1 0 11-1.414 1.414L8 9.414l-3.95 3.95a1 1 0 11-1.414-1.414L6.586 8 2.636 4.05a1 1 0 111.414-1.414L8 6.586z"/>
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Vue imports not needed for this component
import { useToast } from './useToast'
import type { ToastMessage } from './useToast'
import SuccessToast from "~/domains/app/assets/icons/success-toast.vue";
import ErrorToast from "~/domains/app/assets/icons/error-toast.vue";
import WarningToast from "~/domains/app/assets/icons/warning-toast.vue";

const { toasts, removeToast } = useToast()

// Get CSS classes based on toast type
const getToastClasses = (type: ToastMessage['type']) => {
  return {
    [`toast--${type}`]: true
  }
}

// Get custom styles for toast container
const getCustomStyles = (toast: ToastMessage) => {
  if (toast.type === 'custom' && toast.customColor) {
    return {
      backgroundColor: `${toast.customColor} !important`,
      borderLeftColor: `${toast.customColor} !important`,
      borderColor: `${toast.customColor}40 !important` // 40 = 25% opacity
    }
  }
  return {}
}

// Get custom styles for icon
const getIconStyles = (toast: ToastMessage) => {
  if (toast.type === 'custom' && toast.customIconColor) {
    return {
      color: `${toast.customIconColor} !important`
    }
  }
  return {}
}

// Get custom styles for text
const getTextStyles = (toast: ToastMessage) => {
  if (toast.type === 'custom' && toast.customTextColor) {
    return {
      color: `${toast.customTextColor} !important`
    }
  }
  return {}
}
</script>

<style scoped>
@import 'toast.style.scss';
</style>
