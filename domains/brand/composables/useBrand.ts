import useShowBrand from './useShowBrand'
import useCreateBrand from './useCreateBrand'
import useUpdateBrand from './useUpdateBrand'
import useDeleteBrand from './useDeleteBrand'

const useBrand = () => {
    return {
        ...useShowBrand(),
        ...useCreateBrand(),
        ...useUpdateBrand(),
        ...useDeleteBrand(),
    }
}

export default useBrand;