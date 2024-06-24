import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonFabButton,
  IonFab,
  IonIcon,
  IonSearchbar, 
  
} from '@ionic/react';
import { collection, query, onSnapshot, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { add } from 'ionicons/icons';
import { auth, firestore } from '../../util/firebase'; // Adjust import as needed
import { getUserProfile } from '../services/firestoreService'; // Adjust import as needed

interface Chat {
  id: string;
  users: string[];
  lastMessage: string;
  lastMessageTime: Date | null;
}

const ChatDashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({}); // Store usernames
  const [profileImages, setProfileImages] = useState<{ [key: string]: string }>({}); // Store profile images

  useEffect(() => {
    const currentUserUID = auth.currentUser?.uid;
    if (!currentUserUID) {
      return;
    }

    const q = query(collection(firestore, 'chats'), where('users', 'array-contains', currentUserUID));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chat[];

      console.log(chatData.length);

      for (const chat of chatData) {
        const messagesQuery = query(
          collection(firestore, `chats/${chat.id}/messages`),
          orderBy('timestamp', 'desc'),
          limit(1)
        );
      
        for (const chat of chatData) {
          console.log(chat)
        }
        const messageSnapshot = await getDocs(messagesQuery);
        if (!messageSnapshot.empty) {
          chat.lastMessage = messageSnapshot.docs[0].data().message;
          console.log(chat.lastMessage); // Adjust if the field name is different
          
        } else {
          chat.lastMessage = 'No messages yet';
          
        }
      }

      setChats(chatData);

      // Fetch usernames for each user in the chats
      const userIds = new Set<string>();
      chatData.forEach(chat => {
        chat.users.forEach((userId: string) => userIds.add(userId));
      });

      const usernamesMap: { [key: string]: string } = {};

      const profileImagesMap: { [key: string]: string } = {};
      for (const userId of userIds) {
        if (!usernames[userId] || !profileImages[userId]) {
          const userProfile = await getUserProfile(userId);
          usernamesMap[userId] = userProfile.username;
          profileImagesMap[userId] = userProfile.profileImage;
        }
      }
      for (const userId of userIds) {
        if (!usernames[userId]) {
          const userProfile = await getUserProfile(userId);
          usernamesMap[userId] = userProfile.username;
        }
      }

      setUsernames(prevUsernames => ({
        ...prevUsernames,
        ...usernamesMap
      }));


      setProfileImages(prevProfileImages => ({
        ...prevProfileImages,
        ...profileImagesMap
      }));
    });

    return () => unsubscribe();
  }, []);

  const getChatName = (chat: Chat) => {
    if (!chat.users || chat.users.length === 0) return 'Unknown Chat';
    const otherUsers = chat.users.filter((userId: string) => userId !== auth.currentUser?.uid);
    const otherUsernames = otherUsers.map((userId: string) => usernames[userId] || 'Unknown User');
    
    return otherUsernames.join(', ');
  };

  

  return (
    <IonPage>
      
      <IonContent scrollY={true} style={{ flexGrow: '1' }} className = 'ion-padding'>
        <h1>Chats</h1>
        <IonSearchbar />
              <IonList>
          {chats.map(chat => (
            <IonItem lines='none' key={chat.id} routerLink={`/chats/${chat.id}`} className = "chatItem">
              <IonImg style = {{ height: '100px', width: '100px' }}  className = 'profileImage' src={profileImages[chat.users.find((userId: string) => userId !== auth.currentUser?.uid) || ''] } />
              <IonLabel className = "chatItemContent">
                <h2>{getChatName(chat)}</h2>
                <p>{chat.lastMessage}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab slot='fixed' vertical='bottom' horizontal='end' style={{ margin: 15 }}>
          <IonFabButton routerLink='/chat/new'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ChatDashboard;
