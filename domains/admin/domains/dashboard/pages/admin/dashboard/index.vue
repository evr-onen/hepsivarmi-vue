<template>
    <div class="w-full h-screen flex flex-col gap-4">
        <div>
          <Select  :options="selectOptions" option-label="label" />
        </div>

        <p>dashboard page</p>
        <div>
          {{multiselectValue}}
          <Multiselect v-model="multiselectValue" :options="selectOptions" option-label="label"/>

        </div>
        <div>
      <TextInput v-model="textInputValue" label="label example" required>
        <template #prefixIcon>
          <p class="">A</p>
        </template>
        <template #suffixIcon>
          <p class="">A</p>
        </template>
      </TextInput>
          -{{textInputValue}}-
        </div>
      <div class="">
        <ul>
          <li>Button severity outline eklenecek hover effects eklenecek</li>
          <li>datepickerlar eklenecek</li>
        </ul>
      </div>
    </div>
</template>

<script setup lang="ts">
import Multiselect from "~/domains/app/components/form/Multiselect/index.vue"
import Select from    "~/domains/app/components/form/Select/index.vue"
import TextInput from "~/domains/app/components/form/TextInput/index.vue"

const selectOptions = [
  { label: 'A', value: 1},
  { label: 'B', value: 2},
  { label: 'C', value: 3},
  { label: 'D', value: 4},
  { label: 'E', value: 5},
  { label: 'F', value: 6},
  { label: 'G', value: 7},
  { label: 'H', value: 8},
]

const multiselectValue = ref([])
const textInputValue = ref<string>('')
</script>

<style scoped>

</style>