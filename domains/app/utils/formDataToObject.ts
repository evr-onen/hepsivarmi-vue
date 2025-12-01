type NormalizedValue = string | boolean | File

const isIndexSegment = (segment?: string): boolean =>
  segment !== undefined && /^\d+$/.test(segment)

const normalizeValue = (value: FormDataEntryValue): NormalizedValue => {
  if (value instanceof File) {
    return value
  }

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return value
}

const toPathSegments = (key: string): string[] =>
  key
    .replace(/\]/g, '')
    .split('[')
    .flatMap((part) => part.split('.'))
    .filter(Boolean)

const setNestedValue = (target: Record<string, any>, path: string[], value: FormDataEntryValue) => {
  const assign = (current: any, depth: number) => {
    const segment = path[depth]
    const isLast = depth === path.length - 1

    if (isLast) {
      if (isIndexSegment(segment)) {
        if (!Array.isArray(current)) {
          throw new Error(`Unexpected index "${segment}" for non-array target.`)
        }

        current[Number(segment)] = normalizeValue(value)
        return
      }

      current[segment] = normalizeValue(value)
      return
    }

    const nextSegment = path[depth + 1]

    if (isIndexSegment(segment)) {
      if (!Array.isArray(current)) {
        throw new Error(`Unexpected index "${segment}" for non-array target.`)
      }

      const idx = Number(segment)
      if (current[idx] === undefined) {
        current[idx] = isIndexSegment(nextSegment) ? [] : {}
      }

      assign(current[idx], depth + 1)
      return
    }

    if (current[segment] === undefined) {
      current[segment] = isIndexSegment(nextSegment) ? [] : {}
    }

    assign(current[segment], depth + 1)
  }

  assign(target, 0)
}

const formDataToObject = (formData: FormData) => {
  const result: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    const path = toPathSegments(key)
    if (!path.length) {
      continue
    }

    if (isIndexSegment(path[0])) {
      throw new Error(`Form keys cannot start with an index: "${key}"`)
    }

    if (path.length === 1) {
      result[path[0]] = normalizeValue(value)
      continue
    }

    if (result[path[0]] === undefined) {
      result[path[0]] = isIndexSegment(path[1]) ? [] : {}
    }

    setNestedValue(result, path, value)
  }

  return result
}

export default formDataToObject


