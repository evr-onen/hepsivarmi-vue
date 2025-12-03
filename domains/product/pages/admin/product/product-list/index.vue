<template>
  <div class="product-page admin-content">
    <h2 class="pageTitle">Product List</h2>
    <div class="content">
      <div class="content-top">
        <Button class="w-fit" label="Create Product" severity="gradient" color="primary" @click="createProductModalHandler" />
        <Button class="w-fit" label="Reset" severity="gradient" color="warning" @click="resetHandler" />
      </div>
      <div class="content-table">
        <div class="">
          <DataTable :value="tableData(toRaw(allProducts))" table-style="min-width: 50rem">
            <Column field="name" header="Name">
              <template #body="slotProps">
                <div class="pl-4 text-slate-800">
                  {{ slotProps.data.name }}
                </div>
              </template>
            </Column>
            <Column field="mainCategory" header="Main Category">
              <template #body="slotProps">
                <div class="valuesColumn">
                    <div class="badgeStyle info">
                      {{ getCategoryName(slotProps.data.mainCategory.id, slotProps.data.subCategory.id).mainCategoryName }}
                    </div> 
                </div>
              </template>
            </Column>
            <Column field="subCategory" header="Sub Category">
              <template #body="slotProps">
                <div class="valuesColumn">
                    <div class="badgeStyle info">
                      {{ getCategoryName(slotProps.data.mainCategory.id, slotProps.data.subCategory.id).subCategoryName }}
                    </div> 
                </div>
              </template>
            </Column>
            <Column field="brand" header="Brand">
              <template #body="slotProps">
                <div class="valuesColumn">
                  <div class="badgeStyle info">
                    {{ getBrandName(slotProps.data.brand.id) ?? '' }}
                  </div> 
                </div>
              </template>
            </Column>
            <Column field="variantTypes" header="Variants">
              <template #body="slotProps">
                <div class="valuesColumn">
                  <div v-for="badgeItem in slotProps.data.variantTypes" :key="badgeItem.id" >
                    <div class="badgeStyle info">
                        {{ getVariantName(badgeItem.id) }}
                    </div> 
                  </div>
                </div>
              </template>
            </Column>
            <Column field="images" header="Images">
              <template #body="slotProps">
                <div class="valuesColumn">
                  <div v-for="badgeItem in slotProps.data.images" :key="badgeItem.id" >
                    <div class="badgeStyle info">
                      <NuxtImg
                        :src="badgeItem"
                        :placeholder="[15, 10]"
                        width="150"
                        height="100"
                        class="rounded"
                      />
                    </div> 
                  </div>
                </div>
              </template>
            </Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <div class="actionButtons">
                  <Button class="circleButtonStyle" severity="gradient" color="success" @click="updateProductModalHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:edit" />
                    </template>
                  </Button>
                  <Button class="circleButtonStyle" severity="gradient" color="warning" @click="deleteProductHandler(slotProps.data.id)">
                    <template #icon>
                      <Icon name="tabler:trash" />
                    </template>
                  </Button>

                </div>
              </template>
            </Column>
          </DataTable>
          <Paginator
              v-if="allProducts.length > tableRows"
              v-model:first="firstListIndex"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
              }"
              :rows="tableRows"
              :total-records="toRaw(allProducts).length"
          />

        </div>
      </div>
    </div>
    <Modal v-model="isOpenCreateProductModal" title="Create Product" width="sm">
      <CreateProductModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient"  label="Create" color="success" @click="createProductHandler" />
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
      </template>
    </Modal>
    <Modal v-model="isOpenEditProductModal" title="Edit Product" width="sm">
      <EditProductModalForm />
      <template #footer="{ closeModal }">
        <Button severity="gradient" label="Close" color="primary" @click="closeModal" />
        <Button severity="gradient" label="Update" color="success" @click="updateProductHandler" />
      </template>
    </Modal>
    <Toast />
    <Alert
        ref="deleteProductAlert"
        title="Delete Product"
        message="Are you sure you want to delete this product and all of its value? This action cannot be undone."
        type="warning"
        confirm-text="Delete"
        cancel-text="Cancel"
        :on-confirm="handleDeleteProductConfirm"
        :on-cancel="handleDeleteProductCancel"
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
import CreateProductModalForm from '~/domains/product/components/createProductModalForm/index.vue'
import EditProductModalForm from '~/domains/product/components/editProductModalForm/index.vue'

// variables
// category
import { allCategories } from '~/domains/category/composables/variables'
// brand
import { allBrands } from '~/domains/brand/composables/variables'
// variant
import { allVariants } from '~/domains/variant/composables/variables'
// product
import {
  isOpenCreateProductModal,
  isOpenEditProductModal,
  allProducts,
  createProductForm,
  createProductFormErrors,
  updateProductForm,
  updateProductFormErrors,
  deleteProductForm,
} from "~/domains/product/composables/variables";

// composables
import useShowProduct from "~/domains/product/composables/useShowProduct";
import useShowCategory from '~/domains/category/composables/useShowCategory'
import useShowBrand from '~/domains/brand/composables/useShowBrand'
import useCreateProduct from '~/domains/product/composables/useCreateProduct'
import useUpdateProduct from "~/domains/product/composables/useUpdateProduct";
import useDeleteProduct from "~/domains/product/composables/useDeleteProduct";
import useShowVariant from '~/domains/variant/composables/useShowVariant'
// types
import type {
  IProduct,
} from "~/domains/product/types/productTypes";
import {
  createProductFormEntity,
  updateProductFormEntity,
  deleteProductFormEntity,
  createProductErrorsEntity,
  updateProductErrorsEntity,

} from "~/domains/product/entities/productEntity";

// vars
const firstListIndex = ref<number>(0)
const deleteProductAlert = ref()
const tableRows = ref<number>(10)

// hooks
const { onGetProducts } = useShowProduct()
const { onGetCategories } = useShowCategory()
const { onGetVariants } = useShowVariant()
const { onGetBrands } = useShowBrand()
const { onResetProducts, onCreateProduct } = useCreateProduct()
const { onUpdateProduct } = useUpdateProduct()
const { onDeleteProduct } = useDeleteProduct()

// lifecycles
onMounted(async () => {
  await onGetProducts()
  await onGetCategories()
  await onGetBrands()
  await onGetVariants()
})


const tableData = (rawData: IProduct[]) => rawData.slice(firstListIndex.value, firstListIndex.value + tableRows.value)

// action handlers
const createProductHandler = () => onCreateProduct()
const updateProductHandler = () => onUpdateProduct()

// modal handlers
const createProductModalHandler = () => {
  createProductForm.value = createProductFormEntity({})
  createProductFormErrors.value = createProductErrorsEntity()
  isOpenCreateProductModal.value = true
}
const updateProductModalHandler = (id: string) => {
  const indexProduct = allProducts.value.findIndex(item => item.id === id)
  updateProductForm.value = updateProductFormEntity(toRaw(allProducts.value[indexProduct] as any))
  updateProductFormErrors.value = updateProductErrorsEntity()
  isOpenEditProductModal.value = true
}
const resetHandler = () => onResetProducts()

// Delete Type handlers
const deleteProductHandler = (id: string) => {
  deleteProductForm.value = deleteProductFormEntity({ id })
  deleteProductAlert.value?.showAlert()
}
const handleDeleteProductConfirm = async () => {
  if (deleteProductForm.value) {
    await onDeleteProduct()
    deleteProductForm.value = deleteProductFormEntity({})
  }
}
const handleDeleteProductCancel = async () => {
  deleteProductForm.value = deleteProductFormEntity({})
  console.log('Delete cancelled')
}

// return fonksions
const getCategoryName = (main_id: string, sub_id?: string) => {
  const category = allCategories.value.find(item => item.id === main_id)
  const subCategory = category?.subs.find(item => item.id === sub_id)
  return { mainCategoryName: category?.name, subCategoryName: subCategory?.name }
}

const getBrandName = (brand_id: string) => {
  const brand = allBrands.value.find(item => item.id === brand_id)
  return brand?.name
}

const getVariantName = (variant_id: string) => {
  const variant = allVariants.value.find(item => item.id === variant_id)
  return variant?.name
}

</script>

<style scoped>
.product-page {
  .pageTitle {
    font-size: 2rem;
    font-weight: 600;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: auto;

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