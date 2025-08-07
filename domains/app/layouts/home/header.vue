<template>
    <div class="header">
        <div class="header-top"></div>
        <div class="header-mid"></div>
        <div class="header-bottom">
            <div class="nav-menu">
                <NavMenu />
            </div>
            <div class="buttons">
                <EaButton v-if="!isLoggedIn" variant="ghost" class="capitalize" @click="$router.push('/auth/login')">login</EaButton>
                <EaButton v-else variant="ghost" class="capitalize" @click="authStore.onLogout">logout</EaButton>
                <EaButton v-if="isLoggedIn" class="capitalize" variant="ghost"  @click="$router.push('/admin/dashboard')">admin</EaButton>
                <EaButton v-if="isLoggedIn" variant="ghost"  @click="$router.push('/account')">profile</EaButton>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import NavMenu from './components/navMenu/navMenu.vue';
import { EaButton} from 'ea-kit';
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);

</script>

<style scoped>
.header{
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;

    .header-bottom{
        padding: 0 2rem;
        width: 100%;
        height: 60px;
        max-width: 1400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        background-color: #ccc;

        :deep(.nav-menu){
        }

        .buttons{
            display: flex;
            gap: 2rem;

        }
    }
}


</style>