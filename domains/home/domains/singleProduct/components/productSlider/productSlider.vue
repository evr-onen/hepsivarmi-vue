<template>
    <div class="image-slider-container">
        <div class="thumbs">
            <Splide ref="thumbsSplide" :options="thumbsOptions" class="thumbsSplide">
                <SplideSlide v-for="(image, index) in singleProduct.images" :key="index" @click="mainSplide.go(index)">
                    <NuxtImg :src="image" :alt="`Product image ${index + 1}`" class="image-thumbnail"  />
                    <div class="imageOverlay"/>
                </SplideSlide>
            </Splide>
            <div class="arrows">
                <div class="arrow prev" @click="goPrev">
                    <Icon name="mdi:chevron-up" />
                </div>
                <div class="arrow next" @click="goNext">
                    <Icon name="mdi:chevron-down" />
                </div>
            </div>
        </div>

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

const goPrev = () => {
    if (thumbsSplide.value) {
        const splideInstance = (thumbsSplide.value as any).splide
        if (splideInstance) {
            splideInstance.go('<')
        }
    }
}

const goNext = () => {
    if (thumbsSplide.value) {
        const splideInstance = (thumbsSplide.value as any).splide
        if (splideInstance) {
            splideInstance.go('>')
        }
    }
}

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
    height: '450px',
    rewind: true,
    perPage: 4,
    perMove: 1,
    gap: '0.5rem',
    pagination: false,
    arrows: false,
    fixedWidth: '120px',
    fixedHeight: '120px',
    cover: true,
    focus: false,
    isNavigation: false,
    updateOnMove: false,
}


</script>

<style scoped lang="scss">
.image-slider-container {
    display: flex;
    height: 515px;

    .mainSplide {
        flex: 4;


        :deep(.splide__track) {
            height: 100%;
        }

        :deep(.splide__slide) {
            // padding: 1rem;
        }

        :deep(.splide__slide img) {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }



    .thumbs {
        flex: 1;
        display: flex;
        flex-direction: column;

        .thumbsSplide {
            flex: 1;
            padding: 4px;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 0.5rem;

            :deep(.splide__slide.is-active) {
                border-width: 0px !important;

                .imageOverlay {
                    background-color: rgba(0, 0, 0, 0.0);
                }
            }

            .imageOverlay {
                background-color: rgba(0, 0, 0, 0.3);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

        }

    }

    .arrows {
        display: flex;

        width: 100%;
        height: 65px;
        padding: .25rem;

        .arrow {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333;
            background-color: #f7f7f7;
            margin: .25rem;
            cursor: pointer;
        }

        .arrow:hover {
            background-color: #e3e3e3;

        }
    }


}
</style>

<!-- const thumbsOptions: Options = {
    // Slider Type
    type: 'slide', // 'slide' | 'loop' | 'fade'

    // Direction
    direction: 'ttb', // 'ltr' | 'rtl' | 'ttb' (top-to-bottom)

    // Dimensions
    height: '450px', // string | number
    width: undefined, // string | number
    fixedWidth: '120px', // string | number
    fixedHeight: '120px', // string | number
    heightRatio: undefined, // number (height/width ratio)

    // Layout
    perPage: 4, // number (how many slides visible)
    perMove: 1, // number (how many slides to move)
    gap: '0.5rem', // string | number (gap between slides)
    padding: undefined, // string | number | object
    trimSpace: true, // boolean (remove empty space)

    // Behavior
    rewind: true, // boolean (loop back to start)
    rewindByDrag: false, // boolean
    focus: false, // 'center' | number | false
    trimSpace: true, // boolean
    omitEnd: false, // boolean

    // Navigation
    arrows: false, // boolean
    pagination: false, // boolean
    keyboard: true, // boolean | 'global' | 'focused'
    drag: true, // boolean | 'free'
    snap: true, // boolean
    waitForTransition: false, // boolean

    // Speed & Transitions
    speed: 400, // number (transition speed in ms)
    easing: 'ease', // string (CSS easing function)
    start: 0, // number (starting slide index)

    // Breakpoints (responsive)
    breakpoints: undefined, // object

    // Classes
    classes: {
        root: 'splide',
        slider: 'splide__slider',
        track: 'splide__track',
        list: 'splide__list',
        slide: 'splide__slide',
        container: 'splide__container',
        arrows: 'splide__arrows',
        arrow: 'splide__arrow',
        prev: 'splide__arrow--prev',
        next: 'splide__arrow--next',
        pagination: 'splide__pagination',
        page: 'splide__pagination__page',
        isActive: 'is-active',
        isVisible: 'is-visible',
        isPrev: 'is-prev',
        isNext: 'is-next',
    },

    // Image Options
    cover: true, // boolean (cover images)
    autoWidth: false, // boolean
    autoHeight: false, // boolean

    // Navigation Options
    isNavigation: true, // boolean (for thumbnail navigation)
    updateOnMove: true, // boolean (update on move)

    // Accessibility
    accessibility: true, // boolean
    live: true, // boolean (aria-live)

    // Autoplay
    autoplay: false, // boolean | string
    interval: 5000, // number (ms)
    pauseOnHover: true, // boolean
    resetProgress: true, // boolean

    // Lazy Loading
    lazyLoad: false, // boolean | 'nearby' | 'sequential'
    preloadPages: 1, // number

    // Others
    destroy: false, // boolean
    mediaQuery: 'min', // 'min' | 'max'
    slideFocus: true, // boolean
} -->