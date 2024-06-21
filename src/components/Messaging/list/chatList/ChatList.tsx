import React from 'react'
import './ChatList.css'
import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonIcon, IonImg, IonLabel, IonRow, IonSearchbar, IonText } from '@ionic/react'
import { add, close } from 'ionicons/icons'

const ChatList = () => {
  return (
    <IonContent>
      <div className='searchBar'>
        <IonButtons>
          <IonSearchbar clearIcon={close} placeholder='Search' />
          <IonButton>
            <IonIcon icon={add} />
          </IonButton>
        </IonButtons>
      </div>
      <div>
        <IonRow className='item'>
          <IonCol size='2'>
            <IonAvatar>
              <IonImg src='https://via.placeholder.com/150' />
            </IonAvatar>
          </IonCol>
          <IonCol size='7'>
            <IonText>
              <h2>John Doe</h2>
              <p>Message Preview</p>
            </IonText>
          </IonCol>
          <IonCol size='3'>
            <IonLabel className='timeStamp ion-text-center'>
              <p>2:00 PM</p>
            </IonLabel>
          </IonCol>
        </IonRow>
      </div>
    </IonContent>
  )
}

export default ChatList