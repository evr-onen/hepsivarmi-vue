import { propertyRepo} from '~/domains/property/infrastructure/propertyStorage'
import type {IPropType} from "~/domains/property/types/propertyTypes";

export default defineEventHandler(async () => {


    const resetProperties: IPropType[] = [
        {
            id: '1a',
            name: "propType 1",
            isFilterItem : true,
            values: [
                {id:'1aa', name:'prop value 1a'},
                {id:'1bb', name:'prop value 1b'},
                {id:'1cc', name:'prop value 1c'},
            ]
        },
        {
            id: '1b',
            name: "propType 2",
            isFilterItem : false,
            values: [
                {id:'2a', name:'prop value 2a'},
                {id:'2b', name:'prop value 2b'},
                {id:'2c', name:'prop value 2c'},
            ]
        },
        {
            id: '1c',
            name: "propType 3",
            isFilterItem : false,
            values: [
                {id:'3a', name:'prop value 3a'},
                {id:'3b', name:'prop value 3b'},
                {id:'3c', name:'prop value 3c'},
            ]
        },
        {
            id: '2a',
            name: "propType 4",
            isFilterItem : true,
            values: [
                {id:'4a', name:'prop value 4a'},
                {id:'4b', name:'prop value 4b'},
                {id:'4c', name:'prop value 4c'},
            ]
        },

    ]
    await propertyRepo.save(resetProperties)


    return {
        success: true,
        data: resetProperties,
        message: "success",

    }

})