import { categoryRepo } from '~/domains/category/infrastructure/categoryStorage'
import type {ICategory} from "~/domains/category/types/categoryTypes";

export default defineEventHandler(async () => {


    const resetCategories: ICategory[] = [
        {
            id: '1',
            name: "Electronics",
            subs: [
                { id: '1a', name: 'Smartphones' },
                { id: '1b', name: 'Laptops' },
                { id: '1c', name: 'Tablets' },
            ]
        },
        {
            id: '2',
            name: "Clothing",
            subs: [
                { id: '2a', name: 'T-Shirts' },
                { id: '2b', name: 'Shirts' },
                { id: '2c', name: 'Jeans' },
            ]
        },
        {
            id: '3',
            name: "Furniture",
            subs: [
                { id: '3a', name: 'Sofas' },
                { id: '3b', name: 'Tables' },
                { id: '3c', name: 'Chairs' },
            ]
        },
        {
            id: '4',
            name: "Books",
            subs: [
                { id: '4a', name: 'Novels' },
                { id: '4b', name: 'Science Fiction' },
                { id: '4c', name: 'History' },
            ]
        },
        {
            id: '5',
            name: "Food",
            subs: [
                { id: '5a', name: 'Fruits' },
                { id: '5b', name: 'Vegetables' },
                { id: '5c', name: 'Meat' },
            ]
        },
        {
            id: '6',
            name: "Home Appliances",
            subs: [
                { id: '6a', name: 'Refrigerators' },
                { id: '6b', name: 'Washing Machines' },
                { id: '6c', name: 'Vacuum Cleaners' },
            ]
        },
        {
            id: '7',
            name: "Sports & Outdoor",
            subs: [
                { id: '7a', name: 'Fitness Equipment' },
                { id: '7b', name: 'Camping & Hiking' },
                { id: '7c', name: 'Team Sports' },
            ]
        },
        {
            id: '8',
            name: "Beauty & Personal Care",
            subs: [
                { id: '8a', name: 'Skin Care' },
                { id: '8b', name: 'Hair Care' },
                { id: '8c', name: 'Makeup' },
            ]
        },
        {
            id: '9',
            name: "Toys & Games",
            subs: [
                { id: '9a', name: 'Board Games' },
                { id: '9b', name: 'Building Sets' },
                { id: '9c', name: 'Action Figures' },
            ]
        },
        {
            id: '10',
            name: "Automotive",
            subs: [
                { id: '10a', name: 'Car Accessories' },
                { id: '10b', name: 'Motor Oils & Fluids' },
                { id: '10c', name: 'Tires & Rims' },
            ]
        },
    ]
    await categoryRepo.save(resetCategories)


    return {
        success: true,
        data: resetCategories,
        message: "success",

    }

})