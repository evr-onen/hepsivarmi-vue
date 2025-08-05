<template>
    <div class="login-page">
        <!-- <EaMessage
            v-if="accountStoreInlineMessage.status"
            class="ea-message " 
            v-bind="accountStoreInlineMessage"
        /> -->
        <div class="login__form">
            <div class="name">
                <EaTextInput
                    v-model="authStore.userRegisterForm.name"
                    label="Name"
                    placeholder="Name..."
                />
            </div>
            <div class="email">
                <EaTextInput
                    v-model="authStore.userRegisterForm.email"
                    label="Email"
                    placeholder="Email..."
                />
            </div>
            <div class="password">
                <EaTextInput
                    v-model="authStore.userRegisterForm.password"
                    label="Password"
                    placeholder="Password..."
                />
            </div>
            <div class="password-confirmation">
                <EaTextInput
                    v-model="authStore.userRegisterForm.password_confirmation"
                    label="Password Confirmation"
                    placeholder="Password..."
                />
            </div>
            <EaButton @click="authStore.onRegister">Register</EaButton>
        </div>
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