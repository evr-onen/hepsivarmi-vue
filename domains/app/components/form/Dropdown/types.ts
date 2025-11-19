export interface IDropdownProps{
      panelHeight           ?: number
      panelWidth            ?: number
      options               ?: OptionsType[]
      closeOnSelect         ?: boolean
      typeCode              ?: string
      panelProc             ?: number
      resultCount           ?: number
      widthType             ?: 'full' | 'fit'
      clickOutside          ?: boolean
      openOnHover           ?: boolean
      defaultOpenPosition   ?: 'bottom' | 'top'
}

type OptionsType = {
      [key:string]: string | number | unknown
}
