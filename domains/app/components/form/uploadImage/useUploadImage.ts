import { onBeforeUnmount, ref, type Ref } from "vue"
import type { IUploadImageProps, UploadFileData } from "./uploadImage.types"

const useUploadImage = (props: IUploadImageProps, model: Ref<UploadFileData[]>, emitFileSize: (value: string) => void, emitFilesCount: (value: number) => void) => {
  const fileInput = ref<HTMLInputElement | null>(null)
  const files = ref<UploadFileData[]>([])
  const previews = ref<string[]>([])

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const selectedFiles = Array.from(input.files || [])

    if (selectedFiles.length) {
      // Process each file
      for (const file of selectedFiles) {
        try {
          // Create base64 data
          const base64 = await readFileAsBase64(file)

          // Create file data object
          const fileData: UploadFileData = {
            base64,
            name: file.name,
            mime: file.type,
            size: file.size
          }

          // Add to files array
          files.value.push(fileData)

          // Create preview URL for images
          if (file.type.startsWith('image/')) {
            previews.value.push(URL.createObjectURL(file))
          } else {
            previews.value.push('')
          }
        } catch (error) {
          console.error('Error processing file:', error)
        }
      }

      // Update model value
      model.value = [...files.value]

      // Reset input to allow selecting the same file again
      if (fileInput.value) fileInput.value.value = ''
    }

    // Calculate total size
    const totalSize = files.value.reduce((sum, file) => sum + file.size, 0)
    emitFileSize(formatFileSize(totalSize))
    emitFilesCount(files.value.length)
  }

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result as string)
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }

      reader.readAsDataURL(file)
    })
  }

  const removeFile = (index: number) => {
    // Revoke object URL if it exists
    if (previews.value[index]) {
      URL.revokeObjectURL(previews.value[index])
    }

    // Remove file and preview
    files.value.splice(index, 1)
    previews.value.splice(index, 1)

    // Update model
    model.value = [...files.value]

    // Calculate total size
    const totalSize = files.value.reduce((sum, file) => sum + file.size, 0)
    emitFileSize(formatFileSize(totalSize))
    emitFilesCount(files.value.length)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Cleanup preview URLs
  onBeforeUnmount(() => {
    previews.value.forEach(preview => {
      if (preview) URL.revokeObjectURL(preview)
    })
  })

  return {
    fileInput,
    files,
    previews,
    handleFileChange,
    removeFile,
    formatFileSize
  }
}

export default useUploadImage
