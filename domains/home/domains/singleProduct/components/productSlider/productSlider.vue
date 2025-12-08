<template>
    <Splide :options="options" aria-label="Product Images">
        <SplideSlide v-for="(image, index) in singleProduct.images" :key="index">
            <NuxtImg :src="image" :alt="`Product image ${index + 1}`" class="image-slider" />
        </SplideSlide>
    </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import { singleProduct } from '~/domains/product/composables/variables';

defineOptions({
    name: 'ProductSlider',
})
interface IProductSlider {
    images: string[]
}

defineProps<IProductSlider>()

const options = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: true,
    arrows: true,
}
</script>

<style scoped>
:deep(.splide) {
    height: 100%;
    width: 100%;
}

:deep(.splide__slide) {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 32.1875rem;
    max-width: 100%;
    width: 100%;
    overflow: hidden;
}

:deep(.splide__slide img) {
    overflow: hidden;
    margin: 0 auto;
    display: block;
}

.image-slider {
    height: 100%;
}
</style>