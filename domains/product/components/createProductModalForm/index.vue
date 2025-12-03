<template>
  
  <div class="create-product-form">
    <div class="copyFromProduct">
          <Select
              v-model="copyFromProduct"
              label="Copy From Product"
              :options="toRaw(allProducts)"
              option-label="name"
              option-value="id"
          />
    </div>
    <div class="name">
      <TextInput
        v-model="createProductForm.name"
        class="text-black"
        label="Product Name"
        placeholder="Brand Name"
        :error-message="createProductFormErrors['name']"
        required
      />
    </div>   
    <div class="main-category">
      <Select
          v-model="createProductForm.mainCategory"
          label="Main Category Name"
          :options="toRaw(allCategories)"
          option-label="name"
      />
    </div>
    <div class="sub-category">
      <Select
          v-model="createProductForm.subCategory"
          label="Sub Category Name"
          :options="subOptions"
          option-label="name"
          option-value="id"
      /> 
    </div>
    <div class="brand">
      <Select
          v-model="createProductForm.brand"
          label="Brand Name"
          :options="allBrands"
          option-label="name"
          option-value="id"
      />
    </div>
    <div class="logo">
      <UploadImage
          v-model="createProductForm.images"
          type="brand"
          name="Slider Images" 
          label="Slider Images"
          :required="true"
      />
    </div>
    <div class="variants">
      <Multiselect
          v-model="createProductForm.variantTypes"
          class="text-black"
          label="Variants"
          required
          placeholder="Select Variants"
          :options="toRaw(allVariants)"
          option-label="name"
          option-value="id"
      />
    </div> 
    <div class="addVariantsButton">
      <Button size="md" :disabled="!createProductForm.variantTypes" @click="variantQuantityPlusHandler">
        <template #icon>
          <Icon name="charm:plus"/>
        </template>
      </Button>
      <Button size="md" :disabled="!createProductForm.variantTypes" @click="variantQuantityMinusHandler">
        <template #icon>
          <Icon name="charm:minus"/>
        </template>
      </Button>
    </div>
    <div class="productVariants">
      <div v-for="(_, n) in productVariantsQuantity" :key="n" class="variantProductItem">
        <div class="variantValues">
          <!-- :label="createProductForm.variantTypes[i]?.name || ''" -->
          <Select
              v-for="(_, i) in createProductForm.variantTypes"
              :key="i"
              v-model="createProductForm.variantProducts[n].variantValues[i]"
              :label="createProductForm.variantTypes[i]?.name || ''"
              :options="toRaw(createProductForm.variantTypes[i].values)"
              option-label="name"
              option-value="id"
              />
        </div>

        <div class="variantPrice">
          <TextInput
              v-model="createProductForm.variantProducts[n].price"
              class="text-black"
              label="Price"
              placeholder="Price"
              :error-message="createProductFormErrors[`variantProducts.${n}.price`]"
              required
          />
        </div>
        <div class="isItFilterItem">
          <Checkbox
              v-model="createProductForm.variantProducts[n].isDefault"
              label="Is Default Product?"
          />
        </div>
      </div>
    </div>
    <div class="propertyList">
      <Select
          v-model="createProductForm.properties.propertyList"
          label="Property List"
          :options="toRaw(allPropertyList)"
          option-label="name"
          option-value="id"
         
      />
    </div>
    
    <div v-if="createProductForm.properties.propertyList.id" class="propertyTable" >
      <PropertyTable :properties="createProductForm.properties.propertyList"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from '~/domains/app/components/form/Select/index.vue'
import UploadImage from "~/domains/app/components/form/uploadImage/UploadImage.vue";
import TextInput from "~/domains/app/components/form/TextInput/index.vue";
import Multiselect from '~/domains/app/components/form/Multiselect/index.vue'
import Checkbox from '~/domains/app/components/form/Checkbox/index.vue'
import Button from "~/domains/app/components/form/Button/index.vue";
import PropertyTable from "~/domains/product/components/createProductModalForm/propertyTable/propertyTable.vue";

// product
import { createProductForm, createProductFormErrors } from "~/domains/product/composables/variables";

// category
import useShowCategory from '~/domains/category/composables/useShowCategory'
import { allCategories } from '~/domains/category/composables/variables'

// brand
import useShowBrand from '~/domains/brand/composables/useShowBrand'
import { allBrands } from "~/domains/brand/composables/variables";

// variants
import useShowVariant from '~/domains/variant/composables/useShowVariant'
import { allVariants } from "~/domains/variant/composables/variables";
import { createProductFormEntity, createVariantProductEntity } from "~/domains/product/entities/productEntity";

// Property List
import useShowProperty from '~/domains/property/composables/useShowProperty'
import { allPropertyList } from "~/domains/property/composables/variables";
import type { ICategory } from '~/domains/category/types/categoryTypes';
// import type { IVariant } from '~/domains/variant/types/variantTypes';


// hooks
const { onGetCategories } = useShowCategory()
const { onGetBrands } = useShowBrand()
const { onGetVariants } = useShowVariant()
const { onGetPropertyLists } = useShowProperty()

onMounted(() => {
  onGetCategories()
  onGetBrands()
  onGetVariants()
  onGetPropertyLists()
})
type SelectedVariantValuesType = {
  id: string,
  name: string
}

const selectedVariantValues = ref<SelectedVariantValuesType[][]>([])
const productVariantsQuantity = ref(0)
const copyFromProduct = ref()


const subOptions = computed(() => {
  if (createProductForm.value.mainCategory) {
    const index = allCategories.value.findIndex((mainItem: ICategory) => mainItem.id === createProductForm.value.mainCategory.id)
    if (index === -1) return []
    return allCategories.value[index].subs
  }
  return []
})

watch(createProductForm.value.variantTypes, () => {
  if (createProductForm.value.variantTypes.length > 0 && createProductForm.value.variantProducts.length === 0) variantQuantityPlusHandler()
  if (createProductForm.value.variantTypes.length === 0) variantQuantityResetHandler()
}, { deep: true })

watch(copyFromProduct, () => {
  if (copyFromProduct.value) {
    createProductForm.value = createProductFormEntity(toRaw(copyFromProduct.value))
  }
  productVariantsQuantity.value = createProductForm.value.variantProducts.length

  for (let i = 0; i < productVariantsQuantity.value; i++) {
    for (let j = 0; j < createProductForm.value.variantTypes.length; j++) {
      selectedVariantValues.value[i][j] = { id: createProductForm.value.variantProducts[i].variantValues[0].id, name: createProductForm.value.variantProducts[i].variantValues[0].name }
    }
  }
}, { deep: true })

const variantQuantityPlusHandler = () => {
  productVariantsQuantity.value++
  createProductForm.value.variantProducts.push(createVariantProductEntity({}))
}
const variantQuantityMinusHandler = () => {
  productVariantsQuantity.value--
  createProductForm.value.variantProducts.pop()
}
const variantQuantityResetHandler = () => {
  productVariantsQuantity.value = 0
  createProductForm.value.variantProducts = []
}




</script>

<style scoped>
.create-product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

}

.productVariants {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;

  .variantProductItem {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    border-radius: 0.5rem;
  }
}

button {
  width: fit-content;
  margin-bottom: auto;
  padding-inline: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:disabled {
  filter: brightness(170%);
}

.addVariantsButton {
  display: flex;
  gap: 1rem;

  button:first-of-type {
    margin-left: auto
  }
}
</style>