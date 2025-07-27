const CreateImagePreviewURL = (file:File): string => {
    if (!file.type.startsWith('image/')) {
        throw new Error('Selected file is not an image');
    }
    return URL.createObjectURL(file);
}

export default CreateImagePreviewURL;