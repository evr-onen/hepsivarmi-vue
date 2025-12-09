<template>
    <div class="image-slider-container">
        <Splide ref="thumbsSplide" :options="thumbsOptions" class="thumbsSplide">
            <SplideSlide v-for="(image, index) in singleProduct.images" :key="index" @click="mainSplide.go(index)">
                <NuxtImg :src="image" :alt="`Product image ${index + 1}`" class="image-slider"  />
            </SplideSlide>
            <!-- <div class="thumbs-slider-arrows">
                <SplideArrow />
                <SplideArrow />
            </div> -->
        </Splide>
        <Splide  ref="mainSplide" :options="options" aria-label="Product Images" class="mainSplide">
            <SplideSlide v-for="(image, index) in singleProduct.images" :key="index">
                <NuxtImg :src="image" :alt="`Product image ${index + 1}`" class="image-slider" />
            </SplideSlide>
        </Splide>
    </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide, } from '@splidejs/vue-splide';
import type { Options } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import { singleProduct } from '~/domains/product/composables/variables';

defineOptions({
    name: 'ProductSlider',
})
interface IProductSlider {
    images: string[]
}

defineProps<IProductSlider>()

const mainSplide = ref<Splide>()
const thumbsSplide = ref<Splide>()

const options: Options = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    arrows: false,
}

const thumbsOptions: Options = {
    type: 'slide',
    direction: 'ttb',
    height: '480px',
    rewind: true,
    perPage: 4,
    perMove: 1,
    gap: '0.5rem',
    // pagination: false,
    // arrows: true,
    fixedWidth: '120px',
    fixedHeight: '120px',
    cover: true,
    focus: false,
    // isNavigation: true,
    updateOnMove: true,
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.image-slider {
    width: 100%;
    height: 100%;
}

.image-slider-container {
    display: flex;
    height: 515px;

    .mainSplide {
        flex: 4;

        :deep(.splide__slide) {
            padding: 1rem;
        }

        :deep(.splide__slide img) {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .thumbsSplide {
        flex: 1;
        padding: 4px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;

        img {
            width: 130px;
            height: 150px;
            object-fit: cover;
            cursor: pointer;

        }
    }
}
</style>