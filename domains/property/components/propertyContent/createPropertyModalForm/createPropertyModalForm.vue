
<template>
  <div class="create-property-form">
    <div class="PropName">
      <TextInput
          v-model="propertyCreateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Main Category Name"
          :error-message="propertyCreateErrors['name']"
      />
    </div>
    <div class="isItFilterItem">
      <Checkbox v-model="propertyCreateForm.isFilterItem" label="labelExample"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Checkbox from '~/domains/app/components/form/Checkbox/index.vue'

// vars
import {propertyCreateForm} from "~/domains/property/composables/variables";

defineOptions({
  name: 'CreatePropertyFormModalContent'
})

</script>

<style scoped>
.create-property-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .listName{
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;

    .ea-select{
      width: 100%;
    }

    button{
      width: fit-content;
      padding-inline: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}

</style>yle>
