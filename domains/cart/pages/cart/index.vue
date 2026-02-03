<template>
    <div class="cart-page">
        <div class="cart-header">
            <h1 class="cart-title">Your Cart ({{ allCartsByUser.length }} {{ allCartsByUser.length === 1 ? 'item' : 'items' }})</h1>
        </div>

        <div v-if="allCartsByUser.length === 0" class="empty-cart">
            <Icon name="solar:bag-outline" class="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to get started</p>
            <Button color="primary" severity="filled" @click="navigateTo('/')">
                Continue Shopping
            </Button>
        </div>

        <div v-else class="cart-content">
            <div class="cart-items-section">
                <div class="cart-table-header">
                    <div class="header-item">Item</div>
                    <div class="header-price">Price</div>
                    <div class="header-quantity">Quantity</div>
                    <div class="header-total">Total</div>
                </div>

                <div class="cart-items">
                    <div v-for="cartItem in allCartsByUser" :key="cartItem.id" class="cart-item-row">
                        <div class="cart-item">
                            <div class="item-image">
                                <NuxtImg 
                                    :src="getProductImage(cartItem.product_id)" 
                                    alt="Product image"
                                    class="product-image"
                                />
                            </div>
                            
                            <div class="item-details">
                                <h3 class="product-name">{{ getProductName(cartItem.product_id) }}</h3>
                                <p v-if="cartItem.variant" class="product-variant">
                                    {{ cartItem.variant.typeName }}: {{ cartItem.variant.value }}
                                </p>
                            </div>
                        </div>

                        <div class="item-price">
                            <span class="price">${{ formatPrice(cartItem.price) }}</span>
                        </div>

                        <div class="item-quantity">
                            <div class="quantity-input-wrapper">
                                <button 
                                    class="quantity-btn minus" 
                                    :disabled="cartItem.quantity <= 1"
                                    @click="decreaseQuantity(cartItem)"
                                >
                                    <Icon name="charm:minus" />
                                </button>
                                <input 
                                    type="number" 
                                    class="quantity-input"
                                    min="1"
                                    :value="cartItem.quantity" 
                                    @input="updateQuantityInput(cartItem, $event)"
                                >
                                <button 
                                    class="quantity-btn plus" 
                                    @click="increaseQuantity(cartItem)"
                                >
                                    <Icon name="charm:plus" />
                                </button>
                            </div>
                        </div>

                        <div class="item-total">
                            <span class="total-price">${{ formatPrice(cartItem.price * cartItem.quantity) }}</span>
                            <button 
                                class="remove-btn" 
                                aria-label="Remove item"
                                @click="deleteCartItem(cartItem.id)"
                            >
                                <Icon name="solar:close-circle-outline" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cart-summary">
                <div class="summary-card">
                    <h2 class="summary-title">Order Summary</h2>
                    
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                    </div>
                    
                    <div class="summary-row">
                        <span>Sales Tax</span>
                        <span>${{ salesTax.toFixed(2) }}</span>
                    </div>
                    
                    <div class="summary-row coupon-row">
                        <span>Coupon Code</span>
                        <a href="#" class="add-coupon-link">Add Coupon</a>
                    </div>
                    
                    <div class="summary-row grand-total">
                        <span>Grand Total</span>
                        <span>${{ grandTotal.toFixed(2) }}</span>
                    </div>

                    <div class="free-shipping">
                        <Icon name="solar:truck-outline" class="truck-icon" />
                        <span>Congrats, you're eligible for Free Shipping</span>
                    </div>

                    <Button 
                        color="primary" 
                        severity="filled"
                        class="checkout-button"
                        @click="checkout"
                    >
                        Check out
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { allCartsByUser, cartQuantityUpdateForm, cartDeleteForm } from '~/domains/cart/composables/variables';
import useShowCart from '~/domains/cart/composables/useShowCart';
import useEditCart from '~/domains/cart/composables/useEditCart';
import useDeleteCart from '~/domains/cart/composables/useDeleteCart';
import useAuthStore from '~/domains/auth/stores/useAuthStore';
import { allProducts } from '~/domains/product/composables/variables';
import useShowProduct from '~/domains/product/composables/useShowProduct';
import type { ICart } from '~/domains/cart/types/cartTypes';

definePageMeta({
    layout: 'home'
})

const { user } = useAuthStore();
const { onGetCartsByUser } = useShowCart();
const { onUpdateCart } = useEditCart();
const { onDeleteCart } = useDeleteCart();
const { onGetProducts } = useShowProduct();

// Initialize
onMounted(async () => {
    if (user.id) {
        await onGetCartsByUser();
        await onGetProducts();
    }
})

// Computed
const subtotal = computed(() => {
    return allCartsByUser.value.reduce((sum, cart) => {
        const price = typeof cart.price === 'string' ? parseFloat(cart.price) : cart.price;
        const quantity = typeof cart.quantity === 'string' ? parseFloat(cart.quantity) : cart.quantity;
        return sum + (price * quantity);
    }, 0);
});

const salesTax = computed(() => {
    // Calculate 10% tax
    return subtotal.value * 0.1;
});

const grandTotal = computed(() => {
    return subtotal.value + salesTax.value;
});

// Methods
const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
};

const getProductName = (productId: string): string => {
    const product = allProducts.value.find(p => p.id === productId);
    return product?.name || 'Product';
};

const getProductImage = (productId: string): string => {
    const product = allProducts.value.find(p => p.id === productId);
    return product?.images?.[0] || '/images/placeholder.png';
};

const decreaseQuantity = async (cartItem: ICart) => {
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
        await updateCartQuantity(cartItem);
    }
};

const increaseQuantity = async (cartItem: ICart) => {
    cartItem.quantity++;
    await updateCartQuantity(cartItem);
};

const updateQuantityInput = async (cartItem: ICart, event: Event) => {
    const target = event.target as HTMLInputElement;
    const newQuantity = parseInt(target.value) || 1;
    if (newQuantity >= 1) {
        cartItem.quantity = newQuantity;
        await updateCartQuantity(cartItem);
    }
};

const updateCartQuantity = async (cartItem: ICart) => {
    cartQuantityUpdateForm.value.id = cartItem.id;
    cartQuantityUpdateForm.value.quantity = cartItem.quantity;
    await onUpdateCart();
};

const deleteCartItem = async (cartId: string) => {
    cartDeleteForm.value.id = cartId;
    await onDeleteCart();
};

const checkout = () => {
    // TODO: Implement checkout logic
    console.log('Checkout');
};
</script>

<style scoped lang="scss">
.cart-page {
    width: 100%;
    max-width: 1240px;
    margin-inline: auto;
    padding: 0 1.25rem;
    padding-top: 2.25rem;
    padding-bottom: 4rem;

    .cart-header {
        margin-bottom: 2rem;

        .cart-title {
            font-size: 1.75rem;
            font-weight: 600;
            color: #333;
        }
    }

    .empty-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;

        .empty-icon {
            font-size: 5rem;
            color: var(--color-text-secondary);
            margin-bottom: 1.5rem;
        }

        h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        p {
            color: var(--color-text-secondary);
            margin-bottom: 2rem;
        }
    }

    .cart-content {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 2rem;
        align-items: start;

        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
        }

        .cart-items-section {
            .cart-table-header {
                display: grid;
                grid-template-columns: 2fr 1fr 1.5fr 1fr;
                gap: 1rem;
                padding: 1rem 0;
                border-bottom: 2px solid #E0E0E0;
                font-weight: 600;
                font-size: 0.875rem;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.5px;

                @media (max-width: 768px) {
                    display: none;
                }
            }

            .cart-items {
                display: flex;
                flex-direction: column;
                gap: 0;

                .cart-item-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1.5fr 1fr;
                    gap: 1rem;
                    padding: 1.5rem 0;
                    border-bottom: 1px solid #E0E0E0;
                    align-items: center;

                    @media (max-width: 768px) {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                        padding: 1.5rem 0;
                    }

                    .cart-item {
                        display: flex;
                        gap: 1rem;
                        align-items: center;

                        .item-image {
                            width: 100px;
                            height: 100px;
                            flex-shrink: 0;
                            overflow: hidden;
                            border-radius: 0.5rem;
                            background: #f5f5f5;

                            .product-image {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }

                        .item-details {
                            flex: 1;

                            .product-name {
                                font-size: 1rem;
                                font-weight: 600;
                                margin-bottom: 0.25rem;
                                color: #333;
                            }

                            .product-variant {
                                font-size: 0.875rem;
                                color: #666;
                                margin: 0;
                            }
                        }
                    }

                    .item-price {
                        text-align: left;

                        @media (max-width: 768px) {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        .price {
                            font-size: 1rem;
                            font-weight: 500;
                            color: #333;
                        }
                    }

                    .item-quantity {
                        .quantity-input-wrapper {
                            display: flex;
                            align-items: center;
                            gap: 0;
                            width: fit-content;
                            border: 1px solid #E0E0E0;
                            border-radius: 0.25rem;
                            overflow: hidden;

                            .quantity-btn {
                                width: 32px;
                                height: 32px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: #fff;
                                border: none;
                                cursor: pointer;
                                transition: background 0.2s;
                                color: #333;

                                &:hover:not(:disabled) {
                                    background: #f5f5f5;
                                }

                                &:disabled {
                                    opacity: 0.5;
                                    cursor: not-allowed;
                                }

                                .icon {
                                    width: 16px;
                                    height: 16px;
                                }
                            }

                            .quantity-input {
                                width: 50px;
                                height: 32px;
                                border: none;
                                border-left: 1px solid #E0E0E0;
                                border-right: 1px solid #E0E0E0;
                                text-align: center;
                                font-size: 0.875rem;
                                outline: none;

                                &::-webkit-inner-spin-button,
                                &::-webkit-outer-spin-button {
                                    -webkit-appearance: none;
                                    appearance: none;
                                    margin: 0;
                                }

                                &[type=number] {
                                    -moz-appearance: textfield;
                                    appearance: textfield;
                                }
                            }
                        }
                    }

                    .item-total {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 1rem;

                        @media (max-width: 768px) {
                            justify-content: flex-end;
                        }

                        .total-price {
                            font-size: 1rem;
                            font-weight: 600;
                            color: #333;
                        }

                        .remove-btn {
                            background: none;
                            border: none;
                            cursor: pointer;
                            color: #999;
                            padding: 0.25rem;
                            display: flex;
                            align-items: center;
                            transition: color 0.2s;

                            &:hover {
                                color: #e74c3c;
                            }

                            .icon {
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
            }
        }

        .cart-summary {
            .summary-card {
                background: #fff;
                border: 1px solid #E0E0E0;
                border-radius: 0.5rem;
                padding: 1.5rem;
                position: sticky;
                top: 2rem;

                .summary-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: #333;
                }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.75rem 0;
                    font-size: 0.875rem;
                    color: #666;

                    &.coupon-row {
                        border-bottom: none;
                        padding-bottom: 0.5rem;

                        .add-coupon-link {
                            color: #83B735;
                            text-decoration: none;
                            font-weight: 500;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }

                    &.grand-total {
                        font-size: 1.125rem;
                        font-weight: 700;
                        margin-top: 0.5rem;
                        padding-top: 1rem;
                        border-top: 2px solid #E0E0E0;
                        color: #333;
                    }
                }

                .free-shipping {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background: #f0f9ff;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    color: #83B735;

                    .truck-icon {
                        width: 18px;
                        height: 18px;
                    }
                }

                .checkout-button {
                    width: 100%;
                    margin-top: 1.5rem;
                    padding: 0.875rem;
                    font-weight: 600;
                    text-transform: none;
                }
            }
        }
    }
}
</style>
