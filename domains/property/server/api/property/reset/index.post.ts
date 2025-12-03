import { propertyRepo} from '~/domains/property/infrastructure/propertyStorage'
import type {IPropType} from "~/domains/property/types/propertyTypes";

export default defineEventHandler(async () => {


    const resetProperties: IPropType[] = [
        {
            id: '1a',
            name: "Origin",
            isFilterItem: true,
            values: [
                { id: '1aa', name: 'Made in Turkey' },
                { id: '1bb', name: 'Made in China' },
                { id: '1cc', name: 'Made in Germany' },
                { id: '1dd', name: 'Made in USA' },
                { id: '1ee', name: 'Made in Italy' },
            ]
        },
        {
            id: '1b',
            name: "Waterproof",
            isFilterItem: true,
            values: [
                { id: '2a', name: 'Not Waterproof' },
                { id: '2b', name: 'Water Resistant' },
                { id: '2c', name: 'Waterproof (IPX4)' },
                { id: '2d', name: 'Waterproof (IPX7)' },
                { id: '2e', name: 'Waterproof (IPX8)' },
            ]
        },
        {
            id: '1c',
            name: "Material",
            isFilterItem: false,
            values: [
                { id: '3a', name: 'Cotton' },
                { id: '3b', name: 'Polyester' },
                { id: '3c', name: 'Leather' },
                { id: '3d', name: 'Wool' },
                { id: '3e', name: 'Silk' },
                { id: '3f', name: 'Denim' },
            ]
        },
        {
            id: '2a',
            name: "Warranty",
            isFilterItem: false,
            values: [
                { id: '4a', name: '6 Months' },
                { id: '4b', name: '1 Year' },
                { id: '4c', name: '2 Years' },
                { id: '4d', name: '3 Years' },
                { id: '4e', name: '5 Years' },
            ]
        },
        {
            id: '2b',
            name: "Weight",
            isFilterItem: false,
            values: [
                { id: '5a', name: 'Light (< 1kg)' },
                { id: '5b', name: 'Medium (1-5kg)' },
                { id: '5c', name: 'Heavy (5-10kg)' },
                { id: '5d', name: 'Very Heavy (> 10kg)' },
            ]
        },
        {
            id: '2c',
            name: "Dimensions",
            isFilterItem: false,
            values: [
                { id: '6a', name: 'Small' },
                { id: '6b', name: 'Medium' },
                { id: '6c', name: 'Large' },
                { id: '6d', name: 'Extra Large' },
            ]
        },
        {
            id: '3a',
            name: "Color Fastness",
            isFilterItem: true,
            values: [
                { id: '7a', name: 'Excellent' },
                { id: '7b', name: 'Good' },
                { id: '7c', name: 'Fair' },
                { id: '7d', name: 'Poor' },
            ]
        },
        {
            id: '3b',
            name: "Care Instructions",
            isFilterItem: false,
            values: [
                { id: '8a', name: 'Machine Washable' },
                { id: '8b', name: 'Hand Wash Only' },
                { id: '8c', name: 'Dry Clean Only' },
                { id: '8d', name: 'Do Not Wash' },
            ]
        },
        {
            id: '3c',
            name: "Certification",
            isFilterItem: true,
            values: [
                { id: '9a', name: 'CE Certified' },
                { id: '9b', name: 'ISO Certified' },
                { id: '9c', name: 'FDA Approved' },
                { id: '9d', name: 'Organic Certified' },
            ]
        },
        {
            id: '4a',
            name: "Energy Rating",
            isFilterItem: true,
            values: [
                { id: '10a', name: 'A+++' },
                { id: '10b', name: 'A++' },
                { id: '10c', name: 'A+' },
                { id: '10d', name: 'A' },
                { id: '10e', name: 'B' },
            ]
        },
        {
            id: '4b',
            name: "Compatibility",
            isFilterItem: false,
            values: [
                { id: '11a', name: 'Universal' },
                { id: '11b', name: 'iOS Compatible' },
                { id: '11c', name: 'Android Compatible' },
                { id: '11d', name: 'Windows Compatible' },
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