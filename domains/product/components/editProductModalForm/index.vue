<template>
  <div class="edit-product-form">
    <div class="name">
      <TextInput
        v-model="updateProductForm.name"
        class="text-black"
        label="Product Name"
        placeholder="Brand Name"
        :error-message="updateProductFormErrors['name']"
        required
      />
    </div>   
    <div class="main-category">
      <Select
          v-model="updateProductForm.mainCategory"
          label="Main Category Name"
          :options="toRaw(allCategories)"
          option-label="name"
      />
    </div>
    <div class="sub-category">
      <Select
          v-model="updateProductForm.subCategory"
          label="Sub Category Name"
          :options="subOptions"
          option-label="name"
          option-value="id"
      /> 
    </div>
    <div class="brand">
      <Select
          v-model="updateProductForm.brand"
          label="Brand Name"
          :options="allBrands"
          option-label="name"
          option-value="id"
      />
    </div>
    <div class="images">
      <UploadImage
          v-if="imageType === 'file'"
          v-model="updateProductForm.images"
          type="brand"
          name="Slider Images" 
          label="Slider Images"
          :required="true"
      />
      <ImageViewer v-else :images="updateProductForm.images" @delete-images="deleteImagesHandler" />
    </div>
    <div class="variants">
      <Multiselect
          v-model="updateProductForm.variantTypes"
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
      <Button size="md" :disabled="!updateProductForm.variantTypes" @click="variantQuantityPlusHandler">
        <template #icon>
          <Icon name="charm:plus"/>
        </template>
      </Button>
      <Button size="md" :disabled="!updateProductForm.variantTypes" @click="variantQuantityMinusHandler">
        <template #icon>
          <Icon name="charm:minus"/>
        </template>
      </Button>
    </div>
    <div class="productVariants">
      <div v-for="(_, n) in productVariantsQuantity" :key="n" class="variantProductItem">
        <div class="variantValues">
          <Select
              v-for="(_, i) in updateProductForm.variantTypes"
              :key="i"
              v-model="updateProductForm.variantProducts[n].variantValues[i]"
              :label="updateProductForm.variantTypes[i]?.name || ''"
              :options="toRaw(updateProductForm.variantTypes[i].values)"
              option-label="name"
              option-value="id"
          />
        </div>

        <div class="variantPrice">
          <TextInput
              v-model="updateProductForm.variantProducts[n].price"
              class="text-black"
              label="Price"
              placeholder="Price"
              :error-message="updateProductFormErrors[`variantProducts.${n}.price`]"
              required
          />
        </div>
        <div class="isItFilterItem">
          <Checkbox
              v-model="updateProductForm.variantProducts[n].isDefault"
              label="Is Default Product?"
              @click.stop="setIsDefaultProduct(n)"
          />
        </div>
      </div>
    </div>
    
    <div class="propertyList">
      <Select
          v-model="updateProductForm.properties.propertyList"
          label="Property List"
          :options="toRaw(allPropertyList)"
          option-label="name"
          option-value="id"
         
      />
    </div>
    <div v-if="updateProductForm.properties.propertyList.id" class="propertyTable" >
      <PropertyTable :properties="updateProductForm.properties.propertyList"/>
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
import { updateProductForm, updateProductFormErrors } from "~/domains/product/composables/variables";

// category
import useShowCategory from '~/domains/category/composables/useShowCategory'
import { allCategories } from '~/domains/category/composables/variables'
import type { ICategory } from '~/domains/category/types/categoryTypes';

// brand
import useShowBrand from '~/domains/brand/composables/useShowBrand'
import { allBrands } from "~/domains/brand/composables/variables";

// variants
import useShowVariant from '~/domains/variant/composables/useShowVariant'
import { allVariants } from "~/domains/variant/composables/variables";
import { createVariantProductEntity } from "~/domains/product/entities/productEntity";

// Property List
import useShowProperty from '~/domains/property/composables/useShowProperty'
import { allPropertyList } from "~/domains/property/composables/variables";


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

type ImageType = 'file' | 'url'
// vars
const imageType = ref<ImageType>('url')
const productVariantsQuantity = ref(updateProductForm.value.variantProducts.length)

const subOptions = computed(() => {
  if (updateProductForm.value.mainCategory) {
    const index = allCategories.value.findIndex((mainItem: ICategory) => mainItem.id === updateProductForm.value.mainCategory.id)
    if (index === -1) return []
    return allCategories.value[index].subs
  }
  return []
})

const deleteImagesHandler = () => {
  imageType.value = 'file'
  updateProductForm.value.images = []
}

watch(updateProductForm.value.variantTypes, () => {
  if (updateProductForm.value.variantTypes.length > 0 && updateProductForm.value.variantProducts.length === 0) variantQuantityPlusHandler()
  if (updateProductForm.value.variantTypes.length === 0) variantQuantityResetHandler()
}, { deep: true })

watch(() => updateProductForm.value.mainCategory, () => {
  updateProductForm.value.subCategory = {}
}, { deep: true })


const variantQuantityPlusHandler = () => {
  productVariantsQuantity.value++
  updateProductForm.value.variantProducts.push(createVariantProductEntity({}))
}
const variantQuantityMinusHandler = () => {
  productVariantsQuantity.value--
  updateProductForm.value.variantProducts.pop()
}
const variantQuantityResetHandler = () => {
  productVariantsQuantity.value = 0
  updateProductForm.value.variantProducts = []
}

const setIsDefaultProduct = (index: number) => {
  updateProductForm.value.variantProducts.forEach((variant, i) => {
    if (i !== index) {
      variant.isDefault = false
    }
  })

}

</script>

<style scoped>
.edit-product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
}

.variantProductItem {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
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