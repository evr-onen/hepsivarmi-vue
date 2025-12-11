<script setup lang="ts">
import { allWishlistsByUser } from '~/domains/wishlist/composables/variables'
import { allProducts } from '~/domains/product/composables/variables'
import useShowProduct from '~/domains/product/composables/useShowProduct'
import ProductCard from '~/domains/home/components/productCard/productCard.vue'
const { onGetProducts } = useShowProduct()

// init
if (allProducts.value.length === 0) {
    await onGetProducts()
}
const wishlistProducts = computed(() => {
    return allProducts.value.filter(product => {
        return allWishlistsByUser.value.some(wishlist => wishlist.product_id === product.id)
    })
})

</script>

<template>
    <div class="wishlist-container">
            <div class="wishlist-products">
                <ProductCard v-for="wishlistProduct in wishlistProducts" :key="wishlistProduct.id" :product-data="wishlistProduct" :is-in-wishlist="true" />
            </div>
    </div>
</template>

<style scoped>
.wishlist-container {
    width: 100%;
    height: 100%;

    .wishlist-products {
        padding: 3rem;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 3rem;
        height: 60vh;
    }
}
</style>