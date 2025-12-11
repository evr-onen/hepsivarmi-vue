<script setup lang="ts">

</script>

<template>
    <div>
        <Dropdown v-model="selectValues" class="w-full" type-code="ea-Multiselect" :click-outside="true">
            <template #default="{ openPanel }">
               
            </template>

            <template #panelContent="{ closePanel }">
                
            </template>

        </Dropdown>
    </div>
</template>

<style scoped></style>