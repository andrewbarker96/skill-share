import React, { useState, useEffect } from 'react';
import './chat.css';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
} from '@ionic/react';
import { camera, happy, send } from 'ionicons/icons';
import EmojiPicker from 'emoji-picker-react';
import { sendMessage, getMessages } from '../../../services/messageService';
import UserInfo from '../list/userInfo/UserInfo';

const IndividualChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const url = window.location.href;
    const urlArray = url.split('/');
    const chatIdFromUrl = urlArray[urlArray.length - 1];
    setChatId(chatIdFromUrl);

    if (chatIdFromUrl) {
      const fetchMessages = async () => {
        const messages = await getMessages(chatIdFromUrl);
        setMessages(messages);
      };
      fetchMessages();
    }
  }, [chatId]);

  const handleEmoji = (e: any) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSendMessage = async () => {
    try {
      await sendMessage(chatId, text);
      setText('');
      const messages = await getMessages(chatId);
      setMessages(messages);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <IonPage>
      <div className="top"><UserInfo /></div>
      <IonContent scrollY={true} id="texts" className="center ion-padding">
        {messages.map((text) => (
          <IonItem lines='none' className='message' key={text.id}>
            <IonText className='from'>{text.message}</IonText>
          </IonItem>
        ))}
      </IonContent>
      <div className="bottom ion-padding">
        <IonRow className="inputField">
          <IonButtons>
            <IonButton>
              <IonIcon icon={camera} />
            </IonButton>
          </IonButtons>
          <IonCol>
            <IonInput
              placeholder="Type a message"
              value={text}
              onIonInput={(e) => setText(e.detail.value!)}
            />
          </IonCol>
          <IonButtons>
            <IonButton
              id="emojiPicker"
              onClick={() => setOpen((prev) => !prev)}
            >
              <IonIcon icon={happy} />
            </IonButton>
            <IonButton id="sendButton" onClick={handleSendMessage}>
              <IonIcon icon={send} />
            </IonButton>
          </IonButtons>
          <IonPopover
            trigger="emojiPicker"
            isOpen={open}
            side="top"
            onDidDismiss={() => setOpen((prev) => !prev)}
          >
            <EmojiPicker onEmojiClick={handleEmoji} />
          </IonPopover>
        </IonRow>
      </div>
    </IonPage>
  );
};

export default IndividualChat;
