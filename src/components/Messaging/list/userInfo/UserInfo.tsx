import React from 'react'
import './UserInfo.css'
import { IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonText } from '@ionic/react'
import { ellipsisHorizontal, informationCircle, share, shareOutline } from 'ionicons/icons'

const UserInfo = () => {
  return (
    <>
      <IonRow className='userInfo'>
        <IonCol size='2'>
          <IonAvatar>
            <IonImg className='avatar' src='https://via.placeholder.com/150' />
          </IonAvatar>
        </IonCol>
        <IonCol size='8'>
          <IonText>
            <h2>John Doe</h2>
          </IonText>
        </IonCol>
        <IonCol size='2' className='buttons'>
          <IonButtons>
            <IonButton>
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
            <IonButton>
              <IonIcon icon={shareOutline} />
            </IonButton>
            <IonButton>
              <IonIcon icon={informationCircle} />
            </IonButton>
          </IonButtons>
        </IonCol>
      </IonRow>
    </>
  )
}

export default UserInfo