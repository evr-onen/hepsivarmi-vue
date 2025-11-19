import { variantRepo } from '~/domains/variant/infrastructure/variantStorage'
import type {IVariant} from "~/domains/variant/types/variantTypes";

export default defineEventHandler(async () => {


    const resetCategories: IVariant[] = [
        { id: '1', name: "test 1", values: [
            {id:'1a', name:'test value 1a'},
            {id:'1b', name:'test value 1b'},
            {id:'1c', name:'test value 1c'},
            ]
        },
        { id: '2', name: "test 2", values: [
            {id:'2a', name:'test value 2a'},
            {id:'2b', name:'test value 2b'},
            {id:'2c', name:'test value 2c'},
            ]
        },
        { id: '3', name: "test 3", values: [
            {id:'3a', name:'test value 3a'},
            {id:'3b', name:'test value 3b'},
            {id:'3c', name:'test value 3c'},
            ]
        },
        { id: '4', name: "test 4", values: [
            {id:'4a', name:'test value 4a'},
            {id:'4b', name:'test value 4b'},
            {id:'4c', name:'test value 4c'},
            ]
        },
        { id: '5', name: "test 5", values: [
            {id:'5a', name:'test value 5a'},
            {id:'5b', name:'test value 5b'},
            {id:'5c', name:'test value 5c'},
            ]
        },
    ]
    await variantRepo.save(resetCategories)


    return {
        success: true,
        data: resetCategories,
        message: "success",

    }

})