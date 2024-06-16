import { IonButton, IonButtons, IonCol, IonContent, IonIcon, IonInput, IonPage, IonRow, IonSearchbar, IonText, IonTextarea, IonToast } from '@ionic/react';
import { add, addCircle, chevronBack, close, search } from 'ionicons/icons';
import { auth } from '../../../util/firebase';
import { useState } from 'react';
import { firebase, db } from '../../../util/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import IndividualChat from './chat/chat';

export const NewChatView: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]); // State to store found users
  const uid = auth.currentUser;

  const addUser = async (e: CustomEvent) => {
    const searchQuery = e.detail.value.trim();
    if (searchQuery === '') return;

    const usersRef = collection(db, 'userProfiles');
    const q = query(usersRef, where('email', '==', searchQuery));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No users found');
        setUsers([]);
        setError('No users found');
        return;
      }

      const foundUsers: any[] = [];
      querySnapshot.forEach((doc) => {
        foundUsers.push(doc.data());
      });
      setUsers(foundUsers); // Update state with found users
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Error searching users');
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    if (message.trim() === '' || !uid) {
      setError('Message is empty or user not found');
      return;
    }
    console.log('Send Message:', message);
    setMessages([...messages, { text: message, sender: uid.email }]);
    setMessage('');
  };

  return (
        <IndividualChat />
    // <IonPage>
    //   <IonContent className='ion-padding'>
    //     <IonButtons>
    //       <IonButton fill='clear' routerLink='/chat'>
    //         <IonIcon icon={chevronBack} />
    //         <IonText><p>Back</p></IonText>
    //       </IonButton>
    //       <IonSearchbar searchIcon={search} clearIcon={close} placeholder='Add Users' onIonInput={addUser}></IonSearchbar>
    //     </IonButtons>
    //     <IonRow>
    //       <IonCol size='12'>
    //         {users.length > 0 && (
    //           <div>
    //             {users.map((user, index) => (
    //               <p key={index}>{user.email}</p>
    //             ))}
    //           </div>
    //         )}
    //       </IonCol>
    //     </IonRow>
    //     <div className='messages' style={{ flex: 1, overflowY: 'auto', marginBottom: '60px' }}>
    //       {messages.map((msg, index) => (
    //         <div key={index} style={{ margin: '10px 0', padding: '10px', borderRadius: '10px' }}>
    //           <p><strong>{msg.sender}:</strong> {msg.text}</p>
    //         </div>
    //       ))}
    //     </div>
    //     <IonButtons>
    //       <IonInput placeholder={`Type Message`} value={message} onIonChange={(e) => setMessage(e.detail.value!)} style={{ wrapText: 'wrap', height: 'fit-content' }} />
    //       <IonButton fill='clear' onClick={sendMessage}>Send</IonButton>
    //     </IonButtons>
    //     <IonToast color={'danger'} isOpen={!!error} message={error} duration={5000} onDidDismiss={() => setError('')} />
    //   </IonContent>
    // </IonPage>
  );
};
