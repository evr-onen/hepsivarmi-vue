import { propertyListRepo } from '~/domains/property/infrastructure/propertyListStorage'
import type {IPropertyList} from "~/domains/property/types/propertyListTypes";

export default defineEventHandler(async () => {


    const resetCategories: IPropertyList[] = [
        { id: '1', name: "test 1", props: [
            {id:'1a', name:'propType 1'},
            {id:'1b', name:'propType 2'},
            {id:'1c', name:'propType 3'},
            {id:'2a', name:'propType 3'},
            ]
        },
        { id: '2', name: "propType 2", props: [

                {id:'1b', name:'propType 2'},

                {id:'2a', name:'propType 3'},
            ]
        },
        { id: '3', name: "propType 3", props: [
                {id:'1a', name:'propType 1'},
                {id:'2a', name:'propType 3'},
            ]
        },
        { id: '4', name: "test 4", props: [
                {id:'1a', name:'propType 1'},
                {id:'1c', name:'propType 3'},
            ]
        },

    ]
    await propertyListRepo.save(resetCategories)


    return {
        success: true,
        data: resetCategories,
        message: "success",

    }

})