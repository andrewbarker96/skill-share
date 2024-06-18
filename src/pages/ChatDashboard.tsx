import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonFabButton,
  IonFab,
  IonIcon,
  IonSearchbar
} from '@ionic/react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { add } from 'ionicons/icons';
import { auth, firestore } from '../../util/firebase'; // Adjust import as needed
import { getUserProfile } from '../services/firestoreService'; // Adjust import as needed

interface Chat {
  id: string;
  users: string[];
  lastMessage?: string;
}

const ChatDashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({}); // Store usernames

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

      setChats(chatData);

      // Fetch usernames for each user in the chats
      const userIds = new Set<string>();
      chatData.forEach(chat => {
        chat.users.forEach((userId: string) => userIds.add(userId));
      });

      const usernamesMap: { [key: string]: string } = {};
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
      <IonContent scrollY={false} style={{ flexGrow: '1' }}>
        <IonSearchbar />
      </IonContent>
      <IonContent className='ion-padding'>
        <IonList>
          {chats.map(chat => (
            <IonItem lines='none' key={chat.id} routerLink={`/chats/${chat.id}`}>
              <IonLabel>
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
