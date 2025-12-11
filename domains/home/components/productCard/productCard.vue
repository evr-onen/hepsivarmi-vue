<script setup lang="ts">
import type { IProduct } from '~/domains/product/types/productTypes';
import useCreateWishlist from '~/domains/wishlist/composables/useCreateWishlist';
import useDeleteWishlist from '~/domains/wishlist/composables/useDeleteWishlist';
interface IProductCardProps {
    productData: IProduct;
    isInWishlist: boolean;
}

const props = defineProps<IProductCardProps>();

// hooks
const { onCreateWishlist } = useCreateWishlist();
const { onDeleteWishlist } = useDeleteWishlist();



// handlers
const addRemoveWishlistToggleHandler = async () => {
    if (props.isInWishlist) {
        await onDeleteWishlist(props.productData.id);
    } else {
        await onCreateWishlist(props.productData.id);
    }
}

</script>

<template>
    <div class="product-card-container">
        <div class="product-card-overlay">
            <div class="hover-content-container">
                <p class="product-description">Placerat tempor dolor eu leo ullamcorper et magnis habitant ultrices consectetur</p>
                <div class="buttons">
                    <div @click.stop="addRemoveWishlistToggleHandler">
                        <Icon v-if="!isInWishlist" name="solar:heart-linear" class="icon" />
                        <Icon v-else name="solar:heart-bold" class="icon-filled" />
                    </div>
                    <div>
                        <Icon name="solar:bag-outline" class="icon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="image-container">
            <NuxtImg :src="productData.images[0]" class="rounded" />
        </div>

        <div class="content-container">
            <h3 class="product-name">{{ productData.name }}</h3>
            <p class="product-category">{{ productData.subCategory.name }}</p>
            <p class="product-price">${{ productData.variantProducts[0].price }}</p>
        </div>
        
        
    </div>
</template>

<style lang="scss" scoped>
.product-card-container {
    width: 205px;
    height: 325px;
    display: flex;
    position: relative;
    z-index: 1;
    top: 0;
    flex-direction: column;
    align-items: center;
    justify-content: justify-between;
    transition: top 0.3s ease-in-out;

    .product-card-overlay {
        width: 205px;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: flex-end;

    }

    .image-container {
        position: relative;
        z-index: 11;
        width: 100%;
        height: 235px;
        flex-shrink: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content-container {
        position: relative;
        z-index: 11;
        margin-top: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .product-name {
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            color: var(--text-primary);
        }

        .product-category {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
    }

    .hover-content-container {
        position: relative;
        padding: 1rem;
        height: 0;
        opacity: 0;
        visibility: hidden;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .product-description {
            font-size: .875rem;
            font-weight: 400;
            text-align: justify;
            color: #767676;
        }

        .buttons {

            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            >div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 1;
                padding-inline: 1rem;

                .icon {
                    width: 24px;
                    height: 24px;
                    color: #333333;
                    cursor: pointer;
                    transition: 200ms;
                }

                .icon-filled {
                    color: rgb(230, 82, 37);
                }

                &:hover {
                    .icon {
                        color: #767676;
                    }
                }
            }

            >div:first-of-type {
                border-right: 1px solid #767676;
            }


        }
    }

    &:hover {
        z-index: 9999;
        top: -5px;

        .product-card-overlay {
            z-index: 2;
            background-color: #fff;
            width: 235px;
            height: 462px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .hover-content-container {
            height: auto;
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>