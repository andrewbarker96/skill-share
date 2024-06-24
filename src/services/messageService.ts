import { db, auth } from "../../util/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  getDoc,
  limit,
  onSnapshot
} from "firebase/firestore";

// Define the User interface
interface User {
  id: string;
  username: string;
  email: string;
  UID: string;
}

interface Chat {
  id: string;
  users: string[];
  createdAt: Date;
}

interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  status: string;
}


// Find users by email or username
export const findUsers = async (search: string): Promise<User[]> => {
  try {
    // Search by email
    const emailQuery = query(
      collection(db, "userProfiles"),
      where("email", "==", search)
    );
    const emailSnapshot = await getDocs(emailQuery);

    // Search by username
    const usernameQuery = query(
      collection(db, "userProfiles"),
      where("username", "==", search)
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    // Combine results
    const usersMap = new Map();
    emailSnapshot.docs.forEach((doc) => {
      const user = doc.data();
      usersMap.set(doc.id, {
        id: doc.id,
        username: user.username,
        email: user.email,
        UID: user.uid,
      });
    });
    usernameSnapshot.docs.forEach((doc) => {
      const user = doc.data();
      if (!usersMap.has(doc.id)) {
        usersMap.set(doc.id, {
          id: doc.id,
          username: user.username,
          email: user.email,
          UID: user.uid,
        });
      }
    });

    return Array.from(usersMap.values());
  } catch (error) {
    console.error("Error finding users:", error);
    return [];
  }
};

// Create a new chat between current user and target user
export const createChat = async (targetUID: string): Promise<string> => {
  try {
    const currentUserUID = auth.currentUser?.uid;
    if (!currentUserUID) {
      throw new Error("User not authenticated");
    }

    // Ensure the target user exists
    const targetUserSnapshot = await getDocs(
      query(collection(db, "userProfiles"), where("uid", "==", targetUID))
    );
    if (targetUserSnapshot.empty) {
      throw new Error("No user found with the provided search criteria");
    }

    // Check if a chat already exists
    const chatsQuery = query(
      collection(db, "chats"),
      where("users", "array-contains", currentUserUID)
    );
    const chatsSnapshot = await getDocs(chatsQuery);

    for (const doc of chatsSnapshot.docs) {
      const chat = doc.data();
      if (chat.users.includes(targetUID)) {
        return doc.id;
      }
    }

    // Create a new chat if it doesn't exist
    const newChatRef = await addDoc(collection(db, "chats"), {
      users: [currentUserUID, targetUID],
      createdAt: new Date(),
    });

    await updateDoc(doc(db, "chats", newChatRef.id), {
      chatId: newChatRef.id,
    });
    const chatId = newChatRef.id;
    console.log(chatId, targetUID);
    return chatId;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

// Send a message in a chat
export const sendMessage = async (chatId: string, text: string) => {
  try {
    if (!chatId) {
      throw new Error("Invalid chat ID");
    }
    const currentUserUID = auth.currentUser?.uid;
    if (!currentUserUID) {
      throw new Error("User not authenticated");
    }
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    await addDoc(messagesRef, {
      senderId: currentUserUID,
      message: text,
      timestamp: new Date(),
      status: 'sent',
    });
    console.log("Message sent:", text);
    return text;
  } catch (error) {
    console.error("Error sending message: ", error);
    throw error;
  }
};

// Helper function to check if a user is part of a chat
export const isUserInChat = async (chatId: string, userId: string): Promise<boolean> => {
  try {
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);
    if (chatDoc.exists()) {
      const chatData = chatDoc.data();
      return chatData.users.includes(userId);
    }
    return false;
  } catch (error) {
    console.error("Error checking user in chat:", error);
    return false;
  }
};

// Get messages from a chat
export const getMessages = async (chatId: string) => {
  try {
    const currentUserUID = auth.currentUser?.uid;
    if (!currentUserUID) {
      throw new Error("User not authenticated");
    }

    const userInChat = await isUserInChat(chatId, currentUserUID);
    if (!userInChat) {
      throw new Error("User is not part of the chat");
    }

    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const messagesQuery = query(messagesRef, orderBy("timestamp"));
    const messagesSnapshot = await getDocs(messagesQuery);
    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];

    messagesSnapshot.docs.forEach(async (doc) => {
      if (doc.data().senderId !== currentUserUID && doc.data().status === 'sent') {
        await updateMessageStatusToDelivered(chatId, doc.id);
      }
    });

    const newMessageFromOtherUser = messages.find(
      (message) => message.senderId !== currentUserUID && message.status === 'sent'
    );

    if (newMessageFromOtherUser) {
      await updateLastSentMessageStatus(chatId, currentUserUID);
    }



    return messages;
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error;
  }
};
export const onMessagesSnapshot = (chatId: string, callback: (messages: Message[]) => void) => {
  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const messagesQuery = query(messagesRef, orderBy("timestamp"));

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];

    callback(messages);
  });
};
export const getChat = async (chatId: string): Promise<Chat | null> => {
  const chatDoc = await getDoc(doc(db, "chats", chatId));
  if (chatDoc.exists()) {
    return chatDoc.data() as Chat;
  } else {
    return null;
  }
};



// Updating message statuses
export const updateMessageStatusToDelivered = async (chatId: string, messageId: string) => {
  try {
    const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
    await updateDoc(messageRef, {
      status: 'delivered'
    });
    console.log(`Message ${messageId} updated to delivered`);
  } catch (error) {
    console.error("Error updating message status to delivered:", error);
    throw error;
  }
};

export const updateMessageStatusToRead = async (chatId: string, messageId: string) => {
  try {
    const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
    await updateDoc(messageRef, {
      status: 'read'
    });
    console.log(`Message ${messageId} updated to read`);
  } catch (error) {
    console.error("Error updating message status to read:", error);
    throw error;
  }
};

// Helper function to update the last message status of the current user to "receivedReply"
export const updateLastSentMessageStatus = async (chatId: string, currentUserId: string) => {
  const messagesRef = collection(db, `chats/${chatId}/messages`);
  const messagesQuery = query(
    messagesRef,
    where("senderId", "==", currentUserId),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const messagesSnapshot = await getDocs(messagesQuery);
  
  if (!messagesSnapshot.empty) {
    const lastMessageDoc = messagesSnapshot.docs[0];
    await updateDoc(lastMessageDoc.ref, { status: 'receivedReply' });
    console.log(`Last message of ${currentUserId} in chat ${chatId} updated to receivedReply`);
  }
};

