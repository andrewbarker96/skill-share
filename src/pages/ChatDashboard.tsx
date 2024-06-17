import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonFabButton, IonFab, IonIcon, IonSearchbar } from '@ionic/react';
import { firebase, firestore, db } from '../../util/firebase';
import { collection, query, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { add } from 'ionicons/icons';
import MessageDashboard from '../components/Messaging/list/dashboard';
import ChatList from '../components/Messaging/list/chatList/ChatList';

const ChatDashboard: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(firestore, 'chats'));

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
      <IonContent scrollY={false} style={{ flexGrow: '1' }}>
        <IonSearchbar /> 
      </IonContent>
      <IonContent className='ion-padding'>
        {/* <MessageDashboard /> */}
        <IonList>
          {chats.map(chat => (
            <IonItem lines='none' key={chat.id} routerLink={`/chats/${chat.id}`}>
              <IonLabel>
                <h2>{chat.id}</h2>
                <h2>{chat.name}</h2>
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
