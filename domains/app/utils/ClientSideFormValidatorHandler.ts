const ClientSideFormValidatorHandler = async (
    cb:() => Promise<void>,
    errorBag:Ref<Record<string, string[]>>,
    InlineAlert:Ref<IInlineMessage>,
    validator: () => Record<string, string[]> | null
) => {
    const clientSideErrors = validator();
    if (clientSideErrors) {
        errorBag.value = structuredClone(clientSideErrors);
        InlineAlert.value.message = 'Please correct the errors below.';
        InlineAlert.value.type = 'danger';
        InlineAlert.value.status = true;
    } else {
        await cb();
    }
}

export default ClientSideFormValidatorHandler;