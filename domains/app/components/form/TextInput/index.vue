<template>
  <div class="textInput w-full">
    <div class="label">
      {{label}}<span v-if="required" class="required">*</span>
    </div>
    <div class="inputWrapper">
      <div class="prefixIconStyle">
        <slot name="prefixIcon"/>
      </div>
      <input  v-model="model" :type="textType" :class="{'prefixIconPadding':$slots.prefixIcon, 'suffixIconPadding':$slots.suffixIcon}">
      <div class="suffixIconStyle">
        <slot :class="suffixIconStyle" name="suffixIcon"/>
      </div>
    </div>
    <div v-if="errorMessage" class="errorMessage">{{getErrorMessage}}</div>
    <div v-if="helperText" class="helperText">{{helperText}}</div>
  </div>
</template>

<script setup lang="ts">
import type { TextInputProps } from './types'
import "./style.css"

const props =withDefaults(defineProps<TextInputProps>(),{
  textType: 'text',
})

const getErrorMessage = computed<string>(() => {
  if(props.errorMessage && props.errorMessage.length > 0){
    return props.errorMessage.join('<br/>')
  }

  return ''
})
const model = defineModel<string>()

</script>

<style scoped>
</style>