import type {Severity} from "oxc-parser";

export interface IButton{
      label            ?: string
      color            ?: string
      size             ?: SizeType
      severity         ?: SeverityType
}

type SizeType = "sm" | "md" | "lg"
type SeverityType = "outline" | "filled" | 'gradient'

