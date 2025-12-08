<script setup lang="ts">
import type { IPropertyList } from "~/domains/product/types/productTypes";
import type { OptionsType } from "~/domains/app/components/form/Select/types";
import { createProductForm } from "~/domains/product/composables/variables";
import Select from "~/domains/app/components/form/Select/index.vue";

interface IPropertyTable {
  properties: IPropertyList
}

defineOptions({
  name: 'EditPropertyTable'
})
defineProps<IPropertyTable>()

</script>

<template>
  <div class="property-table">
    <div class="table-header">

      <div class="property-table__header">Types</div>
      <div class="property-table__header">Values</div>
    </div>
    <div class="property-table__body">
      <div v-for="(_, i) in properties.props" :key="i" class="table-row">
        <div class="type">
          <p>{{ properties.props[i].name }}</p>
        </div>
        <div class="value">
          <Select
              v-model="createProductForm.properties.productPropertyValues[i]"
              class="w-full"
              label=""
              :options="(toRaw(properties.props[i].values) as unknown) as OptionsType[]"
              option-label="name"
              option-value="id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-table {
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;

  .table-header {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
    margin-bottom: 4px;

    >div {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }

  .property-table__body {
    display: flex;
    flex-direction: column;
    padding: .35rem !important;
    gap: 8px;

    .table-row {
      display: flex;
      height: 100%;

      >div {
        padding-inline: 1rem;
        flex: 1;
        display: flex;
        align-items: flex-end;

      }
    }
  }

}
</style>