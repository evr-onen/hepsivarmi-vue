import type { IProduct } from "~/domains/product/types/productTypes";

export interface IFilterItemData {
    price: number[];
    categories: { id: string, name: string }[];
    [key: string]: FilterObject[] | number[] | { id: string, name: string }[];
  }
  
export interface IPriceSliderProps {
    label?: string;
    min: number;
    max: number;
}

export interface IPageBannerProps {
    title: string;
    description: string;
    image: string;
}

export interface IProductCardProps {
    productData: IProduct;
    isInWishlist: boolean;
}