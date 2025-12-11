import {
    compareProducts,
} from './variables'
import type { ICompareCookie } from '../types/compareTypes';

const useRemoveCompare = () => {
    const compareProductCookie = useCookie<ICompareCookie>('compare_products');

    const onRemoveCompare = async(productId:string) => {
        
        if(compareProductCookie.value?.products) {
            const filteredProducts = compareProductCookie.value.products.filter(product => product !== productId)
            
            // Create new object to ensure reactivity
            compareProductCookie.value = {
                products: filteredProducts
            }
            
            compareProducts.value = compareProducts.value.filter(product => product.id !== productId)
        }
        refreshCookie('compare_products');
    }

    

    return {
        onRemoveCompare,
    }
}

export default useRemoveCompare;