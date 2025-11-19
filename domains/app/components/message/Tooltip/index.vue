<script setup lang="ts">
import Dropdown from "~/domains/app/components/form/Dropdown/index.vue";

interface SlotProps {
  message: string
}
defineProps<SlotProps>()
</script>

<template>
  <div class="tooltipStyle">
    <Dropdown class="w-full" type-code="ea-Select" :panel-height="20" default-open-position="top" open-on-hover>
      <template #default>
        <slot/>
      </template>

      <template #panelContent>
        <div class="panel">
          <p>{{message}}</p>
        </div>
      </template>

    </Dropdown>
  </div>

</template>

<style scoped>
.tooltipStyle{
  position: relative;

  .panel{
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: -105%;
    right: 0;
    background-color: #0E121B;
    color: #fff;
    padding-inline: 1rem;
    border-radius: 1rem;
    transition: 150ms;


  }

  &:hover{


  }
}
body{
  .panel{
    background-color: #0E121B;
    color: #fff;
    padding-inline: 1rem;
    border-radius: 4px;
    transition: 150ms;
    font-size: 12px;
    width: fit-content;

    p{
      white-space: nowrap;
    }
  }
}
</style>