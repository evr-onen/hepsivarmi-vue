import type { ICompareCookie } from '../types/compareTypes';
import {
    compareProducts,
} from './variables'
import { allProducts } from '~/domains/product/composables/variables';
import useShowProduct from '~/domains/product/composables/useShowProduct';

const useShowCompare = () => {
    const { onGetProducts } = useShowProduct();
    const compareProductCookie = useCookie<ICompareCookie>('compare_products');

    const onGetCompareProducts = async() => {
        await onGetProducts()

        if(compareProductCookie.value?.products && compareProductCookie.value.products.length > 0) {
            compareProducts.value = allProducts.value.filter(product => 
                compareProductCookie.value.products.includes(product.id)
            );
        } else {
            compareProducts.value = [];
        }
    }


    return {
        onGetCompareProducts,
    }
}

export default useShowCompare;