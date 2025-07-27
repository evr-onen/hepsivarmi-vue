const BooleanStatusShaper = (status: boolean) => {
    return status ? {type: 'active', text: 'Yes'} : {type: 'error', text: 'No'};
}

export default BooleanStatusShaper;