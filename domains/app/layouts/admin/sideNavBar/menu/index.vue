<template>
    <div class="menu" :class="{ active: isMenuActive }">
        
        <div class="logo">VueCommerce</div>
        <div class="menu-items">
            <MenuItem v-for="item in navMenu" :key="item.name" :menu-link-item="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuItem from './menuItem.vue'
import { navMenu } from '../navMenu'

defineProps<{
    isMenuActive: boolean
    toggleMenu: () => void
}>()
</script>

<style scoped>
.menu{
    width: 18.75rem;
    height: 100vh;
    background-color: #405189;
    position: fixed;
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
    top: 0;
    left: -100%;
    z-index: 1000;
    padding: 1.25rem;
    transition: all 0.3s ease-in-out;

    

    .logo{
        font-family: "Tangerine", cursive;
        font-weight: 700;
        font-size: 3.5rem;
        color: white;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-items{
        display: flex;
        flex-direction: column;
        row-gap: 1.25rem;
    }
}
.menu.active{
    left: 0;
}
</style>