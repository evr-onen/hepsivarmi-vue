<script setup lang="ts">
import VariantButtons from '~/domains/home/domains/singleProduct/components/summary/variantButtons.vue';
import type { IProduct } from '~/domains/product/types/productTypes';

interface IProductTable {
    compareProduct: IProduct;
}
const props = defineProps<IProductTable>()

const selectedVariants = ref<Record<string, string>>({});
const variantProductData = ref();





const getVariantData = () => {
    return singleProduct.value.variantProducts.map((variant) => {
        const isMatch = variant.variantValues.every((variantValue) => {
            return selectedVariants.value[variantValue.typeName] === variantValue.name;

        })
        if (isMatch) {
            variantProductData.value = variant;
        }
    })
}

watch(selectedVariants, () => {
    getVariantData();
}, { deep: true, immediate: true })

</script>

<template>
   <div class="product-table-container">
        <div class="image">
            <NuxtImg :src="compareProduct.images[0]" :alt="compareProduct.name"  height="400"/>
        </div>
        <div class="category">
            {{ compareProduct.subCategory.name }}
        </div>
        <div class="name">
            <h3 class="name">{{ compareProduct.name }}</h3>
        </div>
        <div class="price">
            ${{ variantProductData?.price }}
        </div>
        <div class="variants">
            <VariantButtons v-model:selected-variants="selectedVariants" direction="vertical" />
        </div>
        <div v-for="(prop, index) in compareProduct.properties.productPropertyValues" :key="index" class="prop" >
            <p>{{ compareProduct.properties.propertyList.props[index].name }}:</p>
            <p>{{ prop.name }}</p>
        </div>
    </div>
</template>

<style scoped>
.product-table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 400px;

    .category {
        color: rgb(240, 66, 66);
        text-transform: uppercase;
        font-weight: 500;
    }

    .name {
        font-weight: 500;
        font-size: 1.5rem;
    }

    .price {
        font-weight: 500;
        font-size: 1.25rem;
    }

    .prop {
        width: 100%;
        display: flex;

        p:first-of-type {
            flex: 1;
            font-weight: 500;
        }

        p:last-of-type {
            flex: 1;
        }
    }
}
</style>