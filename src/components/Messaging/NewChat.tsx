import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonSearchbar, IonList, IonPopover } from '@ionic/react';
import { listUsers, findUsers } from '../../services/messageService';
import IndividualChat from './chat/chat';
import { close } from 'ionicons/icons';

export const NewChatView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    listUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleSearch = async (event: CustomEvent) => {
    const searchValue = event.detail.value;
    setSearchTerm(searchValue);
    if (searchValue.trim()) {
      const foundUsers = await findUsers(searchValue.trim());
      setUsers(foundUsers);
    } else {
      // Optionally, reset to initial users list or handle empty search differently
      listUsers().then((users) => {
        setUsers(users);
      });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonSearchbar
          clearIcon={close}
          placeholder="Search"
          onIonChange={handleSearch}
        />
        {/* Render users here */}
        {users.map((user) => (
          <IonPopover key={user.id}>
            {user.name}
          </IonPopover>
        ))}
      </IonContent>
    </IonPage>
  );
};