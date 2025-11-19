
<template>
  <div class="create-variant-type-form">
    <div class="variantType">
      <TextInput
          v-model="variantValueCreateForm.name"
          class="text-black"
          label="Name"
          required
          placeholder="Category Name"
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
  variantTypeCreateErrors,
  variantValueCreateForm
} from "~/domains/variant/composables/variables";

defineOptions({
  name: 'CreateVariantTypeFormModalContent'
})
</script>

<style scoped>
.create-variant-type-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .variantType{
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;

    .ea-select{
      width: 100%;
    }

    button{
      width: fit-content;
      padding-inline: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>yle>