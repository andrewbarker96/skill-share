import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import React from 'react'

interface SkillCardProps {
  title: string;
  description: string;
  image: string;
}

const SkillSwapPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <h1>Find a Skill</h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size='3'>
                  <IonImg src='https://via.placeholder.com/150' />
                </IonCol>
                <IonCol size='8'>
                  <IonText>
                    <h2>Learn to Code</h2>
                    <p>Learn to code in Python, JavaScript, or Java!</p>
                  </IonText>
                </IonCol>
                <IonCol size='1'>
                  <IonIcon size='large' icon={chevronForward} style={{ height: '100%' }} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default SkillSwapPage