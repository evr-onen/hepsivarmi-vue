import {AxiosError} from "axios";

const AxiosActionHandler = async (
    cb:() => Promise<void>,
    pending?:Ref<boolean>,
    errorBag?:Ref<Record<string, unknown>>,
    InlineAlert?:Ref<IInlineMessage>,
    InlineAlertSuccessMessage?:string,
):Promise<void> => {
    if (errorBag) errorBag.value = structuredClone({});
    if (pending) pending.value = true;
    if(InlineAlert) {
        InlineAlert.value.status = false;
    }
    try {
        await cb()
        if(InlineAlert && InlineAlertSuccessMessage) {
            InlineAlert.value.type = 'success';
            InlineAlert.value.message = InlineAlertSuccessMessage;
            InlineAlert.value.title = "Form submitted successfully";
            InlineAlert.value.closable = false;
            InlineAlert.value.status = true;
        }
    }catch (error:unknown) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 422 && errorBag) {
                for(const [key, value] of Object.entries(error.response?.data.errors)) {
                    if(Array.isArray(value) && value.length > 0) {
                        errorBag.value[key] = value[0] as string
                    }else{
                        errorBag.value[key] = value as string
                    }

                }
            }
            if (InlineAlert) {
                InlineAlert.value.type = 'error';
                InlineAlert.value.message = error.response?.data.message;
                InlineAlert.value.title = "Error";
                InlineAlert.value.closable = false;
                InlineAlert.value.status = false;
            }
        }
        return Promise.reject(error);
    }finally {
        if (pending)  pending.value = false;
    }
}

export default AxiosActionHandler;