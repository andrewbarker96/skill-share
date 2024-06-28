import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import TopMenu from '../components/TopMenu'

const EventsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <h1>Events</h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default EventsPage