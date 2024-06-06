import { storage } from '../../util/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File, userID: string) => {
    const storageRef = ref(storage, `profilePictire/${userID}/${file.name}`);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};