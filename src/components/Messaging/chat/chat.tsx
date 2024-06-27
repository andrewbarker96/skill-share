import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { camera, checkmark, happy, send, checkmarkCircle, arrowBackCircle } from "ionicons/icons";
import EmojiPicker from "emoji-picker-react";
import {
  sendMessage,
  getMessages,
  getChat,
  updateMessageStatusToRead,
  onMessagesSnapshot,
  updateLastSentMessageStatus,
} from "../../../services/messageService";
import UserInfo from "../list/userInfo/UserInfo";
import { auth } from "../../../../util/firebase";
import { getUserProfile } from "../../../services/firestoreService";
import TopMenu from "../../TopMenu";

interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  status: string;
}

const IndividualChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [targetUserId, setTargetUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const contentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    const url = window.location.href;
    const urlArray = url.split("/");
    const chatIdFromUrl = urlArray[urlArray.length - 1];
    setChatId(chatIdFromUrl);

    if (chatIdFromUrl) {
      const fetchChatData = async () => {
        try {
          const chat = await getChat(chatIdFromUrl);
          const currentUserId = auth.currentUser?.uid;
          if (chat && chat.users && currentUserId) {
            const otherUserId = chat.users.find((id: string) => id !== currentUserId);
            if (otherUserId) {
              setTargetUserId(otherUserId);
              const userProfile = await getUserProfile(otherUserId);
              setUsername(userProfile.username);
              setProfileImage(userProfile.profileImage);
            }

            const unsubscribe = onMessagesSnapshot(chatIdFromUrl, async (messages) => {
              setMessages(messages);
              scrollToBottom();

              for (const message of messages) {
                if (message.senderId !== currentUserId && message.status === "delivered") {
                  await updateMessageStatusToRead(chatIdFromUrl, message.id);
                }
              }

              // Update the last sent message status to 'receivedReply' when a new message is received
              const newMessageFromOtherUser = messages.find(
                (message) => message.senderId !== currentUserId && message.status === 'sent'
              );
              if (newMessageFromOtherUser) {
                await updateLastSentMessageStatus(chatIdFromUrl, currentUserId);
              }
            });

            return () => unsubscribe();
          }
        } catch (error) {
          console.error("Error fetching chat data:", error);
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
      setText("");
      const messages = await getMessages(chatId);
      setMessages(messages);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollToBottom(300);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 100); // Give some time for rendering
    return () => clearTimeout(timeout);
  }, [messages]);

  const currentUserId = auth.currentUser?.uid;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton routerLink="/chat">
              <IonIcon slot="start" icon={arrowBackCircle} />
              <IonText>Back</IonText>
            </IonButton>
          </IonButtons>
          <IonTitle>{username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <div className="top">
        <UserInfo username={username} profilePicture={profileImage} />
      </div> */}
      <IonContent ref={contentRef} scrollY={true} id="texts">
        {messages.map((message) => {
          const messageClass =
            message.senderId === currentUserId ? "message-sender" : "message-target";
          const textClass =
            message.senderId === currentUserId ? "message-sender-text" : "message-target-text";

          return (
            <div className={`message ${messageClass}`} key={message.id}>
              <IonText className={textClass}>{message.message}</IonText>
              <IonText>
                {messageClass === "message-sender" && message.status !== 'receivedReply' && (
                  <IonText color={'medium'} className="message-status">
                    {message.status === 'sent' && (
                      <>
                        <IonText>Sent</IonText>
                        <IonIcon icon={checkmark} />
                      </>
                    )}
                    {message.status === 'delivered' && (
                      <>
                        <IonText color={'primary'}>Delivered</IonText>
                        <IonIcon icon={checkmark} />
                      </>
                    )}
                    {message.status === 'read' && (
                      <>
                        <IonText>Read</IonText>
                        <IonIcon icon={checkmarkCircle} />
                      </>
                    )}
                  </IonText>
                )}
              </IonText>
            </div>
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
