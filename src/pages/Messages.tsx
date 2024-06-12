import { IonButton, IonCard, IonCol, IonContent, IonFabButton, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonSearchbar, IonText, IonTextarea } from '@ionic/react'
import { add, chevronForward } from 'ionicons/icons'
import React, { useState, useEffect, useRef } from 'react'
import { query, collection, orderBy, onSnapshot, limit, Unsubscribe } from "firebase/firestore";
import { firebase, auth, db } from '../../util/firebase'
// import { SendMessages } from '../components/Chat/SendMessage';

const MessageDashboard: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleKey = (e: any) => {
    if (e.key === 'Enter') {
      console.log('Search for:', username)
    }
  }

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonText><h1>Chat</h1></IonText>
        <IonSearchbar placeholder='Search Messages' onKeyDown={handleKey} onIonChange={(e) => setUsername(e.detail.value!)}></IonSearchbar>
        <hr />
        <IonCard>

        </IonCard>
        <IonFabButton routerLink='/chat/new' color={'primary'} style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonContent>
    </IonPage>
  )
}

export default MessageDashboard