<template>
  <div class="ea-multiselect" :class="{ 'ea-multiselect--disabled': disabled, 'ea-multiselect--error': error, 'ea-multiselect--required': required }">
    <small v-if="label" class="ea-multiselect__label capitalize text-textPrimary">
      {{ label }}
      <span v-if="required" class="ea-multiselect__required-asterisk">*</span>
    </small>
    <Dropdown v-model="selectValues" class="w-full" type-code="ea-Multiselect" :click-outside="true">
      <template #default="{openPanel}">
        <div
            class="ea-multiselect__placeholder"
            :class="[
              size,
              {
                'ea-multiselect__placeholder--disabled': disabled,
                'ea-multiselect__placeholder--error': error,
                'ea-multiselect__placeholder--loading': isLoadingState
              }
            ]"
            :tabindex="disabled ? -1 : 0"
            @keydown="(e)=>togglePanelKeypressHandler(e, openPanel)"
            @click="()=>handleSelectClick(openPanel)"
          >
          <div v-if="selectValues && selectValues.length > 0" ref="badgeContainerRef" class="flex gap-1 overflow-hidden flex-1 items-center">
            <!-- Show visible badges -->
            <EaBadge
              v-for="(selectedItem, index) in selectValues.slice(0, showNumeric ? maxVisibleBadges : selectValues.length)"
              :key="index"
              :label="selectedItem[optionLabel] as string"
              bg-color="#76808b"
              text-color="#fff"
              :size="size"
            >
            </EaBadge>

            <!-- Show numeric indicator if overflowing -->
            <div
                v-if="showNumeric"
                :class="[
                'bg-gray-100 rounded text-gray-600 whitespace-nowrap',
                {
                  'px-1.5 py-0.5 text-xs': size === 'small',
                  'px-2 py-1 text-sm': size === 'normal',
                  'px-2.5 py-1.5 text-sm': size === 'large'
                }
            ]">
              +{{ selectValues.length - maxVisibleBadges }} more
            </div>
          </div>

          <p v-else class="text-placeholder">{{ (placeholder || "Please Select") }}</p>

          <div class="flex items-center gap-2 ml-auto">
            <button
              v-if="clearable && selectValues?.length && selectValues.length > 0 && !disabled && !isLoadingState"
              class="ea-multiselect__clear-btn"
              type="button"
              tabindex="-1"
              @click.stop="clearSelection"
            >
              <svg class="size-4 text-placeholder hover:text-textPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div v-if="isLoadingState" class="ea-multiselect__loading">
              <svg class="animate-spin size-4 text-placeholder" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <svg v-if="!isLoadingState" width="24" height="24"  class="size-6 text-placeholder" :class="{ 'opacity-50': disabled }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </template>

      <template #panelContent="{ closePanel }">
        <ul ref="optionsContentRef" class="ea-multiselect__option-panel capitalize ">
          <li v-if="isLoadingState && finalOptions.length === 0" class="px-4 py-3 text-center">
            <div class="flex items-center justify-center gap-2">
              <svg class="animate-spin size-4 text-placeholder" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-placeholder">Loading options...</span>
            </div>
          </li>
          <li
              v-for="(option, index) in finalOptions"
              :key="index"
              tabindex="0"
              :class="{ 'selectedOption': isSame(option), 'hoverOption': hoverIndex === index }"
              @click.stop="optionClickHandler(option)"  @mouseenter="(e) => onHover(e.target, index)"
          >
              <p class="">{{ option[optionLabel] }}</p>
          </li>
        </ul>
      </template>

    </Dropdown>
    <small v-if="error && errorMessage" class="ea-multiselect__error-message text-red-500 mt-1">{{ getErrorMessage }}</small>
    <small v-if="hint && !error" class="ea-multiselect__hint text-gray-500 mt-1">{{ hint }}</small>
  </div>
</template>

<script setup lang="ts">
import type { IMultiselectProps, OptionsType } from './multiselect.types';
import Dropdown from '~/domains/app/components/form/Dropdown/index.vue';
import EaBadge from '~/domains/app/components/form/Badge/EaBadge.vue';
import "./multiselect.style.scss"
import useMultiselect from './useMultiselect';


const props = withDefaults(defineProps<IMultiselectProps>(), {
  optionLabel   : 'name',
  size          : 'normal',
  disabled      : false,
  error         : false,
  clearable     : false,
  isLoading     : false,
  multiselect   : true,
  searchable    : false,
  required      : false,
  closeOnSelect : true
})

const selectValues = defineModel<OptionsType[]>();

const clearSelection = () => {
  if (!props.disabled && !isLoadingState.value) {
    selectValues.value = []
  }
}

const {
  hoverIndex,
  finalOptions,
  isLoadingState,
  showNumeric,
  maxVisibleBadges,
  badgeContainerRef,
  isSame,
  onHover,
  optionClickHandler,
  togglePanelKeypressHandler,
  handleKeyDown,
  optionsContentRef,
  loadAsyncData
} = useMultiselect(props, selectValues)

// Handle select click - load async data if needed
const handleSelectClick = async (openPanel: () => void) => {
  if (props.disabled) return

  if (props.onLoad && finalOptions.value.length === 0) {
    // Load async data and open panel
    await loadAsyncData(openPanel)
  } else {
    // Just open panel normally
    openPanel()
  }
}

const getErrorMessage = computed<string>(() => {
  if(props.errorMessage && props.errorMessage.length > 0){
    return props.errorMessage.join('<br/>')
  }

  return ''
})

</script>

<style scoped></style>
