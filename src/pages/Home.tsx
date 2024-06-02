import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonButtons } from '@ionic/react';


const HomePage: React.FC = () => {


  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonCardContent className='form'>
          <IonText class='ion-text-center' >
            <h1>Welcome to Skill Swap</h1>
          </IonText>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
