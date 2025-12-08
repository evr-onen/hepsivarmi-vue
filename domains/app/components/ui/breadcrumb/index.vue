<script setup lang="ts">

interface IBreadcrumbProps {
    items: {
        label: string;
        link: string;
    }[];
}

const props = defineProps<IBreadcrumbProps>();

</script>
<template>
    <div class="breadcrumb"> 
        <div class="breadcrumb-list">
            <div v-for="(item, index) in props.items" :key="item.label" class="breadcrumb-item" >
                <NuxtLink :to="item.link" class="breadcrumb-link">{{ item.label }} </NuxtLink>
                <span v-if="index < props.items.length - 1" class="breadcrumb-separator"> / </span>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.breadcrumb {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 1.25rem;

    .breadcrumb-list {
        display: flex;

        .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: 0.5rem;
        }
    }
}
</style>