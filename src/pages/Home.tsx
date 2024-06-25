import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonButtons, IonGrid, IonRow, IonCol, IonFabButton, IonSkeletonText } from '@ionic/react';
import { person } from 'ionicons/icons';
import { firestore, auth } from '../../util/firebase';


const HomePage: React.FC = () => {
  const uid = auth.currentUser?.uid;

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol size='6' className='justify-content-start'>
              <IonImg src='https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap-Horizontal.png?alt=media&token=b1ac2ccd-0de3-4997-b50a-6ee7a07580a2' alt='SkillSwap Logo' style={{ height: '50px', marginBottom: '5%', float: 'left' }} />
            </IonCol>
            <IonCol size='6'>
              <IonFabButton color='light' style={{ float: 'right' }} href='/profile/:uid'>
                <IonIcon icon={person} />
              </IonFabButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonText><h1>Welcome to Skill Swap!</h1></IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <p>Find a skill to learn or teach</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <IonSkeletonText animated />
                <IonSkeletonText animated />
                <IonSkeletonText animated />
                <IonSkeletonText animated />
                <IonSkeletonText animated />
                <IonSkeletonText animated />
                <IonSkeletonText animated />
                <IonSkeletonText animated />
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
