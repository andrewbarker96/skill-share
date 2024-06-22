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
  IonPage,
  IonPopover,
  IonRow,
  IonText,
} from '@ionic/react';
import { camera, happy, send } from 'ionicons/icons';
import EmojiPicker from 'emoji-picker-react';
import { sendMessage, getMessages, getChat } from '../../../services/messageService';
import UserInfo from '../list/userInfo/UserInfo';
import { auth } from "../../../../util/firebase";
import { getUserProfile } from '../../../services/firestoreService';

const IndividualChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [targetUserId, setTargetUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');



  

  useEffect(() => {
    const url = window.location.href;
    const urlArray = url.split('/');
    const chatIdFromUrl = urlArray[urlArray.length - 1];
    setChatId(chatIdFromUrl);

    if (chatIdFromUrl) {
      const fetchChatData = async () => {
        try {
          // Fetch chat details to get target user ID
          const chat = await getChat(chatIdFromUrl);
          const currentUserId = auth.currentUser?.uid;
          if (chat && chat.users && currentUserId) {
            const otherUserId = chat.users.find((id: string) => id !== currentUserId);
            if (otherUserId) {
              setTargetUserId(otherUserId);

              // Fetch target user's profile to get the username
              const userProfile = await getUserProfile(otherUserId);
              console.log("Fetched user data: ", userProfile);
              setUsername(userProfile.username);
              setProfileImage(userProfile.profileImage);
              console.log('Profile Picture URL:', userProfile.profileImage);
            }

            // Fetch messages
            const messages = await getMessages(chatIdFromUrl);
            setMessages(messages);
          }
        } catch (error) {
          console.error('Error fetching chat data:', error);
        }
      };
      fetchChatData();
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

  const currentUserId = auth.currentUser?.uid;
  

  return (
    <IonPage>
      <div className="top">
        <UserInfo username={username} profilePicture={profileImage} /> {/* Pass the target user's username */}
      </div>
      <IonContent className="chat-content" scrollY={true} id="texts">
        {messages.map((message) => {
          const messageClass = message.senderId === currentUserId ? 'sender' : 'from';

          const textClass = message.senderId === currentUserId ? 'sender-text' : 'from-text';
          console.log(`Message: ${message.message}, Sender: ${message.senderId}, Class: ${messageClass}`);
          return (
            <IonItem
              lines='none'
              className={`message ${messageClass}`}
              key={message.id}
             
            >
              <IonText className={textClass}>
                {message.message}
              </IonText>
            </IonItem>
          );
        })}
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
