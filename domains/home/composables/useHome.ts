import {allProducts} from '~/domains/product/composables/variables'
import {filterProductsForm, filteredProducts, filterItemData} from './variables'
import type {FilterObject} from './variables'
import type {IProduct} from '~/domains/product/types/productTypes'
import useAuthStore from '~/domains/auth/stores/useAuthStore';

const useHome = () => {
  const { user } = useAuthStore();  
  

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

    const prepareFilterItemData = () => {
        let minPrice: number | null = null;
        let maxPrice = 0;
        filterItemData.value.categories = []
        allProducts.value.forEach(product => {
      
          if (!filterItemData.value.categories.some(category => category.id === product.subCategory.id)) {
            filterItemData.value.categories.push({ id: product.subCategory.id, name: product.subCategory.name });
          }
      
          // price data
          product.variantProducts.forEach(variant => {
            const price = Number(variant.price);
      
            if (minPrice === null || price < minPrice) {
              minPrice = price;
            }
      
            if (price > maxPrice) {
              maxPrice = price;
            }
      
            // variant data
            variant.variantValues.forEach(value => {
              if (value.typeName && value.name) {
                if (!filterItemData.value[value.typeName]) {
                  filterItemData.value[value.typeName] = [];
                }
                const existingArray = filterItemData.value[value.typeName] as FilterObject[];
                if (!existingArray.some(item => item.id === value.id)) {
                  existingArray.push({ id: value.id, name: value.name });
                }
              }
            });
          });
      
          product.properties.productPropertyValues.map((value, index) => {
            const propName = product.properties.propertyList.props[index].name
      
            if (value.id && value.name) {
              if (!filterItemData.value[propName]) {
                filterItemData.value[propName] = [];
              }
              const existingArray = filterItemData.value[propName] as FilterObject[];
              if (!existingArray.some(item => item.id === value.id)) {
                existingArray.push({ id: value.id, name: value.name });
              }
            }
          });
        })
        filterItemData.value.price = [minPrice ?? 0, maxPrice];
      
      }

      const isItemSelected = (key: string, item: FilterObject | number): boolean => {
        const formArray = filterProductsForm.value[key];
        if (!formArray) return false;
      
        if (typeof item === 'object') {
          return (formArray as FilterObject[]).some(formItem =>
            typeof formItem === 'object' && formItem.id === item.id
          );
        }
        return (formArray as (string | number)[]).includes(item);
      }

      const isitWished = (productId: string) => {
        return allWishlistsByUser.value.some(wishlist => {
          return wishlist.product_id === productId && wishlist.user_id === user.id
        })
      }

      const handleFilterItemClick = (key: string, item: FilterObject | number) => {
        if (!filterProductsForm.value[key]) {
          filterProductsForm.value[key] = [];
        }
      
        if (typeof item === 'object') {
          const existingArray = filterProductsForm.value[key] as FilterObject[];
          const index = existingArray.findIndex(formItem =>
            typeof formItem === 'object' && formItem.id === item.id
          );
          if (index !== -1) {
            existingArray.splice(index, 1);
            if (existingArray.length === 0) {
              Reflect.deleteProperty(filterProductsForm.value, key);
            }
          } else {
            existingArray.push(item);
          }
        } else {
          const existingArray = filterProductsForm.value[key] as (string | number)[];
          if (existingArray.includes(item)) {
            existingArray.splice(existingArray.indexOf(item), 1);
            if (existingArray.length === 0) {
              Reflect.deleteProperty(filterProductsForm.value, key);
            }
          } else {
            existingArray.push(item);
          }
        }
      }

    return {
        prepareFilterItemData,
        onFilterProducts,
        onSelectCategory,
        isItemSelected,
        isitWished,
        handleFilterItemClick
    }
}

export default useHome;