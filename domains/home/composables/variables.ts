import type { IProduct } from "~/domains/product/types/productTypes";
import type { IFilterItemData } from "~/domains/home/types/homeTypes";

export type FilterObject = {
    id: string;
    name: string;
}
export const filterProductsForm = ref<Record<string, string[] | number[] | FilterObject[]>>({})
export const filteredProducts = ref<IProduct[]>([]);
export const filterItemData = ref<IFilterItemData>({ price: [0, 1000], categories: [] });
