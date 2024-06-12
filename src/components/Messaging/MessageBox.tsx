import React, { useState, useEffect } from "react";
import { auth, db } from "../../../util/firebase";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { IonContent, IonInput, IonButton, IonList, IonItem, IonPage, IonButtons, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export const Message: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    if (message.trim() === '' || !user) {
      alert('Message is empty or user not found');
      return;
    }
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: user.displayName || user.email,
      uid: user.uid,
      createdAt: serverTimestamp(),
    });
    setMessage('');
  };

  return (
    <IonPage>
      <IonButtons>
        <IonButton routerLink="/messages">
          <IonIcon icon={chevronBack} />Back</IonButton>
      </IonButtons>
      <IonContent className="ion-padding">
        <IonList>
          {messages.map(({ id, text, name }) => (
            <IonItem key={id}>
              <strong>{name}: </strong>{text}
            </IonItem>
          ))}
        </IonList>
        <IonInput placeholder={`Message @${user?.displayName || user?.email}`} onIonChange={(e) => setMessage(e.detail.value!)} />
        <IonButton type="submit" onClick={sendMessage} className="send-message">Send</IonButton>
      </IonContent>
    </IonPage>
  );
};