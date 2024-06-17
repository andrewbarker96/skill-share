import React, { useState } from 'react'
import './chat.css'
import { IonButton, IonButtons, IonCol, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonText } from '@ionic/react'
import UserInfo from '../list/userInfo/UserInfo'
import { camera, happy, image, send } from 'ionicons/icons'
import EmojiPicker from 'emoji-picker-react'
import { sendMessage } from '../../../services/messageService'

const IndividualChat: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [chatId, setChatId] = useState('')

  const handleEmoji = (e: any) => {

    setText(prev => prev + e.emoji)
    setOpen(false)
    return text
  }

  const handleMessageSend = () => {
    const url = window.location.href
    const urlArray = url.split('/')
    const chatId = urlArray[urlArray.length - 1]
    sendMessage(chatId, text)
  }

  return (
    <IonPage>
      <div className='top'>
        {/* <UserInfo /> */}
      </div>
      <IonContent scrollY={true} id='texts' className='center ion-padding'>
        <IonItem>

        </IonItem>
      </IonContent>
      <div className="bottom ion-padding">
        <IonRow className='inputField'>
          <IonButtons>
            <IonButton><IonIcon icon={camera} /></IonButton>
          </IonButtons>
          <IonCol>
            <IonInput placeholder="Type a message" value={text} onIonChange={e => setText(e.detail.value!)} />
          </IonCol>
          <IonButtons>
            <IonButton id='emojiPicker' onClick={() => setOpen(prev => !prev)}><IonIcon icon={happy} /></IonButton>
            <IonButton id='sendButton' onClick={handleMessageSend}><IonIcon icon={send} /></IonButton>
          </IonButtons>
          <IonPopover trigger='emojiPicker' isOpen={open} side='top' alignment='end' onDidDismiss={() => setOpen(prev => !prev)}>
            <EmojiPicker onEmojiClick={handleEmoji} />
          </IonPopover>
        </IonRow>
      </div>
    </IonPage>
  )
}

export default IndividualChat