import { db } from "../../util/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


// Get Messages
export const getMessages = async () => {
  const querySnapshot = await getDocs(collection(db, "messages"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Send Message
export const sendMessage = async (message: any) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), message);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

