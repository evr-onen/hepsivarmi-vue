export const createEmptyMoneyEntity = (money:Partial<Money> = {}):Money => {
    return structuredClone({
        raw: money.raw || 0,
        formatted: money.formatted || '0.00',
        type: money.type || 'nil',
    })
}