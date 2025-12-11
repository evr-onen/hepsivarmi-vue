import type { IProduct } from '~/domains/product/types/productTypes';
import type { ICompareCookie } from '../types/compareTypes';
import {
    compareProducts,
} from './variables'
import { compareCookieEntity } from '../entities/compareEntity';

const useAddCompare = () => {
    const compareProductCookie = useCookie<ICompareCookie>('compare_products');

    const onCreateCompare = async(productData:IProduct) => {
        if(compareProductCookie.value){
            // Check if product already exists
            if(compareProductCookie.value.products.includes(productData.id)) {
                return;
            }
            
            compareProductCookie.value = {
                products: [...compareProductCookie.value.products, productData.id]
            }
            
            compareProducts.value.push(productData);

        }else{
            compareProductCookie.value = compareCookieEntity({
                products: [productData.id],
            })
            compareProducts.value.push(productData);
        }
        refreshCookie('compare_products');
    }
   
    return {
        onCreateCompare,
    }
}

export default useAddCompare;