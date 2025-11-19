<script setup lang="ts">

import {createBrandForm, createBrandFormErrors} from "~/domains/brand/composables/variables";
import TextInput from "~/domains/app/components/form/TextInput/index.vue";
</script>

<template>
  <div class="create-brand-form">
    <div class="brand">
      <TextInput
          v-model="createBrandForm.name"
          class="text-black"
          label="Brand Name"
          required
          placeholder="Brand Name"
          :error-message="createBrandFormErrors['name']"
      />
    </div>
    <div class="logo">
      logo upload
    </div>
  </div>
</template>

<style scoped>
.create-brand-form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  .brand{
    display: flex;
    width: 100%;
    align-items: flex-end;
    gap: 1rem;
  }
}
</style>