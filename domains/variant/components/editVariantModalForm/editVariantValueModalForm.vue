<template>
  <div class="edit-variant-form">
    <div class="variantValue">
      <TextInput
          v-model="variantValueUpdateForm.name"
          class="text-black"
          label="Variant Value Name"
          required
          placeholder="Variant Value Name"
          :error-message="variantValueUpdateErrors['name']"
      />
    </div>

  </div>

</template>

<script setup lang="ts">
// ui
import TextInput from '~/domains/app/components/form/TextInput/index.vue'
// comps
// composables
// vars
import {
    variantValueUpdateForm,
    variantValueUpdateErrors,
} from '~/domains/variant/composables/variables'
// type

defineOptions({
  name: 'EditVariantValueForm'
})

// hooks

// handlers


</script>

<style scoped>
.edit-variant-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .variantType {
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;

    .ea-select {
      width: 100%;
    }

    button {
      width: fit-content;
      padding-inline: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>yle>