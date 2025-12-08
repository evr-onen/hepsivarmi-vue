import {allProducts} from '~/domains/product/composables/variables'
import {filterProductsForm, filteredProducts} from './variables'
import type {FilterObject} from './variables'
import type {IProduct} from '~/domains/product/types/productTypes'

const useHome = () => {
    
    const onFilterProducts = () => {
        // Start with all products
        let result: IProduct[] = [...allProducts.value]

        // Apply price filter
        if (filterProductsForm.value.price && Array.isArray(filterProductsForm.value.price) && filterProductsForm.value.price.length === 2) {
            const [minPrice, maxPrice] = filterProductsForm.value.price as number[]
            result = result.filter(product => {
                // Check if any variant product price is within the range
                return product.variantProducts.some(variant => {
                    const price = Number(variant.price)
                    return price >= minPrice && price <= maxPrice
                })
            })
        }

        // Apply other filters
        Object.keys(filterProductsForm.value).forEach(key => {
            if (key === 'price') return 

            const filterArray = filterProductsForm.value[key]
            if (!filterArray || filterArray.length === 0) return

            // check product
            if (Array.isArray(filterArray) && filterArray.length > 0 && typeof filterArray[0] === 'object') {
                const filterObjects = filterArray as FilterObject[]
                const filterIds = filterObjects.map(item => item.id)

                result = result.filter(product => {
                    // Check variant values
                    const hasMatchingVariant = product.variantProducts.some(variant => {
                        return variant.variantValues.some(variantValue => {
                            return variantValue.typeName === key && filterIds.includes(variantValue.id)
                        })
                    })

                    // Check property values
                    const hasMatchingProperty = product.properties.productPropertyValues.some((value, index) => {
                        const propName = product.properties.propertyList.props[index]?.name
                        return propName === key && filterIds.includes(value.id)
                    })

                    return hasMatchingVariant || hasMatchingProperty
                })
            }
        })

        filteredProducts.value = result
    }

    const onSelectCategory = (category: { id: string, name: string }) => {
        filteredProducts.value = allProducts.value.filter((item) => item.subCategory.id === category.id)
        console.log(filteredProducts.value)
        console.log(allProducts.value)
    }

    return {
        onFilterProducts,
        onSelectCategory
    }
}

export default useHome;