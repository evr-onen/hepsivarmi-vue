<script setup lang="ts">
interface ITextAreaInputProps {
    label?: string;
    placeholder?: string;
}
defineProps<ITextAreaInputProps>();
const model = defineModel<string>();
</script>

<template>
    <div class="textAreaInput">
        <label>{{ label }}</label>
        <textarea v-model="model" :placeholder="placeholder" />
    </div>
</template>

<style scoped>
.textAreaInput {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-size: 0.875rem;
        font-weight: 500;
        color: #333333;
        text-transform: uppercase;
    }

    textarea {
        width: 100%;
        height: 100px;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background-color: transparent;
        outline: none;

        &:active {
            border: 1px solid #e0e0e0;
        }

        &:focus {
            border: 1px solid #e0e0e0;
        }
    }
}
</style>