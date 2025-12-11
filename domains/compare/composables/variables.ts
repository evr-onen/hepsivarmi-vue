import type { IProduct } from "~/domains/product/types/productTypes";
import type { ICompareCreateForm, ICompareDeleteForm } from "../types/compareTypes";
import { createCompareFormEntity, deleteCompareFormEntity } from "../entities/compareEntity";

// modals
export const isOpenCreateCompareModal = ref<boolean>(false)

export const compareProducts = ref<IProduct[]>([])
