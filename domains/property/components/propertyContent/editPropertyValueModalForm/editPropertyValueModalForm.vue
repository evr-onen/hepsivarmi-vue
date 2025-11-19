
<template>
  <div class="create-property-form">
    <div class="PropName">
      <TextInput
          v-model="propertyValueUpdateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Name"
          :error-message="propertyValueUpdateErrors['name']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'

// vars
import {
   propertyValueUpdateForm,
    propertyValueUpdateErrors
} from "~/domains/property/composables/variables";


defineOptions({
  name: 'EditPropertyValueFormModalContent'
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
.values{
    display: flex;
    gap: 1rem;
  flex-wrap: wrap;
    .badgeStyle {
      background-color: #106c8f;
      width: fit-content;
      padding-inline: 1rem;
      border-radius: 1rem;
      color: #fff;
      cursor: pointer;
    }
}
</style>yle>
