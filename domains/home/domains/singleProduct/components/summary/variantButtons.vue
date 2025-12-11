<script setup lang="ts">
import { singleProduct } from '~/domains/product/composables/variables';

const selectedVariants = defineModel<Record<string, string>>('selectedVariants', {
    required: true,
    default: () => ({})
})

const selectHandler = (variantType: string, variantValue: string) => {
    selectedVariants.value[variantType] = variantValue;
}

const isThereVariantValue = (variantType: string, variantValueName: string): boolean => {
    const testVariants = { ...selectedVariants.value };
    testVariants[variantType] = variantValueName;

    const otherSelectedVariants = Object.keys(selectedVariants.value).filter(key => key !== variantType);

    if (otherSelectedVariants.length === 0) {
        return true;
    }

    return singleProduct.value.variantProducts.some((variant) => {
        return variant.variantValues.every((variantValue) => {
            return testVariants[variantValue.typeName] === variantValue.name;
        })
    })
}

onMounted(() => {
    singleProduct.value.variantProducts.map((variant) => {
        if (variant.isDefault) {
            variant.variantValues.map((variantValue) => {
                selectedVariants.value[variantValue.typeName] = variantValue.name;
            })
        }
    })
});
// xl red
</script>

<template>
    <div class="variant-buttons-container">
        <div v-for="variantType in singleProduct.variantTypes" :key="variantType.id" class="buttonGroups" >
            <div class="buttonGroupTitle">
                <h3>{{ variantType.name }}</h3>
            </div>
            <div class="buttonGroupButtons">
                <div v-for="variantValue in variantType.values" :key="variantValue.id" class="buttonGroupButton">
                    <button
                        :class="{ 'selected': selectedVariants[variantType.name] === variantValue.name }"
                        :disabled="!isThereVariantValue(variantType.name, variantValue.name)"
                        @click="selectHandler(variantType.name, variantValue.name)"
                    >{{ variantValue.name }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.variant-buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;

    .buttonGroups {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .buttonGroupTitle {
        h3 {
            font-size: 1.2rem;
            font-weight: 600;
        }
    }

    .buttonGroupButtons {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .buttonGroupButton {
        button {
            min-width: 50px;
            min-height: 40px;
            background-color: #f0f0f0;
            border: 1px solid #e0e0e0;
            padding-inline: 0.5rem;
        }

        button.selected {
            background-color: #e0e0e0;
        }

        button:hover:not(:disabled) {
            background-color: #e0e0e0;
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
}
</style>