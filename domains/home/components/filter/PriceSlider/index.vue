<script setup lang="ts">
interface IPriceSliderProps {
    label?: string;
    min: number;
    max: number;
}

const emit = defineEmits<{
    (e: 'change', type: 'min' | 'max', value: number): void
}>()

defineOptions({
    name: 'PriceSlider'
})

const props = defineProps<IPriceSliderProps>()

//vars
const priceRange = defineModel<number[]>()
const minPercent = computed(() => ((minPrice.value - props.min) / (props.max - props.min)) * 100)
const maxPercent = computed(() => ((maxPrice.value - props.min) / (props.max - props.min)) * 100)

// Computed for display
const minPrice = computed(() => {
    if (!priceRange.value || priceRange.value.length !== 2) {
        return props.min
    }
    return priceRange.value[0] || props.min
})

const maxPrice = computed(() => {
    if (!priceRange.value || priceRange.value.length !== 2) {
        return props.max
    }
    return priceRange.value[1] || props.max
})

// handler Functions
const filterSubmitHandler = () => {
    console.log('Filter applied:', priceRange.value)
}

const minChangeHandler = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value < maxPrice.value) {
        priceRange.value = [value, maxPrice.value]
    }
    emit('change', 'min', value)
}

const maxChangeHandler = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value > minPrice.value) {
        priceRange.value = [minPrice.value, value]
    }
    emit('change', 'max', value)
}

// return functions
const formatPrice = (price: number) => `$${price}`

// lifecycle
watch(() => [props.min, props.max], ([min, max]) => {
    if (!priceRange.value || priceRange.value.length !== 2) {
        priceRange.value = [min, max]
    }
}, { immediate: true })

</script>

<template>
    <div class="price-filter">
        <h3 class="filter-title">{{ label || 'FILTER BY PRICE' }}</h3>
            
        <div class="slider-container">
            <div class="slider-track">
                <div class="slider-range" :style="{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }"/>
            </div>
            <input
                type="range"
                :min="min"
                :max="max"
                :value="minPrice"
                class="slider-input slider-input-min"
                @input="minChangeHandler"
            >
            <input
                type="range"
                :min="min"
                :max="max"
                :value="maxPrice"
                class="slider-input slider-input-max"
                @input="maxChangeHandler"
            >
        </div>

        <div class="filter-controls">
            <div class="price-display">
                <span class="price-label">Price:</span>
                <span class="price-value">{{ formatPrice(minPrice) }} – {{ formatPrice(maxPrice) }}</span>
            </div>
            <button 
                class="filter-button"
                @click="filterSubmitHandler"
            >
                FILTER
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.price-filter {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem 0;

    .filter-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: #333;
        text-transform: uppercase;
        margin: 0;
        letter-spacing: 0.5px;
    }

    .slider-container {
        position: relative;
        height: 0.5rem;
        margin: 1rem 0;

        .slider-track {
            position: absolute;
            width: 100%;
            height: 0.5rem;
            background-color: #E0E0E0;
            border-radius: 0.25rem;
            top: 50%;
            transform: translateY(-50%);
        }

        .slider-range {
            position: absolute;
            height: 0.1rem;
            background-color: #83B735;
            border-radius: 0.25rem;
            top: 50%;
            transform: translateY(-50%);
        }

        .slider-input {
            position: absolute;
            width: 100%;
            height: 0.1rem;
            background: none;
            pointer-events: none;
            appearance: none;
            -webkit-appearance: none;
            top: 0%;
            transform: translateY(-50%);

            &::-webkit-slider-thumb {
                appearance: none;
                -webkit-appearance: none;
                width: 1rem;
                height: 1rem;
                background-color: #83B735;
                border-radius: 50%;
                cursor: pointer;
                pointer-events: all;
                border: 2px solid #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            &::-moz-range-thumb {
                width: 1rem;
                height: 1rem;
                background-color: #83B735;
                border-radius: 50%;
                cursor: pointer;
                pointer-events: all;
                border: 2px solid #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            &::-webkit-slider-runnable-track {
                height: 0.5rem;
            }

            &::-moz-range-track {
                height: 0.5rem;
                background: transparent;
            }
        }

        .slider-input-min {
            z-index: 2;
        }

        .slider-input-max {
            z-index: 1;
        }
    }

    .filter-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        .price-display {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .price-label {
                font-size: 0.875rem;
                color: #9E9E9E;
                font-weight: 400;
            }

            .price-value {
                font-size: 0.875rem;
                color: #333;
                font-weight: 600;
            }
        }

        .filter-button {
            background-color: #F5F5F5;
            border: 1px solid #E0E0E0;
            color: #333;
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            cursor: pointer;
            transition: all 200ms;

            &:hover {
                background-color: #EEEEEE;
                border-color: #BDBDBD;
            }
        }
    }
}
</style>