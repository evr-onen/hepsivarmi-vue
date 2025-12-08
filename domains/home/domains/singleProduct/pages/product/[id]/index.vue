<template>
    <div class="single-product-page">
        <ClientOnly>
            <div v-if="singleProduct.id && singleProduct.images && singleProduct.images.length > 0" class="product-container">
                <div class="product-image">
                    <ProductSlider :images="singleProduct.images" />
                </div>
                <div class="product-summary">
                    <Summary />
                </div>
            </div>
            <div class="tabs">
                <Tabs />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { singleProduct } from '~/domains/product/composables/variables';
import useShowProduct from '~/domains/product/composables/useShowProduct';

// components
import ProductSlider from '~/domains/home/domains/singleProduct/components/productSlider/productSlider.vue';
import Summary from '~/domains/home/domains/singleProduct/components/summary/summary.vue';
import Tabs from '~/domains/home/domains/singleProduct/components/tabs/tabs.vue';

// hooks 
const route = useRoute()
const { onGetProduct } = useShowProduct();

const productId = route.params.id as string

// init
if (productId) {
    await onGetProduct(productId);
}
</script>

<style scoped>
.single-product-page {
    width: 100%;
    max-width: 1240px;
    margin-inline: auto;
    padding: 0 1.25rem;
    padding-top: 2.25rem;
    display: flex;
    flex-direction: column;

    .product-container {
        height: 32.1875rem;
        display: flex;

        .product-image {
            flex: 4;
            background-color: #f0f0f0;
            height: 100%;
        }

        .product-summary {
            flex: 5;
            background-color: #aafb7f;
            height: 100%;
        }

    }

    .tabs {
        width: 100%;
        background-color: #efc4c4
    }
}
</style>