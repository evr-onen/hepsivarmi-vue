<script setup lang="ts">
import Comments from './comments.vue';
import Descriptions from './descriptions.vue';

defineProps<{
    productId: string;
}>();

const activeTab = ref(0);

</script>

<template>
    <div class="tabs-container">
        <div class="tab-buttons">
            <div class="tab-button-indicator">
                <button class="tab-button" :class="{ 'active': activeTab === 0 }" @click="activeTab = 0">
                    <span>Descriptions</span>
                </button>
            </div>
            <div class="tab-button-indicator">
                <button class="tab-button" :class="{ 'active': activeTab === 1 }" @click="activeTab = 1">
                    <span>Comments</span>
                </button>
            </div>
        </div>
        <div class="tab-content">
            <Descriptions v-if="activeTab === 0" :product-id="productId"  />
            <Comments v-if="activeTab === 1" :product-id="productId"  />
        </div>
    </div>
</template>

<style scoped lang="scss">
.tabs-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .tab-buttons {
        display: flex;
        flex-direction: row;
        gap: 3rem;
        text-transform: uppercase;
        font-size: 1.2rem;
        font-weight: 600;
        color: #333333;

        button {
            padding-top: 10px;
        }

        .tab-button-indicator {
            position: relative;
            width: fit-content;

            button::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 3px;
                background-color: #83b735;
                transition: width 0.3s ease-in-out;
            }

            button.active::before {
                width: 100%;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 3px;
                background-color: #83b735;
                transition: width 0.3s ease-in-out;
            }

            button:hover::before {
                width: 100%;
            }
        }

    }
}
</style>
