<template>
  <div class="edit-subCategory-form">
    <div class="mainCategory">
      <Select
          v-model="mainCategory"
          label="Main Category Name"
          :options="toRaw(allVariants)"
          option-label="name"
          option-value="id"
          disabled
      />
    </div>
    <div class="subCategory">
      <TextInput
          v-model="subCategoryUpdateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Name"
          :error-message="subCategoryUpdateErrors['name']"
      />

    </div>
  </div>

</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Select from '~/domains/app/components/form/Select/index.vue'

// vars
import {
    mainCategory,
    subCategoryUpdateForm,
    subCategoryUpdateErrors,
    allCategories,
} from '~/domains/category/composables/variables'
// type
import type {ICategory} from "~/domains/category/types/categoryTypes";

defineOptions({
  name: 'EditSubCategoryFormModalContent'
})

// lifecycles
onMounted(() => {
    const index = allCategories.value.findIndex(catItem => {
      return catItem.id === subCategoryUpdateForm.value.main_id
    }
)
    if(index !== -1) mainCategory.value = allCategories.value[index]
})

watch(mainCategory, (newValue: ICategory) => {
  if (newValue) {
    subCategoryUpdateForm.value.main_id = newValue.id
  }
}, { deep: true })

</script>

<style scoped>
.edit-subCategory-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .subCategory {
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;


  }
}
</style>yle>