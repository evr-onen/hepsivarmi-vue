
<template>
  <div class="create-property-form">
    <div class="PropName">
      <TextInput
          v-model="propertyUpdateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Main Category Name"
          :error-message="propertyUpdateErrors['name']"
      />
    </div>
    <div class="isItFilterItem">
      <Checkbox v-model="propertyUpdateForm.isFilterItem" label="Is it inside in Filter?"/>
    </div>
    <div class="values">
      <div class="valueList">
        <div v-for="badgeItem in propertyUpdateForm.values" :key="badgeItem.id" >
          <Tooltip message="click for edit">
            <div class="badgeStyle success" @click="editPropValueModalHandler(badgeItem.id, badgeItem.name, propertyUpdateForm.id)">
              {{ badgeItem.name }}
            </div>
          </Tooltip>
        </div>
      </div>
      <Button size="md" @click="createPropTypeValueModalHandler">
        <template #icon>
          <Icon name="charm:plus"/>
        </template>
      </Button>
    </div>
    <Modal v-model="isOpenCreatePropTypeValueModal" title="Create Property Value" width="sm">
      <CreatePropertyValueModalForm/>
      <template #footer="{closeModal}">
        <Button severity="gradient" label="Create" color="success" @click="createPropertyValueHandler"/>
        <Button label="Close" color="primary" @click="closeModal"/>
      </template>
    </Modal>
    <Modal v-model="isOpenEditPropTypeValueModal" title="Edit Property Value" width="sm">
      <EditPropertyValueModalForm/>
      <template #footer="{closeModal}">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal"/>
        <Button severity="gradient" label="Delete" color="warning" @click="deletePropertyValueHandler"/>
        <Button severity="gradient" label="Update" color="success" @click="updatePropertyValueHandler"/>
      </template>
    </Modal>
    <Alert
        ref="deleteValueAlert" title="Delete Property Value"
        message="Are you sure you want to delete this Property Value and all of its value? This action cannot be undone."
        type="warning"
        confirm-text="Delete"
        cancel-text="Cancel"
        :on-confirm="handleDeletePropValueConfirm"
        :on-cancel="handleDeletePropValueCancel" />
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Button from "~/domains/app/components/form/Button/index.vue";
import Tooltip from "~/domains/app/components/message/Tooltip/index.vue";
import Checkbox from '~/domains/app/components/form/Checkbox/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";
import Alert from "~/domains/app/components/message/Alert/index.vue";

// components
import CreatePropertyValueModalForm from '~/domains/property/components/propertyContent/createPropertyValueModalForm/createPropertyValueModalForm.vue'
import EditPropertyValueModalForm from '~/domains/property/components/propertyContent/editPropertyValueModalForm/editPropertyValueModalForm.vue'

// vars
import {
  propertyValueDeleteFormEntity,
  propertyValueUpdateFormEntity
} from "~/domains/property/entities/propertyEntity";

import {
  isOpenCreatePropTypeValueModal,
  isOpenEditPropTypeValueModal, propertyDeleteForm,
  propertyUpdateForm, propertyValueCreateForm, propertyValueDeleteForm, propertyValueUpdateForm
} from "~/domains/property/composables/variables";

// composables
import useCreateProperty from '~/domains/property/composables/useCreateProperty'
import useEditProperty from '~/domains/property/composables/useEditProperty'
import useDeleteProperty from '~/domains/property/composables/useDeleteProperty'

defineOptions({
  name: 'EditPropertyFormModalContent'
})

const { onCreatePropertyValue } = useCreateProperty()
const { onUpdatePropertyValue } = useEditProperty()
const { onDeletePropertyValue } = useDeleteProperty()

const deleteValueAlert = ref()



const createPropertyValueHandler = async ()=> {
  await onCreatePropertyValue()
}
const updatePropertyValueHandler = async ()=> {
  await onUpdatePropertyValue()
  isOpenEditPropTypeValueModal.value = false
}

// modal handlers
const createPropTypeValueModalHandler = ()=> {
  propertyValueCreateForm.value.prop_id = propertyUpdateForm.value.id
  isOpenCreatePropTypeValueModal.value = !isOpenCreatePropTypeValueModal.value
}


const editPropValueModalHandler = ( id: string, name: string, prop_id: string) => {
  propertyValueUpdateForm.value = propertyValueUpdateFormEntity({id, name, prop_id})
  isOpenEditPropTypeValueModal.value = !isOpenEditPropTypeValueModal.value
}
const deletePropertyValueHandler = () => {
  propertyValueDeleteForm.value = propertyValueDeleteFormEntity({id:propertyValueUpdateForm.value.id, prop_id: propertyValueUpdateForm.value.prop_id})
  deleteValueAlert.value?.showAlert()
}

// delete alert modal
const handleDeletePropValueConfirm = async () => {
  if (propertyValueDeleteForm.value) {
    await onDeletePropertyValue()
    propertyDeleteForm.value = propertyValueDeleteFormEntity({})
    isOpenEditPropTypeValueModal.value = false
  }
}
const handleDeletePropValueCancel = async () => {
  propertyValueDeleteForm.value = propertyValueDeleteFormEntity({})
  console.log('Delete cancelled')
}
</script>

<style scoped>
.create-property-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .values{
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;


    button{
      width: fit-content;
      margin-bottom: auto;
      padding-inline: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.valueList{
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;


}
</style>
