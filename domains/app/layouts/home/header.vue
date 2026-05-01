<template>
    <div class="header">
        <div class="header-top">
            <div class="content">
                <div class="textMessage">
                    <p>
                        FREE SHIPPING FOR ALL ORDERS OF $150
                    </p>
                </div>
                <div class="socialLinks">
                        <Icon name="mdi:facebook" class="icon"/>
                        <Icon name="ri:twitter-x-line" class="icon"/>
                        <Icon name="mdi:instagram" class="icon"/>
                        <Icon name="mdi:youtube" class="icon"/>
                </div>
                <div class="newsletter">
                        <Icon name="mdi:envelope-outline" class="icon"/>
                        <p>Newsletter</p>
                </div>
                <div class="contactUs">
                        <p>Contact Us</p>
                </div>
                <div class="faqs">
                    <p>FAQs</p>
                </div>
            </div>
            
        </div>
        <div class="header-mid">
            <div class="content">
                <div class="logo">
                    <NuxtLink to="/" class="logo-link">
                    <p>VueCommerce</p>
                    </NuxtLink>
                </div>
                <div class="search-area">
                    
                    <Dropdown class="w-full" :click-outside="true" >
                        <template #default="{ openPanel, closePanel }: { openPanel: () => void, closePanel: () => void }">
                            <div class="search">
                                <input type="text" placeholder="Search for products" @keyup="(e) => searchProductsHandler(e, openPanel, closePanel)">
                                <Icon name="solar:minimalistic-magnifer-linear" class="icon" />
                            </div>
                        </template>
                        <template #panelContent="{ closePanel }: { closePanel: () => void }">
                            <div v-if="searchedProducts.length > 0" class="search-panel-content" >
                                <div v-for="product in searchedProducts" :key="product.id" class="product-item" @click="searchProductSelectHandler(product, closePanel)">
                                    <div class="name">
                                        {{ product.name }}
                                    </div>
                                    <div class="categoy">
                                        {{ product.subCategory.name }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div class="buttons">
                    <Dropdown class="w-full" :click-outside="true">
                        <template #default="{ openPanel }: { openPanel: () => void }">
                            <div class="profile" @click="openPanel">
                                <Icon name="solar:user-outline" class="profile-icon" />
                            </div>
                        </template>
                        <template #panelContent="{ closePanel }: { closePanel: () => void }">
                            <div v-if="isLoggedIn" class="profile-panel-content">
                                <p>{{ authStore.user.name }}, wellcome back!</p>
                                <p @click="goToAdminPanelHandler(closePanel)"> Admin Panel</p>
                                <p @click="closePanel">My Account</p>
                                <p @click="closePanel">My Orders</p>
                                <p @click="logoutHandler(closePanel)">Logout</p>
                            </div>
                            <div v-else class="profile-panel-content">
                                <p @click="() => navigateTo('/auth/login')">Login</p>
                                <p @click="() => navigateTo('/auth/register')">Register</p>
                            </div>
                        </template>
                    </Dropdown>
                    <!-- <div class="profile">
                        <Icon name="solar:user-outline" class="profile-icon" />
                    </div> -->
                    <div class="heart" :class="{ 'disabled': wishlistCount === 0 }" @click.stop="wishlistModal = true" >
                        <div class="icon">
                            <Icon name="solar:heart-linear" class="icon" />
                            <p v-if="wishlistCount > 0">{{ wishlistCount }}</p>
                        </div>
                    </div>
                    <div class="compare" :class="{ 'disabled': compareProducts.length === 0 }" @click.stop="compareModal = true">
                        <div class="icon">
                            <Icon name="ion:git-compare-outline" class="icon" />
                            <p v-if="compareProducts.length > 0">{{ compareProducts.length }}</p>
                        </div>
                    </div>
                    <ClientOnly>
                        <div class="cart" :class="{ 'disabled': allCartsByUser.length === 0 }" @click.stop="goToCartHandler">
                            <div class="icon">
                                <Icon name="solar:bag-outline" class="icon" />
                                <p v-if="allCartsByUser.length > 0">{{ allCartsByUser.length }}</p>
                            </div>
                            <p class="totalPrice">${{ totalPrice }}</p>
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </div>
        <div class="header-bottom">
        </div>
        <Modal v-model="wishlistModal" title="Wishlist Products" width="auto" class="wishlist-modal">
            <ShowModalWishlist />
        </Modal>
        <Modal v-model="compareModal" title="Compare Products" width="auto" class="compare-modal">
            <ShowCompareModal />
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Dropdown from '~/domains/app/components/form/Dropdown/index.vue'
import { allWishlistsByUser } from '~/domains/wishlist/composables/variables'
import useShowWishlist from '~/domains/wishlist/composables/useShowWishlist';
import useAuthStore from '~/domains/auth/stores/useAuthStore';
import ShowModalWishlist from '~/domains/wishlist/components/showModalWishlist/showModalWishlist.vue';
import useShowCompare from '~/domains/compare/composables/useShowCompare';
import { compareProducts } from '~/domains/compare/composables/variables';
import ShowCompareModal from '~/domains/compare/components/showCompareModal/showCompareModal.vue';
import { allCartsByUser } from '~/domains/cart/composables/variables';
import useShowCart from '~/domains/cart/composables/useShowCart';
import useShowProduct from '~/domains/product/composables/useShowProduct';
import { searchedProducts } from '~/domains/product/composables/variables';


const { onGetCompareProducts } = useShowCompare();
const { onGetCartsByUser } = useShowCart();
const authStore = useAuthStore();
const { onGetWishlistsByUser } = useShowWishlist();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const { onSearchProducts } = useShowProduct();
if (authStore.user.id) {
    onGetWishlistsByUser()
    onGetCompareProducts()
    onGetCartsByUser()
}

const wishlistCount = computed(() => allWishlistsByUser.value.length);
const wishlistModal = ref(false);
const compareModal = ref(false);

const totalPrice = computed(() => {
    return allCartsByUser.value.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
});

// Handlers
const goToCartHandler = () => {
    navigateTo('/cart');
};

const goToAdminPanelHandler = (closePanel: () => void) => {
    closePanel();
    nextTick(() => {
        navigateTo('/admin/dashboard');
    });
    
}

const logoutHandler = async (closePanel: () => void) => {
    closePanel();
    await authStore.onLogout();
    nextTick(() => {
        navigateTo('/');
    });  
}

const searchProductsHandler = async (e: Event, openPanel: () => void, closePanel: () => void) => {
    const searchValue = (e.target as HTMLInputElement).value;

    if (searchValue.length > 0) {
        await onSearchProducts(searchValue);
        openPanel();
    } else {
        closePanel();
    }
    console.log(searchedProducts.value);
}

const searchProductSelectHandler = (product: IProduct, closePanel: () => void) => {
    navigateTo(`/product/${product.id}`);
    closePanel();
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lato', sans-serif;

    .header-top {
        width: 100%;
        height: 2.625rem;
        background-color: #83B735;
        font-size: .75rem;
        font-weight: 400;

        .content {
            width: 1240px;
            height: 100%;
            padding: 0 1.25rem;
            margin-inline: auto;
            display: flex;
            align-items: center;

            .textMessage {
                font-size: .75rem;
                font-weight: 600;
                color: #fff;
                margin-right: auto;
            }

            .socialLinks {
                display: flex;
                align-items: center;
                height: 100%;
                gap: 0.5rem;
                border-right: .5px solid #ffffffa2;
                padding-right: 1.5rem;

                .icon {
                    color: #fff;
                    height: 1rem;
                    width: 1rem;
                    cursor: pointer;
                    transition: 200ms;
                    color: #fff;

                    &:hover {
                        color: #ffffff99;
                    }
                }
            }

            .newsletter {
                display: flex;
                align-items: center;
                height: 100%;
                display: flex;
                gap: 0.5rem;
                border-right: .5px solid #ffffffa2;
                padding-inline: 1.5rem;
                cursor: pointer;
                transition: 200ms;
                color: #fff;
                font-size: .75rem;
                font-weight: 400;

                &:hover {
                    color: #ffffff99;
                }

                .icon {
                    height: 1.5rem;
                    width: 1.25rem;
                }

                p {
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    font-weight: 400;
                }
            }

            .contactUs {
                display: flex;
                align-items: center;
                height: 100%;
                display: flex;
                gap: 0.5rem;
                border-right: .5px solid #ffffffa2;
                padding-inline: 1.5rem;
                cursor: pointer;
                transition: 200ms;
                color: #fff;

                &:hover {
                    color: #ffffff99;
                }

                p {
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    font-weight: 400;
                }
            }

            .faqs {
                display: flex;
                align-items: center;
                height: 100%;
                display: flex;
                gap: 0.5rem;
                border-right: .5px solid #ffffffa2;
                padding-inline: 1.5rem;
                cursor: pointer;
                transition: 200ms;
                color: #fff;

                &:hover {
                    color: #ffffff99;
                }

                p {
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    font-weight: 400;
                }

            }

        }
    }

    .header-mid {
        width: 100%;
        height: 6.5625rem;
        background-color: #fff;

        .content {
            width: 1240px;
            height: 100%;
            padding: 0 1.25rem;
            margin-inline: auto;
            display: flex;
            align-items: center;

            .logo {
                font-family: "Tangerine", cursive;
                font-weight: 700;
                font-size: 3.5rem;
                color: #000;
                height: 6rem;
                display: flex;
                align-items: center;
                margin-right: auto;
            }

            .search-area {
                flex: 1;
                max-width: 600px;
                height: 3rem;
                border: 1px solid #E0E0E0;
                border-radius: 0;
                background-color: #fff;
                display: flex;
                align-items: center;

                .search {
                    flex: 1;
                    max-width: 600px;
                    height: 3rem;
                    border: 1px solid #E0E0E0;
                    border-radius: 0;
                    background-color: #fff;
                    display: flex;
                    align-items: center;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        padding: 0 1.25rem;
                        background-color: transparent;
                        font-size: 0.875rem;
                        color: #333;
                        font-weight: 400;

                        &::placeholder {
                            color: #9E9E9E;
                            font-size: 0.875rem;
                        }

                        &:focus {
                            outline: none;
                        }



                    }

                    .icon {
                        height: 1.75rem;
                        width: 1.75rem;
                        color: #585858cc;
                        margin-right: 1rem;
                    }



                }

            }


            .buttons {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                margin-left: 1.5rem;


                >div {
                    cursor: pointer;
                    transition: 200ms;
                    color: #333333cc;


                    &:hover {
                        color: #33333399;
                    }
                }

                .disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                    pointer-events: none;
                }

                .cart,
                .heart,
                .compare {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 200ms;

                    .icon {
                        position: relative;

                        .icon {
                            color: #333333cc !important;

                            &:hover {
                                color: #33333399 !important;
                            }
                        }

                        p {
                            position: absolute;
                            top: -0.5rem;
                            right: -0.5rem;
                            background-color: red;
                            color: #fff !important;
                            height: 1rem;
                            width: 1rem;
                            padding: 0.25rem;
                            display: flex;
                            flex-shrink: 0;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            font-size: 0.7rem;
                            font-weight: 300;
                        }
                    }

                }

                .totalPrice {
                    margin-left: 0.5rem;
                    font-size: .8125rem;
                    font-weight: 600;
                    color: #333333cc;
                }

            }
        }
    }

}

.profile-panel-content {
    background-color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    width: fit-content;
    white-space: nowrap;

    >* {
        cursor: pointer;
        transition: 200ms;
        padding: 0.5rem;
        padding-block: .25rem;
        border-radius: 0.5rem;

        &:hover {
            background-color: #f0f0f0;
        }
    }
}

.search-panel-content {
    margin-top: .5rem;
    background-color: #fff !important;
    padding: .5rem;
    border-radius: .5rem;
    border: 1px solid #e0e0e0;

    .product-item {
        display: flex;
        justify-content: space-between;
        align-items: space-between;
        cursor: pointer;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        transition: 200ms;
    }

    .product-item:hover {
        background-color: #f0f0f0;
    }
}

button {
    padding-inline: 1rem;
    width: fit-content;
    text-transform: capitalize;
}
</style>