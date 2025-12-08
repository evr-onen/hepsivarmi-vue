<template>
    <div class="home-layout">
        <Header />
        <div class="home-layout--content">
            <slot />
        </div>
        <Footer/>
    </div>
</template>

<script setup lang="ts">
import Header from './home/header.vue';
import Footer from './home/footer.vue';
</script>

<style lang="scss" scoped>
.home-layout {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    color: #000;
    font-family: 'Lato', sans-serif;

    .home-layout--content {
        margin-inline: auto;

    }

}
</style>