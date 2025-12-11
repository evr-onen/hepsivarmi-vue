<template>
  <button class="buttonStyle" :class="[buttonColor, buttonSize, buttonSeverity]">{{ label }}
    <slot name="icon" />
    <slot />
  </button>

</template>

<script setup lang="ts">
import type { IButton } from './types';
import './style.css'

defineOptions({
  name: 'Button'
})

const props = defineProps<IButton>()

// computed
const buttonColor = computed(() => {
  if (!props.color) return `color-primary`
  if (props.severity === 'gradient') {
    return `gradient-${props.color}`
  }
  return `color-${props.color}`
})

const buttonSize = computed(() => {
  if (!props.size) return `size-md`
  return `size-${props.size}`
})
const buttonSeverity = computed(() => {
  if (!props.severity) return `severity-filled`

  return `severity-${props.severity}`
})

</script>

<style scoped></style>