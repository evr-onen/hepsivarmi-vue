<template>
  <div class="variant-page admin-content">
    <h2 class="pageTitle">Variant</h2>
    <div class="content">

      <div class="content-top">
        <Button class="w-fit" label="Create Variant" severity="gradient" color="primary"
                @click="createVariantTypeModalHandler"/>
        <Button class="w-fit" label="Reset" severity="gradient" color="warning" @click="resetHandler"/>
      </div>
      <div class="content-table">
        <div class="">
          <DataTable :value="tableData(toRaw(allVariants))" table-style="min-width: 50rem">
            <Column field="name" header="Type">
              <template #body="slotProps">
                <div class="badgeStyle success">
                  {{ slotProps.data.name }}
                </div>
              </template>
            </Column>
            <Column field="values" header="Values">
              <template #body="slotProps">
                <div class="valuesColumn">
                  <div v-for="badgeItem in slotProps.data.values" :key="badgeItem.id">
                    <div class="badgeStyle info">
                      {{ badgeItem.name }}
                    </div>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <div class="actionButtons">
                  <Button class="circleButtonStyle" severity="gradient" color="success"
                          @click="updateVariantModalHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:edit"/>
                    </template>
                  </Button>
                  <Button class="circleButtonStyle" severity="gradient" color="warning"
                          @click="deleteVariantTypeHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:trash"/>
                    </template>
                  </Button>

                </div>
              </template>
            </Column>
          </DataTable>
          <Paginator
              v-if="allVariants.length > tableRows"
              v-model:first="firstListIndex"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
              }"
              :rows="tableRows"
              :total-records="toRaw(allVariants).length"
          />

        </div>
      </div>
    </div>
    <Modal v-model="isOpenVariantTypeModal" title="Create Variant" width="sm">
      <CreateVariantModalForm/>
      <template #footer="{ closeModal }">
        <Button severity="outline" label="Create" color="success" @click="createVariantTypeHandler"/>
        <Button label="Close" color="primary" @click="closeModal"/>
      </template>
    </Modal>
    <Modal v-model="isOpenEditModal" title="Edit Variant" width="sm">
      <EditVariantModalForm/>
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal"/>
        <Button severity="gradient" label="Update" color="success" @click="updateVariantHandler"/>
      </template>
    </Modal>
    <Toast/>
    <Alert
        ref="deleteTypeAlert"
        title="Delete Variant Type"
        message="Are you sure you want to delete this variant type and all of its value? This action cannot be undone."
        type="warning"
        confirm-text="Delete"
        cancel-text="Cancel"
        :on-confirm="handleDeleteTypeConfirm"
        :on-cancel="handleDeleteTypeCancel"
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
import CreateVariantModalForm from "~/domains/variant/components/createVariantModalForm/createVariantModalForm.vue";
import EditVariantModalForm from "~/domains/variant/components/editVariantModalForm/editVariantModalForm.vue";

// variables
import {
  isOpenVariantTypeModal,
  isOpenEditModal,
  allVariants,
  variantUpdateForm, variantTypeCreateForm, variantTypeCreateErrors,
} from "~/domains/variant/composables/variables";
// composables
import useCreateVariant from '~/domains/variant/composables/useCreateVariant'
import useShowVariant from "~/domains/variant/composables/useShowVariant";
import useEditVariant from "~/domains/variant/composables/useEditVariant";
import useDeleteVariant from "~/domains/variant/composables/useDeleteVariant";

// types
import type {
  IVariant,
  IVariantTypeDeleteForm,
} from "~/domains/variant/types/variantTypes";
import {
  createVariantTypeEntity, createVariantTypeErrorsEntity,
  variantTypeDeleteFormEntity, variantUpdateFormEntity,
} from "~/domains/variant/entities/variantEntity";


// vars
const firstListIndex = ref<number>(0)
const deleteTypeAlert = ref()
const variantTypeDeleteForm = ref<IVariantTypeDeleteForm>(variantTypeDeleteFormEntity({}))
const tableRows = ref<number>(10)

// hooks
const {onCreateVariantType, onResetVariant} = useCreateVariant()
const {onUpdateVariant} = useEditVariant()
const {onGetVariants} = useShowVariant()
const {onDeleteVariantType} = useDeleteVariant()

// lifecycles
onMounted(async () => {
  await onGetVariants()
})


const tableData = (rawData: IVariant[]) => rawData.slice(firstListIndex.value, firstListIndex.value + tableRows.value)

// action handlers
const createVariantTypeHandler = () => onCreateVariantType()
const updateVariantHandler = () => onUpdateVariant()

// modal handlers
const updateVariantModalHandler = (id: string) => {
  const indexVariant = allVariants.value.findIndex(variant => variant.id === id)
  variantUpdateForm.value = variantUpdateFormEntity(toRaw(allVariants.value[indexVariant]))
  isOpenEditModal.value = true
}
const createVariantTypeModalHandler = () => {
  variantTypeCreateForm.value = createVariantTypeEntity({})
  variantTypeCreateErrors.value = createVariantTypeErrorsEntity()
  isOpenVariantTypeModal.value = !isOpenVariantTypeModal.value
}
const resetHandler = () => onResetVariant()

// Delete Type handlers
const deleteVariantTypeHandler = (id: string) => {
  variantTypeDeleteForm.value = variantTypeDeleteFormEntity({type_id: id})
  deleteTypeAlert.value?.showAlert()
}
const handleDeleteTypeConfirm = async () => {
  if (variantTypeDeleteForm.value) {
    await onDeleteVariantType(variantTypeDeleteForm.value)
    variantTypeDeleteForm.value = variantTypeDeleteFormEntity({})
  }
}
const handleDeleteTypeCancel = async () => {
  variantTypeDeleteForm.value = variantTypeDeleteFormEntity({})
  console.log('Delete cancelled')
}
</script>

<style scoped>
.variant-page {
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