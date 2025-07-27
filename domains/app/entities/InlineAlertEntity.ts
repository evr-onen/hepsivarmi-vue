export function createInlineAlert(InlineAlert:Partial<IInlineMessage> = {}):IInlineMessage {
    return structuredClone({
        status    : InlineAlert.status || false,
        type      : InlineAlert.type || "info",
        title     : InlineAlert.title || "",
        message   : InlineAlert.message || "",
        closable  : InlineAlert.closable || true,
    })
}