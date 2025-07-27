const BlobFileSaver = async (
    data: Blob | Uint8Array | ArrayBuffer, filename?: string, contentType?: string
) => {
    try {
        let blob: Blob;

        if (data instanceof Blob) {
            blob = data;
        } else {
            blob = new Blob([data], { type: contentType || 'application/octet-stream' });
        }

        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename ?? new Date().toString();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(downloadUrl);
    }catch (error){
        return Promise.reject(error);
    }
}

export default BlobFileSaver;