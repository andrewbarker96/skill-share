import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from '@ionic/react'
import React from 'react'

const EventsPage: React.FC = () => {
  return (
    <IonPage>
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