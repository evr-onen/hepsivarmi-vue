export interface ISelectProps{
options         : OptionsType[]
placeholder    ?: string
optionLabel    ?: string
label          ?: string
size           ?: sizeType
disabled       ?: boolean
error          ?: boolean
errorMessage   ?: string
clearable      ?: boolean
isLoading      ?: boolean
onLoad         ?: () => Promise<OptionsType[]>
required       ?: boolean
}

export type OptionsType = {
  [key:string]: string | number | unknown
}

type sizeType = 'small' | 'normal' | 'large'
