<template>
    <div class="login-page">
        <!-- <EaMessage
            v-if="accountStoreInlineMessage.status"
            class="ea-message " 
            v-bind="accountStoreInlineMessage"
        /> -->
        <div class="login__form">

            <div class="email">
                <EaTextInput
                    v-model="authStore.userLoginForm.email"
                    label="Email"
                    placeholder="Email..."
                    :error-message="authStore.userLoginFormErrors.email"
                />
            </div>
            <div class="password">
                <EaTextInput
                    v-model="authStore.userLoginForm.password"
                    label="Password"
                    placeholder="Password..."
                    :error-message="authStore.userLoginFormErrors.password"
                />
            </div>
            
            <EaButton :loading="authStore.isLoginActionLoading" @click="authStore.onLogin">Login</EaButton>
        </div>
        <!-- <EaIcon name="cross" size="24px" color="red" /> -->
    </div>
</template> 

<script setup lang="ts">
import { EaTextInput, EaButton} from 'ea-kit';
const authStore = useAuthStore();


</script>

<style scoped>
.login-page{
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login__form{
        border : 1px solid #b9b9b9;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        border-radius: 10px;
    }
}
</style>