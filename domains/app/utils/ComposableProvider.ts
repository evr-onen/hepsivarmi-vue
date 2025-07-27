const ComposableProvider = <T extends Record<string, any>>(items: T) => {
    Object.entries(items).forEach(([key, value]) => {
        provide(key, value)
    })

    return () => items
}

export default ComposableProvider;