
<template>
  <div class="edit-mainCategory-form">
    <div class="mainCategory">
      <TextInput v-model="mainCategoryUpdateForm.name" label="Name" required :error-message="mainCategoryUpdateErrors['name']"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
// vars
import {mainCategoryUpdateForm, mainCategoryUpdateErrors} from '~/domains/category/composables/variables'

defineOptions({
  name: 'EditMainCategoryFormModalContent'
})
</script>

<style scoped>
.edit-mainCategory-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .mainCategory{
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