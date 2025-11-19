import useShowVariant from './useShowVariant'
import useCreateVariant from './useCreateVariant'
const useVariant = () => {
    return {
        ...useShowVariant(),
        ...useCreateVariant(),
    }
}

export default useVariant;