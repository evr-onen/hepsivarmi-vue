<template>
    <div class="modal-container">
        <Teleport to="body">
            <Transition name="modal" appear>
                <div
                    v-if="isOpen"
                    ref="modalOverlayRef"
                    class="modal-overlay overlayBG"
                    @click.self="() => overlayClose && closeModal()"
                >
                    <div class="modal" :style="{ width: widthValue }">
                        <div class="modal__header">
                            <slot v-if="$slots.header" name='header'/>
                            <h4 v-else>{{ title }}</h4>
                            <div class="closeIcon" @click="closeModal">
                                <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                        <div class="modal__container">
                            <slot />
                        </div>
                        <div class="modal__footer">
                            <slot v-if="$slots.footer" name='footer' v-bind="{ closeModal }"/>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
// Component name
defineOptions({
    name: 'OverlayModal'
})
const modalOverlayRef = ref(null)
const props = withDefaults(defineProps<{
    title?: string
    width?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto',
    overlayClose?: boolean
}>(), {
    title: '',
    width: 'md',
    overlayClose: true,
})
const isOpen = defineModel<boolean>('modelValue')
const closeModal = () => isOpen.value = false


const widthValue = computed(() => {
    switch (props.width) {
        case 'auto':
            return 'auto'
        case 'sm':
            return '30%'
        case 'md':
            return '50%'
        case 'lg':
            return '60%'
        case 'xl':
            return '75%'
        case 'full':
            return '100%'
        default:
            return '50%'
    }
})
const isFirstOverlay = computed(() => {
    // Eğer DOM'da başka overlay yoksa → bu ilk modal
    return !document.querySelector('.modal-overlay')
})
</script>

<style scoped>
/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal {
    transition: transform 0.3s ease;
}

.modal-enter-from .modal {
    transform: scale(0.9) translateY(-50px);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        background-color: #fff;
        height: auto;

        border-radius: 10px;
        padding-inline: 10px;


        .modal__header {
            display: flex;
            justify-content: space-between;
            height: 50px;
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;

            h4 {
                font-size: 18px;
                font-weight: 600;
                color: #000;
            }

            .closeIcon {
                color: #000;
                cursor: pointer;
                font-size: 20px;
                font-weight: 600;
                padding: 2px;
                border-radius: 50%;
                background-color: #f0f0f0;
                width: 30px;
                height: 30px;
                transition: all 0.3s ease;
            }

            .closeIcon:hover {
                background-color: #e0e0e0;
            }
        }

        .modal__container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal__footer {
            display: flex;
            width: 100%;
            border-top: 1px solid #e0e0e0;
            padding: 10px;
            justify-content: flex-end;
            gap: 10px;

            .footer-button {
                display: flex;
            }
        }
    }
}

.overlayBG {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>