import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../../util/firebase'; // Ensure this is the Firestore instance
import { uid } from '../../../util/firebase';

interface ChatViewProps extends RouteComponentProps<{ id: string }> { }

const ChatView: React.FC<ChatViewProps> = ({ match }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const chatId = match.params.id;
    // Use the modular syntax for Firestore
    const messagesRef = collection(firestore, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, [match.params.id]);

  const sendMessage = async () => {
    try {
      const chatId = match.params.id;
      const messagesRef = collection(firestore, `chats/${chatId}/messages`);
      await addDoc(messagesRef, {
        senderId: uid, // Replace with actual user ID
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {messages.map((message) => (
            <IonItem key={message.id}>
              <IonLabel>
                <h2>{message.senderId}</h2>
                <p>{message.text}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonInput
          value={newMessage}
          onIonChange={(e) => setNewMessage(e.detail.value!)}
          placeholder='Enter your message'
        />
      </IonContent>
    </IonPage>
  );
};

export default ChatView;