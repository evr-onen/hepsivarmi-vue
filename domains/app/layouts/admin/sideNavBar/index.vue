<template>
    <div class="admin-layout">
        <Menu :is-menu-active="isMenuActive" :toggle-menu="toggleMenu"/>
        <div class="admin-content" :class="{ 'active': isMenuActive }">
            <Header :toggle-menu="toggleMenu" :is-menu-active="isMenuActive"/>
            <div class="content">
                <div class="card-content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue';
import Header from './header/index.vue';


const isMenuActive = ref(true)

const toggleMenu = () => {
    isMenuActive.value = !isMenuActive.value
}
</script>

<style scoped>
.admin-layout {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
}

.admin-content {
    width: 100%;
    height: 100vh;
    transition: all 0.3s ease-in-out;
    background-color: #f3f3f9;

    .content {
        width: 100%;
        padding: 1.25rem;
        overflow-y: auto;

        >.card-content {
            background-color: white;
            width: 100%;
            height: 100%;
            border: 1px solid rgb(233, 233, 233);
            max-height: calc(100vh - 6.25rem);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
            padding: 1.25rem;
            overflow-y: auto;
        }
    }
}

.admin-content.active {
    width: calc(100% - 18.75rem);
}
</style>