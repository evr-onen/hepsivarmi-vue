<template>
  <div
    class="ea-badge"
    :class="{
      'ea-badge--small': size === 'small',
      'ea-badge--large': size === 'large'
    }"
    :style="{backgroundColor: bgColor, color: textColor, fontSize: sizeValue}"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IBadgeProps } from './badge.types';

const props = withDefaults(defineProps<IBadgeProps>(), {
  size: 'normal',
})

const sizeValue = computed(() => {
  if (props.size === 'large') {
    return '1rem'
  } else if (props.size === 'small') {
    return '.75rem'
  }
  return '.875rem'
})
</script>

<style scoped lang="scss">
@use './badge.style.scss';
</style>
