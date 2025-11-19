import useShowProperty from './useShowProperty'
import useCreateProperty from './useCreateProperty'
import useDeleteProperty from './useDeleteProperty'
import useEditProperty from './useEditProperty'


const useProperty = () => {
    return {
        ...useShowProperty(),
        ...useCreateProperty(),
        ...useDeleteProperty(),
        ...useEditProperty(),
    }
}

export default useProperty;