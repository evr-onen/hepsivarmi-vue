<template>
    <div class="login-page">
        <div class="login-panel">
            <div class="panel-image">
                <img :src="loginPanelImage" alt="login-panel" >
            </div>
            <div class="login__form">
                <h4>Welcome Back</h4>
                <div class="email">
                    <EaTextInput
                        v-model="authStore.userLoginForm.email"
                        label="Email"
                        required
                        placeholder="Email..."
                        :error-message="authStore.userLoginFormErrors.email"
                    />
                </div>
                <div class="password">
                    <EaTextInput
                        v-model="authStore.userLoginForm.password"
                        label="Password"
                        required
                        placeholder="Password..."
                        input-type="password"
                        :error-message="authStore.userLoginFormErrors.password"
                    />
                </div>
                <div class="submit-button">
                    <EaButton  :loading="authStore.isLoginActionLoading" @click="authStore.onLogin">Login</EaButton>
                </div>
                <div class="links">
                    <NuxtLink to="/auth/forgot-password">Forgot Password?</NuxtLink>
                    <NuxtLink to="/auth/register">Don't have an account? Register</NuxtLink>
                </div>
                </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { EaTextInput, EaButton} from 'ea-kit';
import loginPanelImage from '~/domains/auth/assets/images/login/login-panel.png';

const authStore = useAuthStore();


</script>

<style scoped>
.login-page{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../../../assets/images/login/page-image.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5); /* 50% black overlay */
        z-index: 1;
    }

    .login-panel{
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        height: min-content;
        background-color: #fff;
        border-radius: 10px;
        
        .panel-image{
            flex: 1;
            height: 21.875rem;
            width: auto;

            img{
                width: 100%;
            }
        }
        
        .login__form{
            box-sizing: border-box;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 21.875rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            column-gap: 10px;
            border-radius: 10px;
            filter: blur(0px);

            h4{
                font-size: 1.5rem;
                font-weight: 600;
                color: #000;
                text-align: center;
            }

            .submit-button{

                > div{
                    width: 100%;
                }
            }

            .links{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                font-size: 0.875rem;
                font-weight: 400;
                color: #000;
                text-align: center;

                a{
                    color: #000;
                    text-decoration: none;
                }

                a:hover{
                    text-decoration: underline;
                }
            }

        }
    }
}
</style>