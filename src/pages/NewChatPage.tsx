import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { createChat, findUsers } from '../services/messageService';

const NewChatPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const foundUsers = await findUsers(search);
      setUsers(foundUsers);
    } catch (error) {
      console.error("Error finding users:", error);
    }
  };

  const handleCreateChat = async (userUID: string) => {
    try {
      const chatDocId = await createChat(userUID);
      setSelectedUser(chatDocId);
      // Redirect to the newly created chat
      window.location.href = `/chat/${chatDocId}`;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonInput
          value={search}
          placeholder='Search user by email or username'
          onIonChange={(e) => setSearch(e.detail.value!)}
        />
        <IonButton onClick={handleSearch}>Search</IonButton>
        <IonList>
          {users.map(user => (
            <IonItem key={user.UID} onClick={() => handleCreateChat(user.UID)}>
              <IonLabel>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NewChatPage;
