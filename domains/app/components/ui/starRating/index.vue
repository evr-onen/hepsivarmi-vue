<script setup lang="ts">
interface IStarRatingProps {
    rating?: number;
    readonly?: boolean;
}

const props = withDefaults(defineProps<IStarRatingProps>(), {
    rating: 0,
    readonly: true
});

const model = defineModel<number>({ required: false, default: 0 });

const hoveredStar = ref<number | null>(null);
const isInteractive = computed(() => props.readonly === false);

const currentRating = computed(() => {
    if (isInteractive.value) {
        return hoveredStar.value !== null ? hoveredStar.value : (model.value || 0);
    }
    return props.rating || 0;
});

const roundedRating = computed(() => {
    return Math.round(currentRating.value * 10) / 10;
});

const getStarFill = (starIndex: number): number => {
    const fullStars = Math.floor(roundedRating.value);
    const decimalPart = roundedRating.value - fullStars;

    if (starIndex <= fullStars) {
        return 100;
    } else if (starIndex === fullStars + 1) {
        return decimalPart * 100;
    } else {
        return 0;
    }
};

const handleStarClick = (starIndex: number) => {
    if (isInteractive.value) {
        model.value = starIndex;
    }
};

const handleStarHover = (starIndex: number) => {
    if (isInteractive.value) {
        hoveredStar.value = starIndex;
    }
};

const handleMouseLeave = () => {
    if (isInteractive.value) {
        hoveredStar.value = null;
    }
};
</script>

<template>
    <div 
        class="star-rating-container"
        :class="{ 'interactive': isInteractive }"
        @mouseleave="handleMouseLeave"
    >
        <div class="star-rating-stars">
            <div 
                v-for="starIndex in 5" 
                :key="starIndex" 
                class="star-rating-star"
                :class="{ 'interactive': isInteractive }"
                @click="handleStarClick(starIndex)"
                @mouseenter="handleStarHover(starIndex)"
            >
                <div class="star-background">
                    <Icon name="ic:baseline-star" class="icon" />
                </div>
                <div 
                    class="star-foreground" 
                    :style="{ width: `${getStarFill(starIndex)}%` }"
                >
                    <Icon name="ic:baseline-star" class="icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.star-rating-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.interactive {
        cursor: pointer;
    }

    .star-rating-stars {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;

        .star-rating-star {
            position: relative;
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            flex-shrink: 0;

            &.interactive {
                cursor: pointer;
                transition: transform 0.1s ease-in-out;

                &:hover {
                    transform: scale(1.1);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            .star-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #e0d2d2;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .star-foreground {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                overflow: hidden;
                color: #ffc107;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                transition: width 0.2s ease-in-out;
            }

            .icon {
                width: 1.5rem;
                height: 1.5rem;
                flex-shrink: 0;
            }
        }
    }
}
</style>