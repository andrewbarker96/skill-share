import { db, auth } from "../../util/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Firestore,
  DocumentData,
} from "firebase/firestore";

interface User {
  id: string;
  username: string;
  email: string;
  UID: string;
}

export const listUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await getDocs(collection(db, "userProfiles"));
    const users: User[] = snapshot.docs.map((doc) => {
      const user = doc.data() as User;
      return {
        id: doc.id,
        username: user.username,
        email: user.email,
        UID: user.UID,
      };
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error getting document:", error);
    return [];
  }
};

export const findUsers = async (search: string): Promise<User[]> => {
  try {
    // Query for matching emails
    const emailQuery = query(
      collection(db, "userProfiles"),
      where("email", "==", search)
    );
    const emailSnapshot = await getDocs(emailQuery);

    // Query for matching usernames
    const usernameQuery = query(
      collection(db, "userProfiles"),
      where("username", "==", search)
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    // Combine and deduplicate results
    const usersMap = new Map<string, User>();
    emailSnapshot.docs.forEach((doc) => {
      const user = doc.data() as User;
      console.log("Found by Email", user);
      usersMap.set(doc.id, {
        id: doc.id,
        username: user.username,
        email: user.email,
        UID: user.UID,
      });
    });
    usernameSnapshot.docs.forEach((doc) => {
      const user = doc.data() as User;
      console.log("Found by Username", user);
      if (!usersMap.has(doc.id)) {
        // Avoid duplicates
        usersMap.set(doc.id, {
          id: doc.id,
          username: user.username,
          email: user.email,
          UID: user.UID,
        });
      }
    });

    const users: User[] = Array.from(usersMap.values());
    return users;
  } catch (error) {
    console.error("Error getting document:", error);
    return [];
  }
};

export const createChat = async (search: string): Promise<string> => {
  try {
    // Find the target user
    const targetUsers = await findUsers(search);

    if (targetUsers.length === 0) {
      throw new Error("No user found with the provided search criteria");
    }

    const targetUser = targetUsers[0]; // Assuming we take the first matched user
    const targetUID = targetUser.UID;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user found");
    }

    const currentUID = currentUser.uid;

    // Check if a chat already exists between the two users
    const chatQuery = query(
      collection(db, "Chats"),
      where("user1", "in", [currentUID, targetUID]),
      where("user2", "in", [currentUID, targetUID])
    );
    const chatSnapshot = await getDocs(chatQuery);

    if (!chatSnapshot.empty) {
      // Chat already exists, reuse the existing chat document ID
      const existingChatDoc = chatSnapshot.docs[0];
      console.log(
        "Chat already exists, reusing chat document ID:",
        existingChatDoc.id
      );
      return existingChatDoc.id;
    }

    // Create a new document in the "Chats" collection with the UIDs of both users
    const chatDocRef = await addDoc(collection(db, "Chats"), {
      user1: currentUID,
      user2: targetUID,
      createdAt: new Date(),
    });

    // Create a sub-collection for messages within the new chat document
    const messagesCollectionRef = collection(
      db,
      "Chats",
      chatDocRef.id,
      "Messages"
    );
    // Optionally, you can initialize with some data if needed
    await addDoc(messagesCollectionRef, {
      text: "Chat created",
      createdAt: new Date(),
      sender: currentUID,
    });

    console.log("Chat and Messages collection created successfully");
    return chatDocRef.id;
  } catch (error) {
    console.error("Error creating chat document:", error);
    throw error;
  }
};
