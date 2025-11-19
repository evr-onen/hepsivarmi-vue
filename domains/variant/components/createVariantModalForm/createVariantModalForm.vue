
<template>
  <div class="create-variant-form">
    <div class="variantValue">
      <TextInput
          v-model="variantTypeCreateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Name"
          :error-message="variantTypeCreateErrors['name']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'

// vars
import {
  variantTypeCreateForm,
  variantTypeCreateErrors,
} from '~/domains/variant/composables/variables'

defineOptions({
  name: 'CreateVariantForm'
})
</script>

<style scoped>
.create-variant-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
}
</style>