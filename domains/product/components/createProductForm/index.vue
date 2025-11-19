<template>
    <div class="create-product-form">
        <div class="name"><TextInput v-model="name" label="Name" /></div>
        <div class="category"><Select v-model="category" label="Category" :options="categories" option-label="label" option-value="value" size="large" /></div>
        <div class="variants">
          <Multiselect v-model="variant" label="Variants" :options="variants" option-label="label" option-value="value" size="large" clearable/>
        </div>
    </div>
</template>

<script setup lang="ts">
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
import Select from '~/domains/app/components/form/Select/index.vue'
import Multiselect from '~/domains/app/components/form/Multiselect/index.vue'

defineOptions({
    name: 'CreateProductForm'
})

const name = ref('')
const price = ref('0')
const category = ref(undefined)
const variant = ref(undefined)
const images = ref([])

const categories = ref([
    { label: 'Category 1', value: 'category-1' },
    { label: 'Category 2', value: 'category-2' },
    { label: 'Category 3', value: 'category-3' },
])

const variants = ref([
    { label: 'Variant 1', value: 'variant-1' },
    { label: 'Variant 2', value: 'variant-2' },
    { label: 'Variant 3', value: 'variant-3' },
])
</script>

<style scoped>
.create-product-form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
}
</style>