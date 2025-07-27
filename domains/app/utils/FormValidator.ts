import type {AnyObject, ObjectSchema} from "yup";

const FormValidator = <T>(schema:ObjectSchema<AnyObject>, form:T):null | Record<string, string[]> => {
    try {
        schema.validateSync(form, { abortEarly: false });
        return null;
    }catch (error:unknown){
        return ClientSideErrorMaker(error);
    }
}

export default FormValidator;