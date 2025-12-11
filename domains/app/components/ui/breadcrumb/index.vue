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
                <span v-if="index < props.items.length - 1" class="breadcrumb-separator">/</span>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.breadcrumb {
    font-weight: 400;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: start;
    align-items: center;

    .breadcrumb-list {
        display: flex;

        .breadcrumb-item {
            display: flex;
            align-items: center;

            span {
                margin-inline: 0.25rem;
            }
        }

        .breadcrumb-item:last-of-type {
            font-weight: 600;
        }
    }
}
</style>