<template>
    <div class="admin-layout">
        <SideNavBar> 
            <slot/>
        </SideNavBar>
    </div>
</template>

<script setup lang="ts">
import SideNavBar from './admin/sideNavBar/index.vue';
</script>

<style lang="postcss" >
</style>