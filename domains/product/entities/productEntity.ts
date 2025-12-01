import type {
    IProduct,
    IProductCreateForm,
    IProductUpdateForm,
    IProductDeleteForm,
    IProductProperty,
    IPropertyList,
    IPropertyType,
    IPropertyValue,
    IProductPropertyValue, IVariantProduct
} from "~/domains/product/types/productTypes";

export const ProductEntity = (form:IProduct): IProduct => {
    return structuredClone({
        id                      : form.id,
        name                    : form.name || "",
        mainCategory            : form.mainCategory || {},
        subCategory             : form.subCategory || {},
        brand                   : form.brand || {},
        variantTypes            : form.variantTypes || [],
        variantProducts         : form.variantProducts ||[],
        images                  : form.images || [],
        properties              : form.properties || productPropertyEntities({})
    })
}

// forms
export const createProductFormEntity = (form:Partial<IProductCreateForm>): IProductCreateForm => {
    return structuredClone({
        name                    : form.name || "",
        mainCategory            : form.mainCategory || {},
        subCategory             : form.subCategory || {},
        brand                   : form.brand || {},
        variantTypes            : form.variantTypes || [],
        variantProducts         : form.variantProducts ||[],
        images                  : form.images || [],
        properties              : form.properties || productPropertyEntities({})
    })
}

export const createVariantProductEntity = (form:Partial<IVariantProduct>): IVariantProduct => {
    return structuredClone({
        variantValues              : form.variantValues || [],
        price                      : form.price || '',
        isDefault                  : form.isDefault || false,
    })
}

export const updateProductFormEntity = (form:Partial<IProductUpdateForm>): IProductUpdateForm => {
    return structuredClone({
        id                : form.id || '',
        name              : form.name || "",
        mainCategory      : form.mainCategory || {},
        subCategory       : form.subCategory || {},
        brand             : form.brand || {},
        variantTypes      : form.variantTypes || [],
        variantProducts   : form.variantProducts ||[],
        images            : form.images || [],
        properties        : form.properties || productPropertyEntities({})
    })
}

export const productPropertyEntities =(form:Partial<IProductProperty>): IProductProperty => {
    return structuredClone({
        propertyList                : form.propertyList || productPropertyListEntities({}),
        productPropertyValues       : form.productPropertyValues ||[ productPropertyValueEntities({}) ]
    })
}
export const productPropertyListEntities =(form:Partial<IPropertyList>): IPropertyList => {
    return structuredClone({
        id                : form.id || '',
        name              : form.name || '',
        props             : form.props || [ productPropertyTypeEntities({}) ],
    })
}
export const productPropertyTypeEntities =(form:Partial<IPropertyType>): IPropertyType => {
    return structuredClone({
        id                : form.id || '',
        name              : form.name || '',
        values             : form.values ||[ propertyValueEntities({}) ],
    })
}
export const propertyValueEntities =(form:Partial<IPropertyValue>): IPropertyValue => {
    return structuredClone({
        id                : form.id || '',
        name              : form.name || ''
    })
}
export const productPropertyValueEntities =(form:Partial<IProductPropertyValue>): IProductPropertyValue => {
    return structuredClone({
        id                 : form.id || '',
        type_id            : form.type_id || '',
        name               : form.name || ''
    })
}



export const deleteProductFormEntity = (form:Partial<IProductDeleteForm>): IProductDeleteForm => {
    return structuredClone({
        id       : form.id || "",
    })
}


// errors
export const createProductErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name      :  [],
        logo      :  []
    })
}
export const updateProductErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name      :  [],
        logo      :  []
    })
}
export const deleteProductErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id           :  [],
    })
}





