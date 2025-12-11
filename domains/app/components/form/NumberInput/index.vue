<script setup lang="ts">
interface INumberInputProps {
    label?: string;
}
defineProps<INumberInputProps>();
const model = defineModel<number>({
    required: true,
    default: 1
});

const minusHandler = () => {
    if (model.value > 1) {
        model.value--;
    }
}
const plusHandler = () => {
    model.value++;
}

</script>

<template>
    <div class="numberInput">
        <label v-if="label">{{ label }}</label>
        <div class="numberInputWrapper">
            <div class="minus" @click="minusHandler"><Icon name="charm:minus" class="minusIcon"/></div>
            <input v-model="model" type="number">
            <div class="plus" @click="plusHandler"><Icon name="charm:plus" class="plusIcon"/></div>
        </div>
    </div>
</template>

<style scoped>
.numberInput {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
    }

    .numberInputWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;

        .minus {
            height: 40px;
            width: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 2px solid #ccccccc5;
            border-right: none;

            .minusIcon {
                width: 10px;
                font-weight: 500;
            }
        }

        .minus:hover {
            background-color: #e0b97f;
        }

        .plus {
            height: 40px;
            width: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 2px solid #ccccccc5;
            border-left: none;


            .plusIcon {
                width: 10px;
                font-weight: 500;
            }
        }

        .plus:hover {
            background-color: #e0b97f;
        }

        input {
            width: 35px;
            height: 40px;
            text-align: center;
            border: 2px solid #ccccccc5;
            border-radius: 0;
            padding: 0.5rem;
            font-size: 14px;
            font-weight: 500;
            text-transform: capitalize;
            outline: none;
            font-size: 13px;
            font-weight: 300;
            /* Firefox */
            -moz-appearance: textfield;

            /* Chrome, Safari, Edge, Opera */
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &:hover {
                border: 1px solid #ccccccc5;
            }

            &:focus {
                border: 1px solid #ccccccc5;
            }
        }

    }
}
</style>