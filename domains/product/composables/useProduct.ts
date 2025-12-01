import useShowProduct from './useShowProduct'
import useCreateProduct from './useCreateProduct'
import useDeleteProduct from './useDeleteProduct'
import useUpdateProduct from './useUpdateProduct'


const useProduct = () => {
    return {
        ...useShowProduct(),
        ...useCreateProduct(),
        ...useDeleteProduct(),
        ...useUpdateProduct(),
    }
}

export default useProduct;