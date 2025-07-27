const QueryStringMaker = (object:Record<string, any>) => {
    return Object.keys(object)
        .filter(key => object[key] !== '' && object[key] !== null && object[key] !== undefined)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(object[key]))
        .join('&')
}

export default QueryStringMaker;