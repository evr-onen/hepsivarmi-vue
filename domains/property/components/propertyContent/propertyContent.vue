<template>
  <div class="content">
    <div class="content-top">
      <Button class="w-fit" severity="gradient" color="primary" label="Create Property" @click="createPropertyModalHandler" />
      <Button class="w-fit" severity="gradient" color="warning" label="Reset" @click="resetHandler" />
    </div>
    <div class="content-table">
      <div class="">
        <h2 class="w-full text-center font-semibold text-2xl mb-4">Properties</h2>
        <DataTable :value="tableData(toRaw(allProperties))" table-style="min-width: 50rem">
          <Column field="name" header="Name">
            <template #body="slotProps">
                <div class="badgeStyle success">
                  {{ slotProps.data.name }}
                </div>
            </template>
          </Column>
          <Column field="values" header="Values">
            <template #body="slotProps">
              <div class="valuesColumn">
                <div v-for="badgeItem in slotProps.data.values" :key="badgeItem.id" >
                  <div class="badgeStyle info">
                    {{ badgeItem.name }}
                  </div>
                </div>
              </div>
            </template>
          </Column>
          <Column field="isFilteredItem" header="Is it inside Filter?" class="cell">
            <template #body="slotProps" >

              <div class="iconBadge">
                <Icon v-if="slotProps.data.isFilterItem" name="charm:tick" class="text-[#1aae6f]"/>
                <Icon v-else name="charm:cross" class="text-[#f80031]"/>
              </div>
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <div class="actionButtons">
                <Button class="circleButtonStyle " severity="gradient" color="success" @click="editPropTypeModalHandler(slotProps.data.id)">
                  <template #icon>
                    <Icon name="tabler:edit" />
                  </template>
                </Button>
                <Button class="circleButtonStyle " severity="gradient" color="warning" @click="deletePropTypeHandler(slotProps.data.id)">
                  <template #icon>
                    <Icon name="tabler:trash" />
                  </template>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
        <Paginator
            v-if="allProperties.length > tableRows"
            v-model:first="firstListIndex"
            :template="{
                          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
                        }"
            :rows="tableRows"
            :total-records="toRaw(allProperties).length"
        />
      </div>
    </div>
  </div>
  <Modal v-model="isOpenCreatePropTypeModal" title="Create Property" width="sm">
    <CreatePropertyModalForm />
    <template #footer="{ closeModal }">
      <Button severity="gradient" label="Create" color="success" @click="createPropertyHandler" />
      <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
    </template>
  </Modal>
  <Modal v-model="isOpenEditPropTypeModal" title="Edit Property" width="sm">
    <EditPropertyModalForm />
    <template #footer="{ closeModal }">
      <Button severity="gradient" label="Update" color="success" @click="updatePropertyHandler" />
      <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
    </template>
  </Modal>
  <Toast />
  <Alert
      ref="deleteTypeAlert" title="Delete Property"
      message="Are you sure you want to delete this Property and all of its value? This action cannot be undone."
      type="warning"
      confirm-text="Delete"
      cancel-text="Cancel"
      :on-confirm="handleDeletePropTypeConfirm"
      :on-cancel="handleDeletePropTypeCancel"
  />

</template>

<script setup lang="ts">
// ui
import Button from '~/domains/app/components/form/Button/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";
import Alert from '~/domains/app/components/message/Alert/index.vue'
import Toast from '~/domains/app/components/message/Toast/index.vue'

//modals
import CreatePropertyModalForm from "~/domains/property/components/propertyContent/createPropertyModalForm/createPropertyModalForm.vue";
import EditPropertyModalForm from "~/domains/property/components/propertyContent/editPropertyModalForm/editPropertyModalForm.vue";

// variables
import {
  allProperties,
  isOpenCreatePropTypeModal,
  isOpenEditPropTypeModal,
  propertyDeleteForm,
  propertyUpdateForm,

} from "~/domains/property/composables/variables";

// composables
import useCreateProperty from '~/domains/property/composables/useCreateProperty'
import useShowProperty from "~/domains/property/composables/useShowProperty";
import useEditProperty from "~/domains/property/composables/useEditProperty";
import useDeleteProperty from "~/domains/property/composables/useDeleteProperty";
import {
  propertyDeleteFormEntity,
  propertyUpdateFormEntity,
} from "~/domains/property/entities/propertyEntity";
import type {IPropType} from "~/domains/property/types/propertyTypes";

defineOptions({
  name: 'PropertiesContent',
})

// vars
const firstListIndex = ref<number>(0)
const deleteTypeAlert = ref()
const tableRows = ref<number>(10)

// hooks
const { onGetProperties } = useShowProperty()
const { onResetProperties, onCreateProperty} = useCreateProperty()
const { onUpdatePropertyType } = useEditProperty()
const { onDeletePropertyType  } = useDeleteProperty()

// lifecycles
onMounted(async () => {
  await onGetProperties()
})


const tableData = (rawData: IPropType[]) => rawData.slice(firstListIndex.value, firstListIndex.value + tableRows.value)

//handlers
const createPropertyHandler = () => onCreateProperty()
const updatePropertyHandler = () => onUpdatePropertyType()

// modal handlers
const createPropertyModalHandler = () => isOpenCreatePropTypeModal.value = !isOpenCreatePropTypeModal.value
const resetHandler = async() => {
  await onResetProperties()
}

const editPropTypeModalHandler = (id: string) => {
  const selectedItemIndex = allProperties.value.findIndex(item => item.id === id)
  propertyUpdateForm.value = propertyUpdateFormEntity(toRaw(allProperties.value[selectedItemIndex]))
  isOpenEditPropTypeModal.value = !isOpenEditPropTypeModal.value
}
// Delete Main Category and all of its sub categories handlers

const deletePropTypeHandler = (id:string) => {
  propertyDeleteForm.value = propertyDeleteFormEntity({id})
  deleteTypeAlert.value?.showAlert()
}
const handleDeletePropTypeConfirm = async () => {
  if (propertyDeleteForm.value) {
    await onDeletePropertyType()
    propertyDeleteForm.value = propertyDeleteFormEntity({})
  }
}
const handleDeletePropTypeCancel = async () => {
  propertyDeleteForm.value = propertyDeleteFormEntity({})
  console.log('Delete cancelled')
}


</script>

<style scoped>
.property-page {
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

.actionButtons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  .circleButtonStyle {
    background-color: #106c8f;
    border-radius: 50%;
    padding: 6px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
    transition: 300ms;

    &:hover {
      background-color: #347d9d;
    }
  }


}

.valuesColumn {
  display: flex;
  gap: 1rem;
}


.iconBadge{
  font-size: 1.5rem;
  font-weight: 600;

}



</style>