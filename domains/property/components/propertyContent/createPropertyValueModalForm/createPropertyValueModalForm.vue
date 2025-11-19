
<template>
  <div class="create-property-form">
    <div class="PropName">
      <TextInput
          v-model="propertyValueCreateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Main Category Name"
          :error-message="propertyValueCreateErrors['name']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'

// vars
import {propertyValueCreateErrors, propertyValueCreateForm} from "~/domains/property/composables/variables";

defineOptions({
  name: 'CreatePropertyValueFormModalContent'
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
