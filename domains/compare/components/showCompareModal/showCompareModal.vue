<script setup lang="ts">
import { compareProducts } from '~/domains/compare/composables/variables';
import ProductTable from './productTable.vue';

</script>

<template>
    <div class="compare-modal-container">
        <div class="compare-modal-products">
            <div class="product-titles">
                <!-- <div class="image"></div>
                <div class="title">Name</div>
                <div class="title">Category</div>
                <div class="title">Price</div>
                <div class="title">Variants</div>
                <div class="title" v-for></div> -->
            </div>
            <div class="content">
                <ProductTable v-for="compareProduct in compareProducts" :key="compareProduct.id" :compare-product="compareProduct" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.compare-modal-container {


    .compare-modal-products {
        display: flex;

        .product-titles {
            display: flex;
            flex-direction: column;
        }

        .content {
            display: flex;
        }
    }
}
</style>