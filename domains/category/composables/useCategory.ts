import useShowCategory from './useShowCategory'
import useCreateCategory from './useCreateCategory'
import useDeleteCategory from './useDeleteCategory'
import useEditCategory from './useEditCategory'
const useVariant = () => {
    return {
        ...useShowCategory(),
        ...useCreateCategory(),
        ...useDeleteCategory(),
        ...useEditCategory(),
    }
}

export default useVariant;