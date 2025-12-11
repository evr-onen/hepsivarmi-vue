<script setup lang="ts">
import { singleProduct } from '~/domains/product/composables/variables';
</script>

<template>
    <div class="descriptions-container">
        <div class="descriptions-list">
            <div v-for="(prop, index) in singleProduct.properties.propertyList.props" :key="index"  class="row">
                <div class="description-name">
                    {{ prop.name }}
                </div>
                <div class="description-value">
                    {{ singleProduct.properties.productPropertyValues[index].name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.descriptions-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;


    .descriptions-list {
        width: 500px;
        display: flex;
        flex-direction: column;
        border: 1px solid #ddd;

        .row {
            display: flex;
            flex-direction: row;
            gap: 1rem;

            .description-name {
                flex: 1;
            }

            .description-value {
                flex: 1;
            }

        }

        .row:nth-of-type(even) {
            background-color: #fff;
        }

        .row:nth-of-type(odd) {
            background-color: #f0f0f0;
        }
    }
}
</style>