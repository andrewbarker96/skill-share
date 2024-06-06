import imageCompression from 'browser-image-compression';

export const compressImage = async (imageFile: File) => {
    const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 500,
        useWebWorker: true
    };

    try {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile;
    } catch (error){
        console.error("Error compressing image: ", error)
        throw error;
    }
};