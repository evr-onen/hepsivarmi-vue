<template>
    <div class="home-layout">
        <Header />
        <div class="home-layout--content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './home/header.vue';
</script>

<style lang="postcss" >

.home-layout {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    color: #000;
    .home-layout--content{
        margin-inline: auto;
        margin-top: 100px;
    }

}



</style>