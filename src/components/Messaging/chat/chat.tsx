import React, { useState } from 'react'
import './chat.css'
import { IonButton, IonButtons, IonCol, IonContent, IonIcon, IonInput, IonLabel, IonPage, IonPopover, IonRow, IonText } from '@ionic/react'
import UserInfo from '../list/userInfo/UserInfo'
import { camera, happy, image, send } from 'ionicons/icons'
import EmojiPicker from 'emoji-picker-react'

const IndividualChat = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  const handleEmoji = (e: any) => {
    setText(prev => prev + e.emoji)
    setOpen(false)
    return text
  }

  return (
    <IonPage>
      <div className='top'>
        <UserInfo />
      </div>
      <IonContent scrollY={true} id='texts' className='center ion-padding'>
        <div className="message from">
          <IonText>
            <IonLabel>From</IonLabel>
            <p>Hey how's it going?</p>
            <IonLabel>12:00pm</IonLabel>
          </IonText>
        </div>
        <div className="message sender">

          <IonLabel>To</IonLabel>
          <IonText>
            <p>Good!</p>
            <IonLabel>12:01pm</IonLabel>
          </IonText>
        </div>
      </IonContent>
      <div className="bottom ion-padding">
        <IonRow className='inputField'>
          <IonButtons>
            <IonButton><IonIcon icon={camera} /></IonButton>
          </IonButtons>
          <IonCol>
            <IonInput placeholder="Type a message" value={text} onIonInput={e => setText(e.detail.value || '')} />
          </IonCol>
          <IonButtons>
            <IonButton id='emojiPicker' onClick={() => setOpen((prev => !prev))}><IonIcon icon={happy} /></IonButton>
            <IonButton id='sendButton'><IonIcon icon={send} /></IonButton>
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