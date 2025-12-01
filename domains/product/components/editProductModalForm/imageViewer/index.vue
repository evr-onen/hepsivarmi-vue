<script setup lang="ts">
import Button from '~/domains/app/components/form/Button/index.vue';
defineOptions({
    name: 'ImageViewer',
})
defineProps<{
    images: string[]
}>()
const emit = defineEmits(['deleteImages'])

const deleteImages = () => {
    emit('deleteImages')
}

</script>

<template>
    <div class="image-viewer">
        <div v-for="badgeItem in images" :key="badgeItem" >
                    <div class="badgeStyle info">
                      <NuxtImg
                        :src="badgeItem"
                        :placeholder="[15, 10]"
                        class="rounded product-image"
                      />
                    </div> 
                  </div>
    </div>
    <Button severity="gradient" color="warning" label="Delete Images" @click="deleteImages" >
        <template #icon>
            <Icon name="tabler:trash" />
        </template>
    </Button>
</template>


<style lang="scss" scoped>
.image-viewer {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.product-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}
</style>