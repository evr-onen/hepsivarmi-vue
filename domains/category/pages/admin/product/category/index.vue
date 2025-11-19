<template>
  <div class="category-page admin-content">
    <h2 class="pageTitle">Category</h2>
    <div class="content">

      <div class="content-top">
        <Button class="w-fit" severity="gradient" color="primary" label="Create Main Category" @click="createMainCategoryModalHandler" />
        <Button class="w-fit" severity="gradient" color="primary" label="Create Sub Category" @click="createSubCategoryModalHandler" />
        <Button class="w-fit" severity="gradient" color="warning" label="Reset" @click="resetHandler" />
      </div>
      <div class="content-table">
        <div class="">
          <DataTable :value="tableData(toRaw(allCategories))" table-style="min-width: 50rem">
            <Column field="name" header="Main Category">
              <template #body="slotProps">
                <Tooltip message="click for edit">
                  <div class="badgeStyle success" @click="editMainCategoryModalHandler(slotProps.data)">
                    {{ slotProps.data.name }}
                  </div>
                </Tooltip>
              </template>
            </Column>
            <Column field="sub" header="Sub Categories">
              <template #body="slotProps">
                <div class="valuesColumn">
                  <div v-for="badgeItem in slotProps.data.subs" :key="badgeItem.id">
                    <Tooltip message="click for edit">
                      <div class="badgeStyle info" @click="editSubCategoryModalHandler(slotProps.data.id, badgeItem)">
                        {{ badgeItem.name }}
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <div class="actionButtons">
                  <Button class="circleButtonStyle" severity="gradient" color="warning" @click="deleteMainCategoryHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:trash" />
                    </template>
                  </Button>

                </div>
              </template>
            </Column>
          </DataTable>
          <Paginator
              v-if="allCategories.length > tableRows"
              v-model:first="firstListIndex"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
              }"
              :rows="tableRows"
              :total-records="toRaw(allCategories).length"
          />

        </div>
      </div>
    </div>
    <Modal v-model="isOpenMainCategoryModal" title="Edit Variant Type" width="sm">
      <CreateMainCategoryModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Create" color="success" @click="createMainCategoryHandler" />
      </template>
    </Modal>
    <Modal v-model="isOpenCreateModal" title="Create Variant Value" width="sm">
      <CreateSubCategoryModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Create" color="success" @click="createSubCategoryHandler" />
      </template>
    </Modal>
    <Modal v-model="isOpenEditMainModal" title="Edit Variant Type" width="sm">
      <EditMainCategoryModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Update" color="success" @click="updateMainCategoryHandler" />
      </template>
    </Modal>
    <Modal v-model="isOpenEditModal" title="Edit Variant Value" width="sm">
      <EditSubCategoryModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Delete" color="warning" @click="deleteSubCategoryHandler" />
        <Button severity="gradient" label="Update" color="success" @click="updateSubCategoryHandler" />
      </template>
    </Modal>
    <Toast />
    <Alert ref="deleteTypeAlert" title="Delete Main Category"
      message="Are you sure you want to delete this Category and all of its value? This action cannot be undone."
      type="warning" confirm-text="Delete" cancel-text="Cancel" :on-confirm="handleDeleteMainCategoryConfirm"
      :on-cancel="handleDeleteMainCategoryCancel" />
    <Alert ref="deleteValueAlert" title="Delete Sub Category"
      message="Are you sure you want to delete this Sub Category? This action cannot be undone." type="warning"
      confirm-text="Delete" cancel-text="Cancel" :on-confirm="handleDeleteSubCategoryConfirm"
      :on-cancel="handleDeleteSubCategoryCancel" />
  </div>
</template>

<script setup lang="ts">
// ui
import Button from '~/domains/app/components/form/Button/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";
import Alert from '~/domains/app/components/message/Alert/index.vue'
import Tooltip from '~/domains/app/components/message/Tooltip/index.vue'
import Toast from '~/domains/app/components/message/Toast/index.vue'

//modals
import CreateMainCategoryModalForm from "~/domains/category/components/CreateMainCategoryModalForm/CreateMainCategoryModalForm.vue";
import CreateSubCategoryModalForm from "~/domains/category/components/createSubCategoryModalForm/createSubCategoryModalForm.vue";
import EditMainCategoryModalForm from "~/domains/category/components/editSubCategoryModalForm/editMainCategoryModalForm.vue";
import EditSubCategoryModalForm from "~/domains/category/components/editSubCategoryModalForm/editSubCategoryModalForm.vue";

// variables
import {
  isOpenMainCategoryModal,
  isOpenCreateModal,
  isOpenEditMainModal,
  isOpenEditModal,
  subCategoryUpdateForm,
  mainCategoryUpdateForm,
  allCategories,
  mainCategory,
  subCategoryCreateForm, subCategoryCreateErrors, subCategoryUpdateErrors, mainCategoryCreateErrors
} from "~/domains/category/composables/variables";

// composables
import useCreateCategory from '~/domains/category/composables/useCreateCategory'
import useShowCategory from "~/domains/category/composables/useShowCategory";
import useEditCategory from "~/domains/category/composables/useEditCategory";
import useDeleteCategory from "~/domains/category/composables/useDeleteCategory";

// types
import type {
  ICategory,
  IMainCategoryDeleteForm,
  ISubCategoryDeleteForm,
  ISubCategory
} from "~/domains/category/types/categoryTypes";
import {
  subCategoryCreateFormEntity,
  mainCategoryUpdateFormEntity,
  subCategoryUpdateFormEntity,
  mainCategoryDeleteFormEntity,
  subCategoryDeleteFormEntity, updateSubCategoryErrorsEntity, createSubCategoryErrorsEntity,
  createMainCategoryErrorsEntity,
} from "~/domains/category/entities/categoryEntity";


// vars
const firstListIndex = ref<number>(0)
const deleteTypeAlert = ref()
const deleteValueAlert = ref()
const mainCategoryDeleteForm = ref<IMainCategoryDeleteForm>(mainCategoryDeleteFormEntity({}))
const subCategoryDeleteForm = ref<ISubCategoryDeleteForm>(subCategoryDeleteFormEntity({}))
const tableRows = ref<number>(10)

// hooks
const { onCreateMainCategory, onCreateSubCategory, onResetCategories } = useCreateCategory()
const { onUpdateMainCategory, onUpdateSubCategory } = useEditCategory()
const { onGetCategories } = useShowCategory()
const { onDeleteMainCategory, onDeleteSubCategory } = useDeleteCategory()

// lifecycles
onMounted(async () => {
  await onGetCategories()
  console.log(allCategories.value)
})


const tableData = (rawData: ICategory[]) => rawData.slice(firstListIndex.value, firstListIndex.value + tableRows.value)

//handlers
const createMainCategoryHandler = () => onCreateMainCategory()
const createSubCategoryHandler = () => onCreateSubCategory()
const updateMainCategoryHandler = () => onUpdateMainCategory()
const updateSubCategoryHandler = () => onUpdateSubCategory()

// modal handlers
const createSubCategoryModalHandler = () => {
  subCategoryCreateForm.value = subCategoryCreateFormEntity({})
  subCategoryCreateErrors.value = createSubCategoryErrorsEntity()
  mainCategory.value = null
  isOpenCreateModal.value = !isOpenCreateModal.value;
}
const createMainCategoryModalHandler = () => {
  isOpenMainCategoryModal.value = !isOpenMainCategoryModal.value
  mainCategoryCreateErrors.value = createMainCategoryErrorsEntity()
}
const resetHandler = () => onResetCategories()

const editSubCategoryModalHandler = (main_id: string, sub: ISubCategory) => {
  subCategoryUpdateForm.value = subCategoryUpdateFormEntity(main_id, sub)
  isOpenEditModal.value = !isOpenEditModal.value
  subCategoryUpdateErrors.value = updateSubCategoryErrorsEntity()
}

const editMainCategoryModalHandler = (itemData: ICategory) => {
  mainCategoryUpdateForm.value = mainCategoryUpdateFormEntity(itemData)
  isOpenEditMainModal.value = !isOpenEditMainModal.value
  mainCategoryUpdateErrors.value = updateMainCategoryErrorsEntity()
}

// Delete Main Category and all of its sub categories handlers
const deleteMainCategoryHandler = (id: string) => {
  mainCategoryDeleteForm.value = mainCategoryDeleteFormEntity({ main_id: id })
  deleteTypeAlert.value?.showAlert()
}
const handleDeleteMainCategoryConfirm = async () => {
  if (mainCategoryDeleteForm.value) {
    await onDeleteMainCategory(mainCategoryDeleteForm.value)
    mainCategoryDeleteForm.value = mainCategoryDeleteFormEntity({})
  }
}
const handleDeleteMainCategoryCancel = async () => {
  mainCategoryDeleteForm.value = mainCategoryDeleteFormEntity({})
  console.log('Delete cancelled')
}
// Delete Sub Category Handlers
const deleteSubCategoryHandler = () => {
  subCategoryDeleteForm.value = subCategoryDeleteFormEntity({
    main_id: subCategoryUpdateForm.value.main_id,
    sub_id: subCategoryUpdateForm.value.id
  })
  deleteValueAlert.value?.showAlert()
}
const handleDeleteSubCategoryConfirm = async () => {
  if (subCategoryDeleteForm.value) {
    await onDeleteSubCategory(subCategoryDeleteForm.value.main_id, subCategoryDeleteForm.value.main_id)
    subCategoryDeleteForm.value = subCategoryDeleteFormEntity({})
  }
}
const handleDeleteSubCategoryCancel = async () => {
  subCategoryDeleteForm.value = subCategoryDeleteFormEntity({})
  console.log('Delete cancelled')
}

</script>

<style scoped>
.category-page {
  .pageTitle {
    font-size: 2rem;
    font-weight: 600;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .content-top {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;

      button {
        padding-inline: 1rem;
        width: fit-content;
      }
    }
  }
}



.valuesColumn {
  display: flex;
  gap: 1rem;
}


</style>