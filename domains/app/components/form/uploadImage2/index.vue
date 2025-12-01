<template>
  <div class="uploadImage2 w-full">
    <div class="label">
      {{ label }}<span v-if="required" class="required">*</span>
    </div>
    <div class="uploadWrapper">
      <input ref="fileInputRef" class="fileInput" type="file" accept="image/*" :multiple="allowMultiple"
        :disabled="disabled" @change="handleFileChange">
      <div class="uploadArea" :class="{
        'uploadArea--disabled': disabled,
        'uploadArea--error': errorMessage && errorMessage.length > 0,
        'uploadArea--hasImage': hasPreview
      }" @click="handleUploadClick">
        <div v-if="hasPreview" class="previewState">
          <img :src="activePreview[0]" alt="Preview" class="previewImage">
          <span v-if="previewCount > 1" class="previewBadge">
            +{{ previewCount - 1 }}
          </span>
          <button
            v-if="hasNewUpload"
            type="button"
            class="removeButton"
            @click.stop="removeImage"
            :disabled="disabled">
            ×
          </button>
        </div>
        <div v-else class="emptyState">
          <svg class="uploadIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span class="uploadText">Resim seçin veya sürükleyin</span>
        </div>
      </div>
    </div>
    <div v-if="errorMessage && errorMessage.length > 0" class="errorMessage  text-red-500 mt-1">
      {{ getErrorMessage }}
    </div>
    <div v-if="helperText" class="helperText">{{ helperText }}</div>
  </div>
</template>

<script setup lang="ts">
import type { UploadImage2Props } from './types'
import './style.css'

defineOptions({
  name: 'UploadImage2',
})

const props = withDefaults(defineProps<UploadImage2Props>(), {
  label: '',
  required: false,
  disabled: false,
  helperText: '',
  errorMessage: undefined,
  maxFiles: 1,
})

const modelValue = defineModel<File[]>({
  default: [],
})

const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrls = ref<string[]>([])

const allowMultiple = computed<boolean>(() => (props.maxFiles ?? 1) !== 1)
const normalizedInitialPaths = computed<string[]>(() => {
  if (!props.initialPaths) return []
  return (Array.isArray(props.initialPaths) ? props.initialPaths : [props.initialPaths]).filter(
    (path): path is string => !!path
  )
})
const activePreview = computed<string[]>(() =>
  previewUrls.value.length ? previewUrls.value : normalizedInitialPaths.value
)
const previewCount = computed<number>(() => activePreview.value.length)
const hasPreview = computed<boolean>(() => previewCount.value > 0)
const hasNewUpload = computed<boolean>(() => previewUrls.value.length > 0)

const getErrorMessage = computed<string>(() => {
  if (props.errorMessage && props.errorMessage.length > 0) {
    return props.errorMessage.join('<br/>')
  }
  return ''
})

watch(
  () => modelValue.value,
  (files: File[] | null | undefined) => {
    const safeFiles = Array.isArray(files) ? files : []
    previewUrls.value.forEach((url: string) => URL.revokeObjectURL(url))
    previewUrls.value = safeFiles.map((file: File) => URL.createObjectURL(file))
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  previewUrls.value.forEach((url: string) => URL.revokeObjectURL(url))
})

const handleUploadClick = () => {
  if (props.disabled) return
  fileInputRef.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files ? Array.from(target.files) : []

  if (files.length === 0) return

  const maxFiles = props.maxFiles ?? 1
  const selectedFiles = files.slice(0, maxFiles)

  modelValue.value = selectedFiles

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const removeImage = () => {
  if (props.disabled || !hasNewUpload.value) return
  modelValue.value = []
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}
</script>

<style scoped></style>
