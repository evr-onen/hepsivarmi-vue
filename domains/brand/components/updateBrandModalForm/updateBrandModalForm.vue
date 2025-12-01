<script setup lang="ts">

import { updateBrandForm, updateBrandFormErrors, imagePath } from "~/domains/brand/composables/variables";
import TextInput from "~/domains/app/components/form/TextInput/index.vue";
import UploadImage2 from "~/domains/app/components/form/uploadImage2/index.vue";
</script>

<template>
  <div class="create-brand-form">
    <div class="brand">
      <TextInput v-model="updateBrandForm.name" class="text-black" label="Brand Name" required placeholder="Brand Name"
        :error-message="updateBrandFormErrors['name']" />
    </div>
    <div class="logo">
      <UploadImage2
          v-model="updateBrandForm.logo"
          :initial-paths="imagePath"
          type="brand"
          name="brand-logo"
          label="Brand Logo"
          :required="true"
          :error-message="updateBrandFormErrors['logo']"
      />
    </div>
  </div>
</template>

<style scoped>
.create-brand-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .brand {
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;
  }
}
</style>