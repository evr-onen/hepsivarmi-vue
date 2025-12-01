<template>
  <div class="!w-full ">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <div class="border rounded-[12px] bg-white p-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-4 mb-3">
          <button
            type="button"
            class="px-4 py-2 bg-gray-100 rounded-[12px] hover:bg-gray-200 transition-colors"
            @click="fileInput?.click()"
          >
            Choose Files
          </button>
          <span class="text-gray-500" v-if="!files.length">No files chosen</span>
          <span class="text-gray-500" v-else>{{ files.length }} files selected</span>
        </div>

        <div v-if="files.length" class="space-y-2 mt-2">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center p-2 bg-gray-50 rounded-md"
          >
            <img
              v-if="previews[index] && file.mime.startsWith('image/')"
              :src="previews[index]"
              class="w-8 h-8 object-contain mr-3"
              alt="Preview"
            />
            <div v-else class="w-8 h-8 bg-gray-200 flex items-center justify-center rounded mr-3">
              <span class="text-xs">{{ file.name.split('.').pop() }}</span>
            </div>

            <div class="flex-1">
              <div class="text-sm font-medium text-blue-600 truncate">{{ file.name }}</div>
              <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
            </div>

            <button
              @click="removeFile(index)"
              class="text-red-500 hover:text-red-700 p-1"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/*"
        multiple
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUploadImageProps } from './uploadImage.types';
import useUploadImage from './useUploadImage';

interface FileData {
  base64: string;
  name: string;
  mime: string;
  size: number;
}

const props = defineProps<IUploadImageProps>()
const emits = defineEmits<{
  'file-size': [string],
  'files-count': [number]
}>()
const model = defineModel<FileData[]>({ default: () => [] })

const emitFileSize = (value: string) => {
  emits('file-size', value)
}

const emitFilesCount = (value: number) => {
  emits('files-count', value)
}

const { fileInput, files, previews, handleFileChange, removeFile, formatFileSize } = useUploadImage(props, model, emitFileSize, emitFilesCount)
</script>

