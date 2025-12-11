import useShowCompare from './useShowCompare'
import useAddCompare from './useAddCompare'
import useRemoveCompare from './useRemoveCompare'

const useCompare = () => {
    return {
        ...useShowCompare(),
        ...useAddCompare(),
        ...useRemoveCompare(),
    }
}

export default useCompare;