import {
    propertyListCreateFormEntity,
    propertyListUpdateFormEntity,
    propertyListDeleteFormEntity,
} from "~/domains/property/entities/propertyListEntity";
import {
    propertyCreateFormEntity,
    propertyUpdateFormEntity,
    propertyDeleteFormEntity, propertyValueCreateFormEntity, propertyValueDeleteFormEntity,
    propertyValueUpdateFormEntity
} from "~/domains/property/entities/propertyEntity";
import {createInlineAlert} from "~/domains/app/entities/InlineAlertEntity";

import type {
    IPropertyList,
    IPropertyListCreateForm,
    IPropertyListUpdateForm,
    IPropertyListDeleteForm,
} from "~/domains/property/types/propertyListTypes";

import type {
    IPropType,
    IPropTypeCreateForm,
    IPropTypeUpdateForm,
    IPropTypeDeleteForm, IPropTypeValueUpdateForm, IPropTypeValueDeleteForm, IPropTypeValueCreateForm,
} from "~/domains/property/types/propertyTypes";

export const isOpenAddPropModal = ref<boolean>(false)

// property list
export const allPropertyList = ref<IPropertyList[]>([])
export const isOpenPropertyListCreateModal = ref<boolean>(false)
export const isOpenPropertyListEditModal = ref<boolean>(false)

export const propertyListCreateForm = ref<IPropertyListCreateForm>(propertyListCreateFormEntity({}))
export const propertyListCreateErrors = ref<TErrorBag>({});
export const propertyListUpdateForm = ref<IPropertyListUpdateForm>(propertyListUpdateFormEntity({}))
export const propertyListUpdateErrors = ref<TErrorBag>({});
export const propertyListDeleteForm = ref<IPropertyListDeleteForm>(propertyListDeleteFormEntity({}))
export const propertyListDeleteErrors = ref<TErrorBag>({});
export const PropertyListFormInlineAlert = ref<IInlineMessage>(createInlineAlert());
export const propertyListGetErrors = ref<TErrorBag>({})

// Properties
export const allProperties = ref<IPropType[]>([])
export const isOpenCreatePropTypeModal = ref<boolean>(false)
export const isOpenEditPropTypeModal = ref<boolean>(false)

export const propertyCreateForm = ref<IPropTypeCreateForm>(propertyCreateFormEntity({}))
export const propertyCreateErrors = ref<TErrorBag>({});
export const propertyUpdateForm = ref<IPropTypeUpdateForm>(propertyUpdateFormEntity({}))
export const propertyUpdateErrors = ref<TErrorBag>({});
export const propertyDeleteForm = ref<IPropTypeDeleteForm>(propertyDeleteFormEntity({}))
export const propertyDeleteErrors = ref<TErrorBag>({});

// propValue
export const isOpenCreatePropTypeValueModal = ref<boolean>(false)
export const isOpenEditPropTypeValueModal = ref<boolean>(false)
export const isOpenEditPropValueModal = ref<boolean>(false)

export const propertyValueCreateForm = ref<IPropTypeValueCreateForm>(propertyValueCreateFormEntity({}))
export const propertyValueUpdateForm = ref<IPropTypeValueUpdateForm>(propertyValueUpdateFormEntity({}))
export const propertyValueDeleteForm = ref<IPropTypeValueDeleteForm>(propertyValueDeleteFormEntity({}))
export const propertyValueCreateErrors = ref<TErrorBag>({});
export const propertyValueUpdateErrors = ref<TErrorBag>({});
export const propertyValueDeleteErrors = ref<TErrorBag>({});



export const PropertyFormInlineAlert = ref<IInlineMessage>(createInlineAlert());
export const propertyGetErrors = ref<TErrorBag>({})
export const propertyInlineAlert = ref<IInlineMessage>(createInlineAlert({}));






