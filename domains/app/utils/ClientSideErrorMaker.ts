import {ValidationError} from "yup";

const ClientSideErrorMaker = (error:unknown | ValidationError): null | Record<string, string[]> => {
    if (error instanceof ValidationError) {
        const errors: Record<string, string[]> = {};
        error.inner.forEach((err) => {
            if (err.path) {
                const normalizedPath = err.path.replace(/\[(\d+)\]/g, '.$1');
                if (!errors[normalizedPath]) {
                    errors[normalizedPath] = [];
                }
                errors[normalizedPath].push(err.message);
            }
        });
        return errors;
    }
    return null;
}

export default ClientSideErrorMaker;