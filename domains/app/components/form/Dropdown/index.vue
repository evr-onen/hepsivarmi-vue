<template>
  <div
      ref="dropdownPanelWrapper"
      v-click-outside="{
        handler: handleOutsideClick,
        exclude: [dropdownPanelRef]
      }"
      class="select-none"
      :class="[typeCode, {'contentPanelOpen':isOpen}]"
  >
    <div ref="slotRef" class="" @mouseenter="openOnHover && openPanel()" @mouseleave="openOnHover && closePanel()">
      <slot name="default" :open-panel="openPanel" />
    </div>
    <Teleport to="body">
      <div
          v-if="isOpen && (resultCount !==0)"
          ref="dropdownPanelRef"
          class="dropdownPanelWrapper fixed scrollbar-custom flex flex-col"
          :class="{'justify-end':isPanelOverflowing }"
          :style="{ top: `${panelPosition.y}px`, left: `${panelPosition.x}px`, width: `${panelWidth ?? panelPosition.width}px`, height: `${panelHeight}px` }"
          @click.stop="props.closeOnSelect ? handleOutsideClick : undefined"
      >
        <div >
          <slot name='panelContent' :close-panel="() => isOpen = false" />
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import './style.css'
import {  nextTick, watch } from 'vue';
import vClickOutside from "@/domains/app/directives/clickOutside";
import type { IDropdownProps } from './types';
import useDropdown from './useDropdown'

defineOptions({
  directives: {
    clickOutside: vClickOutside,
  },
})

const dropdownPanelWrapper = ref(null)

const props = withDefaults(defineProps<IDropdownProps>(), {
  panelHeight               : 300,
  closeOnSelect             : false,
  optionLabel               : 'name',
  widthType                 : 'full',
  clickOutside              : true,
  openOnHover               : false,
  defaultOpenPosition       : 'bottom'
})

const {
  slotRef,
  dropdownPanelRef,
  isOpen,
  panelPosition,
  isPanelOverflowing,
  handleOutsideClick,
  updatePosition,
  openPanel,
  closePanel,
  } = useDropdown(props)

watch([isOpen], async() => {
  await nextTick()
  updatePosition()
})
</script>



