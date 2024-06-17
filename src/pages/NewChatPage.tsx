import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonLabel, IonButtons, IonSearchbar } from '@ionic/react';
import { createChat, findUsers } from '../services/messageService';
import { endAt } from 'firebase/firestore';

const NewChatPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    try {
      const foundUsers = await findUsers(search);
      if (foundUsers.length === 0) {
        setError("No users found with the provided search criteria");
      }
      setUsers(foundUsers);
    } catch (error) {
      console.error("Error finding users:", error);
      setError("An error occurred while searching for users");
    }
  };

  const handleCreateChat = async (userUID: string) => {
    try {
      const chatDocId = await createChat(userUID);
      // window.location.href = `/chat/${chatDocId}`;
      return chatDocId;
    } catch (error) {
      console.error("Error creating chat:", error);
      setError("Error creating chat");
    }
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonButtons>
          <IonSearchbar placeholder='Search' value={search} onIonInput={(e) => setSearch(e.detail.value!)}></IonSearchbar>
          <IonButton onClick={handleSearch}>Search</IonButton>
        </IonButtons>
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
