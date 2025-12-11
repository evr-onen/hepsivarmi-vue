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
                <div class="search">
                    <input type="text" placeholder="Search for products" >
                    <Icon name="solar:minimalistic-magnifer-linear" class="icon" />
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
                                <p @click="closePanel">My Account</p>
                                <p @click="closePanel">My Orders</p>
                                <p @click="authStore.onLogout">Logout</p>
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
                    <div class="heart">
                        <Icon name="solar:heart-linear" class="icon" />
                    </div>
                    <div class="compare">
                        <Icon name="ion:git-compare-outline" class="icon" />
                    </div>
                    <div class="cart">
                        <div class="icon">
                            <Icon name="solar:bag-outline" class="icon" />
                            <p>0</p>
                        </div>
                        <p class="totalPrice">$0.00</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import NavMenu from './components/navMenu/navMenu.vue';
import Button from '~/domains/app/components/form/Button/index.vue'
import Dropdown from '~/domains/app/components/form/Dropdown/index.vue'
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);

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

                .cart {
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

button {
    padding-inline: 1rem;
    width: fit-content;
    text-transform: capitalize;
}
</style>