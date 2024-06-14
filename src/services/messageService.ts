import { db, auth } from "../../util/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const user = auth.currentUser;

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "userProfiles"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const findUser = async (email: string) => {
  try {
    const usersRef = collection(db, "userProfiles");
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error finding user: ", error);
  }
};

export const sendMessage = async (
  chatId: string,
  email: string,
  message: any,
  senderID: string
) => {
  try {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    senderID = user?.uid || "";
    await addDoc(messagesRef, message),
      {
        sender: senderID,
        to: "",
        text: message,
        timestamp: serverTimestamp(),
      };
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

export const receiveMessage = async (chatId: string) => {
  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const querySnapshot = await getDocs(messagesRef);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
