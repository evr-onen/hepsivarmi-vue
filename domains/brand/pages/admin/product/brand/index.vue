<template>
  <div class="brand-page admin-content">
    <h2 class="pageTitle">Brands</h2>
    <div class="content">

      <div class="content-top">
        <Button class="w-fit" severity="gradient" color="primary" label="Create Brand"
          @click="createBrandModalHandler" />
        <Button class="w-fit" severity="gradient" color="warning" label="Reset" @click="resetHandler" />
      </div>


      <div class="content-table">
        <div class="">
          <DataTable :value="tableData(toRaw(allBrands))" table-style="min-width: 50rem">
            <Column field="name" header="Brand Name">
              <template #body="slotProps">
                <div class="">
                  {{ slotProps.data.name }}
                </div>
              </template>
            </Column>
            <Column field="logo" header="Logo">
              <template #body="slotProps">
                <div class="">
                  <NuxtImg
                      :src="slotProps.data.logo"
                      :placeholder="[15, 10]"
                      width="150"
                      height="100"
                      class="rounded"
                  />
                </div>
              </template>
            </Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <div class="actionButtons">
                  <Button class="circleButtonStyle" severity="gradient" color="success"
                    @click="editBrandModalHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:edit" />
                    </template>
                  </Button>
                  <Button class="circleButtonStyle" severity="gradient" color="warning"
                    @click="deleteMainCategoryHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:trash" />
                    </template>
                  </Button>

                </div>
              </template>
            </Column>
          </DataTable>
          <Paginator
              v-if="allBrands.length > tableRows"
              v-model:first="firstListIndex"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
              }"
              :rows="tableRows"
              :total-records="toRaw(allBrands).length"
          />
        </div>
      </div>
    </div>
    <Modal v-model="isOpenCreateBrandModal" title="Create Brand" width="sm">
      <CreateBrandModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Create" color="success" @click="createBrandHandler" />
      </template>
    </Modal>
    <Modal v-model="isOpenUpdateBrandModal" title="Edit Brand" width="sm">
      <UpdateBrandModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Update" color="success" @click="updateBrandHandler" />
      </template>
    </Modal>
    <Toast />
    <Alert
        ref="deleteBrandAlert" title="Delete Main Category"
        message="Are you sure you want to delete this Category and all of its value? This action cannot be undone."
        type="warning"
        confirm-text="Delete"
        cancel-text="Cancel"
        :on-confirm="handleDeleteMainCategoryConfirm"
        :on-cancel="handleDeleteMainCategoryCancel"
    />

  </div>
</template>

<script setup lang="ts">
// ui
import Button from '~/domains/app/components/form/Button/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";
import Alert from '~/domains/app/components/message/Alert/index.vue'
import Toast from '~/domains/app/components/message/Toast/index.vue'

//modals
import CreateBrandModalForm from "~/domains/brand/components/createBrandModalForm/createBrandModalForm.vue";
import UpdateBrandModalForm from "~/domains/brand/components/updateBrandModalForm/updateBrandModalForm.vue";

// variables
import {
  allBrands,
  createBrandForm,
  deleteBrandForm, imagePath,
  isOpenCreateBrandModal,
  isOpenUpdateBrandModal,
  updateBrandForm,
  updateBrandFormErrors,
} from "~/domains/brand/composables/variables";

// composables
import useCreateBrand from '~/domains/brand/composables/useCreateBrand'
import useShowBrand from "~/domains/brand/composables/useShowBrand";
import useUpdateBrand from "~/domains/brand/composables/useUpdateBrand";
import useDeleteBrand from "~/domains/brand/composables/useDeleteBrand";

// types
import {
  createBrandErrorsEntity,
  createBrandFormEntity,
  deleteBrandFormEntity,
  updateBrandErrorsEntity,
  updateBrandFormEntity
} from "~/domains/brand/entities/brandEntity";
import type { IBrand } from "~/domains/brand/types/brandTypes";


// vars
const firstListIndex = ref<number>(0)
const deleteBrandAlert = ref()
const tableRows = ref<number>(10)

// hooks
const { onGetBrands } = useShowBrand()
const { onCreateBrand, onResetBrand } = useCreateBrand()
const { onUpdateBrand } = useUpdateBrand()
const { onDeleteBrand } = useDeleteBrand()

// lifecycles
onMounted(async () => {
  await onGetBrands()
})


const tableData = (rawData: IBrand[]) => rawData.slice(firstListIndex.value, firstListIndex.value + tableRows.value)

//handlers
const createBrandHandler = () => onCreateBrand()
const updateBrandHandler = () => onUpdateBrand()

// modal handlers
const createBrandModalHandler = () => {
  createBrandForm.value = createBrandFormEntity({})
  createBrandFormErrors.value = createBrandErrorsEntity()
  isOpenCreateBrandModal.value = true;
}

const resetHandler = () => onResetBrand()

const editBrandModalHandler = (id: string) => {
  const editItemIndex = allBrands.value.findIndex(item => item.id === id)
  imagePath.value = allBrands.value[editItemIndex].logo
  updateBrandForm.value = updateBrandFormEntity(toRaw(allBrands.value[editItemIndex]))
  updateBrandFormErrors.value = updateBrandErrorsEntity()
  isOpenUpdateBrandModal.value = true
}

// Delete Main Category and all of its sub categories handlers
const deleteMainCategoryHandler = (id: string) => {
  deleteBrandForm.value = deleteBrandFormEntity({ id })
  deleteBrandAlert.value?.showAlert()
}
const handleDeleteMainCategoryConfirm = async () => {
  if (deleteBrandForm.value) {
    await onDeleteBrand()
    deleteBrandForm.value = deleteBrandFormEntity({})
  }
}
const handleDeleteMainCategoryCancel = async () => {
  deleteBrandForm.value = deleteBrandFormEntity({})
  console.log('Delete cancelled')
}
</script>

<style scoped>
.brand-page {
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