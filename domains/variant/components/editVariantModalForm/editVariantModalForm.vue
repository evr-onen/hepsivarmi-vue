
<template>
  <div class="edit-variant-form">
    <div class="variantType">
      <TextInput
          v-model="variantUpdateForm.name"
          class="text-black"
          label="Variant Value Name"
          required
          placeholder="Variant Value Name"
          :error-message="variantValueUpdateErrors['name']"
      />
    </div>

    <div class="values">
      <div class="valueList">
        <div v-for="badgeItem in variantUpdateForm.values" :key="badgeItem.id" >
          <Tooltip message="click for edit">
            <div class="badgeStyle success" @click="variantValueEditModalHandler(badgeItem.id)">
              {{ badgeItem.name }}
            </div>
          </Tooltip>
        </div>
      </div>
      <Button size="md" @click="variantValueCreateModalHandler">
        <template #icon>
          <Icon name="charm:plus"/>
        </template>
      </Button>
    </div>
    <Modal v-model="isOpenVariantValueEditModal" title="Edit Variant Value" width="sm">
      <EditVariantValueModalForm />
      <template #footer="{ closeModal }">
        <Button label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Delete" color="warning" @click="deleteVariantValueHandler" />
        <Button severity="gradient" label="Update" color="success" @click="variantValueUpdateHandler" />
      </template>
    </Modal>
    <Modal v-model="isOpenVariantValueCreateModal" title="Create Variant Value" width="sm">
      <CreateVariantValueModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Create" color="success" @click="variantValueCreateHandler" />
      </template>
    </Modal>
    <Alert
        ref="deleteValueAlert"
        title="Delete Variant Value"
        message="Are you sure you want to delete this variant Value? This action cannot be undone." type="warning"
        confirm-text="Delete"
        cancel-text="Cancel"
        :on-confirm="handleDeleteValueConfirm"
        :on-cancel="handleDeleteValueCancel"
    />
  </div>

</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Modal from "~/domains/app/components/overlay/modal/index.vue";
import Button from "~/domains/app/components/form/Button/index.vue";
import Tooltip from "~/domains/app/components/message/Tooltip/index.vue";
// vars
import {
  allVariants,
  variantValueUpdateErrors,
  variantUpdateForm,
  variantValueUpdateForm,
  isOpenVariantValueCreateModal,
  isOpenVariantValueEditModal,
  variantValueCreateForm,
  variantValueDeleteForm
} from '~/domains/variant/composables/variables'

import {updateVariantValueEntity} from "~/domains/variant/entities/variantEntity";
import useEditVariant from "~/domains/variant/composables/useEditVariant";
import useCreateVariant from "~/domains/variant/composables/useCreateVariant";
import useDeleteVariant from "~/domains/variant/composables/useDeleteVariant";

// components
import CreateVariantValueModalForm from "~/domains/variant/components/CreateVariantValueModalForm/createVariantValueModalForm.vue";
import EditVariantValueModalForm from "~/domains/variant/components/editVariantModalForm/editVariantValueModalForm.vue";
import Alert from "~/domains/app/components/message/Alert/index.vue";
defineOptions({
  name: 'EditVariantTypeFormModalContent'
})

const {onUpdateVariantValue, } = useEditVariant()
const {onCreateVariantValue, } = useCreateVariant()
const { onDeleteVariantValue} = useDeleteVariant()

const deleteValueAlert = ref()

// action handler
const variantValueUpdateHandler = ()=> onUpdateVariantValue()
const variantValueCreateHandler = ()=> onCreateVariantValue()

// Modal handler
const variantValueCreateModalHandler = ()=>{
  variantValueCreateForm.value.type_id = variantUpdateForm.value.id
  isOpenVariantValueCreateModal.value = true
}
const variantValueEditModalHandler = (id: string) => {
  const variantIndex =  allVariants.value.findIndex(variant => variant.id === variantUpdateForm.value.id)
  const valueIndex =  allVariants.value[variantIndex].values.findIndex(valueItem => valueItem.id === id);
  const selectedValue = allVariants.value[variantIndex].values[valueIndex]
  variantValueUpdateForm.value = updateVariantValueEntity(variantUpdateForm.value.id, selectedValue)
  isOpenVariantValueEditModal.value = true;
}

// Delete Value Handlers
const deleteVariantValueHandler = () => {
  variantValueDeleteForm.value = variantValueDeleteFormEntity({
    type_id: variantValueUpdateForm.value.type_id,
    value_id: variantValueUpdateForm.value.id
  })
  deleteValueAlert.value?.showAlert()
}
const handleDeleteValueConfirm = async () => {
  if (variantValueDeleteForm.value) {
    await onDeleteVariantValue(variantValueUpdateForm.value.type_id, variantValueUpdateForm.value.id )
    variantValueDeleteForm.value = variantValueDeleteFormEntity({})
  }
}
const handleDeleteValueCancel = async () => {
  variantValueDeleteForm.value = variantValueDeleteFormEntity({})
  console.log('Delete cancelled')
}

</script>

<style scoped>
.edit-variant-form{
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