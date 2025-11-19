<template>
  <div class="property-page admin-content">
    <h2 class="pageTitle">Property</h2>
    <div class="content">
      <Tab :titles="['Property', 'Lists']" >
        <template #content-1>
          <PropertyContent/>
        </template>
        <template #content-2>
          <PropertyListContent />
        </template>
      </Tab>

    </div>



  </div>
</template>

<script setup lang="ts">
// ui
import Tab from "~/domains/app/components/panel/tab/index.vue"

//modals
// variables

// composables
import PropertyContent from "~/domains/property/components/propertyContent/propertyContent.vue";
import PropertyListContent from "~/domains/property/components/propertyListContent/propertyListContent.vue";

</script>

<style scoped>
.property-page {
  .pageTitle {
    font-size: 2rem;
    font-weight: 600;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .content-top {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;

      button {
        padding-inline: 1rem;
        width: fit-content;
      }
    }
  }
}

.actionButtons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  .circleButtonStyle {
    background-color: #106c8f;
    border-radius: 50%;
    padding: 6px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
    transition: 300ms;

    &:hover {
      background-color: #347d9d;
    }
  }
}

.valuesColumn {
  display: flex;
  gap: 1rem;
}

.badgeStyle {
  background-color: #106c8f;
  width: fit-content;
  padding-inline: 1rem;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
}
</style>