import type { IProduct } from "~/domains/product/types/productTypes";

export type FilterObject = {
    id: string;
    name: string;
}
export const filterProductsForm = ref<Record<string, string[] | number[] | FilterObject[]>>({})
export const filteredProducts = ref<IProduct[]>([]);

