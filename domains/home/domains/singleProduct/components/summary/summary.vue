<script setup lang="ts">
import { singleProduct } from '~/domains/product/composables/variables';
import Breadcrumb from '~/domains/app/components/ui/breadcrumb/index.vue';
import VariantButtons from './variantButtons.vue';
import NumberInput from '~/domains/app/components/form/NumberInput/index.vue';
import Button from '~/domains/app/components/form/Button/index.vue';
import StarRating from '~/domains/app/components/ui/starRating/index.vue';
import { allCommentsByProduct } from '~/domains/comment/composables/variables';

const selectedVariants = ref<Record<string, string>>({});
const variantProductData = ref();
const quantity = ref(1);

const getVariantData = () => {
    return singleProduct.value.variantProducts.map((variant) => {
        const isMatch = variant.variantValues.every((variantValue) => {
            console.log(variantValue)
            return selectedVariants.value[variantValue.typeName] === variantValue.name;

        })
        if (isMatch) {
            variantProductData.value = variant;
        }
    })
}

const breadcrumbItems = computed(() => {
    return [
        { label: 'Home', link: '/' },
        { label: 'Products', link: '#' },
        { label: singleProduct.value.name, link: '#' }
    ]
})

const rating = computed(() => {
    return allCommentsByProduct.value.reduce((acc, comment) => acc + comment.rating, 0) / allCommentsByProduct.value.length;
})

watch(selectedVariants, () => {
    getVariantData();
}, { deep: true, immediate: true })
</script>

<template>
    <div class="summary-container"> 
        <div class="summary-breadcrumb">
            <Breadcrumb :items="breadcrumbItems"  class="breadcrumb"/>
            <StarRating :rating="rating" />
        </div>

        <div class="summary-header">
            <h2 class="summary-title">{{ singleProduct.name }}</h2>
            <div class="summary-brand">
                <NuxtLink to="/" class="summary-brand-link">
                    <NuxtImg :src="singleProduct.brand.logo" :alt="singleProduct.brand.name" class="summary-brand-logo" />
                </NuxtLink>
            </div>
        </div>
        <div class="summary-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, voluptate iusto! Harum aperiam quaerat laudantium minus rerum modi quia sunt labore. Deserunt rerum consectetur voluptatibus earum aspernatur! Enim cumque tempore at reiciendis?</p>
        </div>
        <div class="summary-price">
            <span class="summary-price-value">${{ variantProductData?.price }}</span>
        </div>
        <VariantButtons v-model:selected-variants="selectedVariants" />
        <div class="quantity-and-add-to-cart">
            <NumberInput v-model="quantity" />
            <Button class="add-to-cart" color="success" severity="gradient">
                <template #icon>
                    <Icon name="solar:bag-outline" class="icon" />
                </template>
                Add to Cart
            </Button>
        </div>
        <div class="additional-buttons">
            <Button class="add-to-wishlist" color="primary" severity="gradient">
                <template #icon>
                    <Icon name="solar:heart-outline" class="icon" />
                    </template>
                </Button>
                <Button class="add-to-compare" color="primary" severity="gradient">
                    <template #icon>
                        <Icon name="ion:git-compare-outline" class="icon" />
                    </template>
                </Button>
            </div>
    </div>
</template>

<style scoped>
.summary-container {
    width: 100%;
    height: 100%;
    padding-inline: 1.25rem;


    .summary-breadcrumb {

        .breadcrumb {
            font-size: .875rem;
        }
    }

    .summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            font-size: 2.1rem;
        }

        .summary-brand {
            height: 120px;
            max-width: 120px;

            img {
                height: 100%;
                width: auto;
                object-fit: contain;
            }
        }

    }

    .summary-description {
        margin-block: 0.5rem;
        font-size: 13px;
    }

    .summary-price {
        margin-block: 1rem;

        .summary-price-value {
            font-size: 1.5rem;
            font-weight: 600;
        }
    }

    .quantity-and-add-to-cart {
        margin-block: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        .add-to-cart {
            width: fit-content;
            padding-inline: 2rem;
        }
    }

    .additional-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;

        .add-to-wishlist {
            width: fit-content;
            padding-inline: 1rem;
            white-space: nowrap;
        }

        .add-to-compare {
            width: fit-content;
            padding-inline: 1rem;
            white-space: nowrap;
        }
    }
}
</style>