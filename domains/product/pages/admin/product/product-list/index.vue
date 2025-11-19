<template>
    <div class="product-list admin-page">
        <h2 class="page-title">Product List</h2>
        <div class="content">
          <Button class="!w-fit px-4" label="Create Product" color="primary" @click="isOpenModal = true"/>
        </div>
        <!-- <DataTable :value="products" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Products</span>
                    <Button icon="pi pi-refresh" rounded raised />
                </div>
            </template>
            <Column field="name" header="Name"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="w-24 rounded" />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="category" header="Category"></Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly />
                </template>
            </Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <template #footer> In total there are {{ products ? products.length : 0 }} products. </template>
        </DataTable> -->
    </div>
    <Modal v-model="isOpenModal" title="Create Product" width="sm">
        <CreateProductForm />
        <template #footer="{closeModal}">
            <Button severity="outline" label="Create" color="success" @click="closeModal"/>
            <Button label="Close" color="primary" @click="closeModal"/>
        </template>
    </Modal>
    
</template>

<script setup lang="ts">
import Button from '~/domains/app/components/form/Button/index.vue'
import Modal from '~/domains/app/components/overlay/modal/index.vue'
import CreateProductForm from '~/domains/product/components/createProductForm/index.vue'

const isOpenModal = ref(false)

const products = ref([])

// const ProductService = async ()=>{
//     return [
//         {name: 'Product 1', price: 100, category: 'Category 1', rating: 4.5, inventoryStatus: 'INSTOCK'},
//         {name: 'Product 2', price: 200, category: 'Category 2', rating: 4.5, inventoryStatus: 'INSTOCK'},
//         {name: 'Product 3', price: 300, category: 'Category 3', rating: 4.5, inventoryStatus: 'INSTOCK'},
//     ]
// }

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
</script>

<style scoped>

</style>