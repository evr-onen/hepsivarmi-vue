<script setup lang="ts">
interface IPageBannerProps {
    title: string;
    description: string;
    image: string;
}

const props = defineProps<IPageBannerProps>();

</script>

<template>
    <div class="page-banner">
        <NuxtImg :src="props.image" />
        <h1>{{ props.title }}</h1>
        <p>{{ props.description }}</p>
    </div>
</template>

<style scoped>
.page-banner {
    width: 100%;
    height: 300px;
    background-color: #f0f0f0;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 2;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    h1 {
        font-size: 2rem;
        font-weight: 600;
        color: #fff;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        margin: 0;
    }

    p {
        font-size: 1rem;
        font-weight: 400;
        color: #fff;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        margin: 0;
    }
}
</style>