type SerializableValue = string | number | boolean | Date | Blob | File

const isFileLike = (value: unknown): value is File | Blob =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob)

const isDate = (value: unknown): value is Date =>
  value instanceof Date

const appendPrimitive = (formData: FormData, key: string, value: SerializableValue) => {
  if (isDate(value)) {
    formData.append(key, value.toISOString())
    return
  }

  if (isFileLike(value)) {
    formData.append(key, value)
    return
  }

  formData.append(key, String(value))
}

const buildFormData = (data: object, formData: FormData = new FormData(), parentKey?: string): FormData => {
  if (!data || typeof data !== 'object') {
    return formData
  }

  Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}[${key}]` : key

    if (value === undefined || value === null) {
      return
    }

    if (isFileLike(value) || typeof value !== 'object' || isDate(value)) {
      appendPrimitive(formData, formKey, value as SerializableValue)
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item === undefined || item === null) {
          return
        }

        const arrayKey = `${formKey}[${index}]`

        if (isFileLike(item) || typeof item !== 'object' || isDate(item)) {
          const targetKey = isFileLike(item) ? formKey : arrayKey
          appendPrimitive(formData, targetKey, item as SerializableValue)
          return
        }

        buildFormData(item as Record<string, unknown>, formData, arrayKey)
      })

      return
    }

    buildFormData(value as Record<string, unknown>, formData, formKey)
  })

  return formData
}

export default buildFormData

