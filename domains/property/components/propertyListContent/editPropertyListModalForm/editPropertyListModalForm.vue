
<template>
  <div class="edit-property-list-form">
    <div class="listName">
      <TextInput
          v-model="propertyListUpdateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Main Category Name"
          :error-message="mainCategoryCreateErrors['name']"
      />
    </div>
    <div class="selectedProperties">
      <Multiselect
          v-model="propertyListUpdateForm.props"
          class="text-black"
          label="Properties"
          required
          placeholder="Select Properties"
          :options="toRaw(allProperties)"
          option-label="name"
          option-value="id"
      />
<!--          :error-message="mainCategoryCreateErrors['props'].toString()"-->
    </div>

  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Multiselect from '~/domains/app/components/form/Multiselect/index.vue'
// vars
import {propertyListUpdateForm, allProperties} from "~/domains/property/composables/variables";

defineOptions({
  name: 'CreateMainCategoryFormModalContent'
})
</script>

<style scoped>
.edit-property-list-form{
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