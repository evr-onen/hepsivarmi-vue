
<template>
  <div class="create-subCategory-form">
    <div class="mainCategory">
      <Select v-model="mainCategory" label="Main Category" clearable :options="toRaw(allCategories)" option-label="name" option-value="id"  />
      <Button size="md" @click="isOpenMainCategoryModalHandler">
        <template #icon>
          <Icon name="line-md:plus"/>
        </template>
      </Button>
    </div>
    <div class="subCategory">
      <TextInput
          v-model="subCategoryCreateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Sub Category Name"
          :error-message="subCategoryCreateErrors['name']"
      />
      {{mainCategory}}
    </div>
    <Modal v-model="isOpenMainCategoryModal" title="Create Main Category" width="sm">
      <CreateMainCategoryModalForm />
      <template #footer="{closeModal}">
        <Button severity="outline" label="Create" color="success" @click="createMainCategoryHandler"/>
        <Button label="Close" color="primary" @click="closeModal"/>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Select from '~/domains/app/components/form/Select/index.vue'
import Button from '~/domains/app/components/form/Button/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";

import CreateMainCategoryModalForm from "~/domains/category/components/CreateMainCategoryModalForm/CreateMainCategoryModalForm.vue";
// vars
import {
    isOpenMainCategoryModal,
    allCategories,
    mainCategory,
    subCategoryCreateForm,
    subCategoryCreateErrors
} from '~/domains/category/composables/variables'
// type
import type {ICategory} from "~/domains/category/types/categoryTypes";
import useCreateCategory from '~/domains/category/composables/useCreateCategory'

defineOptions({
  name: 'CreateSubCategoryForm'
})
// hooks
const { onCreateMainCategory } = useCreateCategory()

// handlers
const createMainCategoryHandler = async ()=> await  onCreateMainCategory()

const isOpenMainCategoryModalHandler = ()=> isOpenMainCategoryModal.value = !isOpenMainCategoryModal.value

// lifecycles
watch(mainCategory, (newValue:ICategory) => {
  if(newValue){
    subCategoryCreateForm.value.main_id = newValue.id
  }
}, {deep: true})


</script>

<style scoped>
.create-subCategory-form{
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>