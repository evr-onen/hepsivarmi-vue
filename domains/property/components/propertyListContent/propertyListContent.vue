<template>
  <div class="content">
    <div class="content-top">
      <Button class="w-fit" severity="gradient" color="primary" label="Create List" @click="createPropertyListModalHandler" />
      <Button class="w-fit" severity="gradient" color="warning" label="Reset" @click="resetHandler" />
    </div>
    <div class="content-table">
      <div class="">
        <h2 class="w-full text-center font-semibold text-2xl mb-4">Property List</h2>
        <DataTable :value="tableData(toRaw(allPropertyList))" table-style="min-width: 50rem">
          <Column field="name" header="List Name">
            <template #body="slotProps">
                <div class="badgeStyle success">
                  {{ slotProps.data.name }}
                </div>
            </template>
          </Column>
          <Column field="props" header="Properties">
            <template #body="slotProps">
              <div class="valuesColumn">
                <div v-for="badgeItem in slotProps.data.props" :key="badgeItem.id" >
                  <div class="badgeStyle info">
                    {{ getPropertyName(badgeItem.id) }}
                  </div>
                </div>
              </div>
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <div class="actionButtons">
                <Button class="circleButtonStyle" severity="gradient" color="success" @click="editPropertyListModalHandler(slotProps.data.id)">
                  <template #icon>
                    <Icon name="tabler:edit" />
                  </template>
                </Button>
                <Button class="circleButtonStyle" severity="gradient" color="warning" @click="deletePropertyListHandler(slotProps.data.id)">
                  <template #icon>
                    <Icon name="tabler:trash" />
                  </template>
                </Button>
              </div>
            </template>
          </Column>
        </DataTable>
        <Paginator
            v-if="allPropertyList.length > tableRows"
            v-model:first="firstListIndex"
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
            }"
            :rows="tableRows"
            :total-records="toRaw(allPropertyList).length"
        />

      </div>
    </div>
  </div>
  <Modal v-model="isOpenPropertyListCreateModal" title="Create Property List" width="sm">
    <CreatePropertyListModalForm />
    <template #footer="{ closeModal }">
      <Button severity="outline" label="Create" color="success" @click="createPropertyListHandler" />
      <Button label="Close" color="primary" @click="closeModal" />
    </template>
  </Modal>
  <Modal v-model="isOpenPropertyListEditModal" title="Update Property List" width="sm">
    <EditPropertyListModalForm />
    <template #footer="{ closeModal }">
      <Button severity="outline" label="Update" color="success" @click="updatePropertyListHandler" />
      <Button label="Close" color="primary" @click="closeModal" />
    </template>
  </Modal>
  <Toast />
  <Alert
      ref="deleteListAlert" title="Delete Property List"
      message="Are you sure you want to delete this Property List and all of its value? This action cannot be undone."
      type="warning"
      confirm-text="Delete"
      cancel-text="Cancel"
      :on-confirm="handleDeletePropertyListConfirm"
      :on-cancel="handleDeletePropertyListCancel" />

</template>

<script setup lang="ts">
// ui
import Button from '~/domains/app/components/form/Button/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";
import Alert from '~/domains/app/components/message/Alert/index.vue'
import Toast from '~/domains/app/components/message/Toast/index.vue'

//modals
import CreatePropertyListModalForm from "~/domains/property/components/propertyListContent/createPropertyListModalForm/createPropertyListModalForm.vue";
import EditPropertyListModalForm from "~/domains/property/components/propertyListContent/editPropertyListModalForm/editPropertyListModalForm.vue";
// variables
import {
  allProperties,
  isOpenPropertyListCreateModal,
  isOpenPropertyListEditModal,
  propertyListDeleteForm,
  propertyListUpdateForm
} from "~/domains/property/composables/variables";

// composables
import useCreateProperty from '~/domains/property/composables/useCreateProperty'
import useShowProperty from "~/domains/property/composables/useShowProperty";
import useEditProperty from "~/domains/property/composables/useEditProperty";
import useDeleteProperty from "~/domains/property/composables/useDeleteProperty";
import type {IPropertyList} from "~/domains/property/types/propertyListTypes";
import {
  propertyListDeleteFormEntity,
  propertyListUpdateFormEntity
} from "~/domains/property/entities/propertyListEntity";

defineOptions({
  name: 'PropertyListContent',
})

// vars
const firstListIndex = ref<number>(0)
const deleteListAlert = ref()
const tableRows = ref<number>(10)

// hooks
const { onGetPropertyLists } = useShowProperty()
const { onGetProperties } = useShowProperty()
const { onCreatePropertyList, onResetPropertyLists  } = useCreateProperty()
const { onUpdatePropertyList } = useEditProperty()
const { onDeletePropertyList } = useDeleteProperty()

// lifecycles
onMounted(async () => {
  await onGetPropertyLists()
  await onGetProperties()
})

// return functions
const getPropertyName = (id: string) => {
  const property = allProperties.value.find(item => item.id === id)
  return property?.name
}


const tableData = (rawData: IPropertyList[]) => rawData.slice(firstListIndex.value, firstListIndex.value + tableRows.value)

//handlers
const createPropertyListHandler = () => onCreatePropertyList()
const updatePropertyListHandler = async() => {
  await onUpdatePropertyList()
}

// modal handlers
const createPropertyListModalHandler = () => isOpenPropertyListCreateModal.value = !isOpenPropertyListCreateModal.value
const resetHandler = async() => await onResetPropertyLists()

const editPropertyListModalHandler = (id: string) => {
  const selectedItemIndex = allPropertyList.value.findIndex(item => item.id === id)
  propertyListUpdateForm.value = propertyListUpdateFormEntity(toRaw(allPropertyList.value[selectedItemIndex]))
  isOpenPropertyListEditModal.value = !isOpenPropertyListEditModal.value
}

// Delete Property List
const deletePropertyListHandler = (id: string) => {
  propertyListDeleteForm.value = propertyListDeleteFormEntity({ id })
  deleteListAlert.value?.showAlert()
}
const handleDeletePropertyListConfirm = async () => {
  if (propertyListDeleteForm.value) {
    await onDeletePropertyList()
    propertyListDeleteForm.value = propertyListDeleteFormEntity({})
  }
}
const handleDeletePropertyListCancel = async () => {
  propertyListDeleteForm.value = propertyListDeleteFormEntity({})
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


.valuesColumn {
  display: flex;
  gap: 1rem;
}


</style>