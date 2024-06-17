import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonIcon, IonFabButton, IonFab } from '@ionic/react';
import { firebase, firestore } from '../../util/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { add, create, createOutline } from 'ionicons/icons';
import MessageDashboard from '../components/Messaging/list/dashboard';
import ChatList from '../components/Messaging/list/chatList/ChatList';
import { listUsers } from '../services/messageService';

const ChatDashboard: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const chatsRef = collection(firestore, 'chats');
    const q = query(chatsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonButton onClick={listUsers}>List Users</IonButton>
      <IonFab slot='fixed' vertical='bottom' horizontal='end' style={{ margin: 15 }}>
        <IonFabButton routerLink='/chat/new'>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <IonContent className='ion-padding'>
        <MessageDashboard />
        <IonList>
          {chats.map(chat => (
            <IonItem key={chat.id} routerLink={`/chat/${chat.id}`}>
              <IonLabel>
                <h2>Chat with {chat.users.join(', ')}</h2>
                <p>{chat.lastMessage}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChatDashboard;