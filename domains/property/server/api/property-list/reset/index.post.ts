import { propertyListRepo } from '~/domains/property/infrastructure/propertyListStorage'
import type { IPropertyList } from "~/domains/property/types/propertyListTypes";

export default defineEventHandler(async () => {


    const resetPropertyLists: IPropertyList[] = [
        {
            id: '1',
            name: "General Product Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1b', name: 'Waterproof' },
                { id: '1c', name: 'Material' },
                { id: '2a', name: 'Warranty' },
                { id: '2b', name: 'Weight' },
            ]
        },
        {
            id: '2',
            name: "Clothing Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1c', name: 'Material' },
                { id: '3a', name: 'Color Fastness' },
                { id: '3b', name: 'Care Instructions' },
                { id: '2c', name: 'Dimensions' },
            ]
        },
        {
            id: '3',
            name: "Electronics Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1b', name: 'Waterproof' },
                { id: '2a', name: 'Warranty' },
                { id: '3c', name: 'Certification' },
                { id: '4b', name: 'Compatibility' },
            ]
        },
        {
            id: '4',
            name: "Home Appliances Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '2a', name: 'Warranty' },
                { id: '4a', name: 'Energy Rating' },
                { id: '3c', name: 'Certification' },
                { id: '2b', name: 'Weight' },
            ]
        },
        {
            id: '5',
            name: "Furniture Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1c', name: 'Material' },
                { id: '2c', name: 'Dimensions' },
                { id: '2b', name: 'Weight' },
                { id: '2a', name: 'Warranty' },
            ]
        },
        {
            id: '6',
            name: "Sports & Outdoor Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1b', name: 'Waterproof' },
                { id: '1c', name: 'Material' },
                { id: '3c', name: 'Certification' },
                { id: '2b', name: 'Weight' },
            ]
        },
        {
            id: '7',
            name: "Beauty & Personal Care Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '3c', name: 'Certification' },
                { id: '2a', name: 'Warranty' },
                { id: '2c', name: 'Dimensions' },
            ]
        },
        {
            id: '8',
            name: "Automotive Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1b', name: 'Waterproof' },
                { id: '2a', name: 'Warranty' },
                { id: '3c', name: 'Certification' },
                { id: '2b', name: 'Weight' },
            ]
        },
        {
            id: '9',
            name: "Food Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '3c', name: 'Certification' },
                { id: '2c', name: 'Dimensions' },
            ]
        },
        {
            id: '10',
            name: "Books Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1c', name: 'Material' },
                { id: '2c', name: 'Dimensions' },
                { id: '2b', name: 'Weight' },
            ]
        },
        {
            id: '11',
            name: "Toys & Games Properties",
            props: [
                { id: '1a', name: 'Origin' },
                { id: '1c', name: 'Material' },
                { id: '3c', name: 'Certification' },
                { id: '2a', name: 'Warranty' },
                { id: '2c', name: 'Dimensions' },
            ]
        },
    ]
    await propertyListRepo.save(resetPropertyLists)


    return {
        success: true,
        data: resetPropertyLists,
        message: "success",

    }

})