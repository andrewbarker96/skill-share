import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonIcon,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
  IonImg,
  IonInputPasswordToggle,
} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../../util/firebase';
import Copyright from '../components/Copyright';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { arrowBack } from 'ionicons/icons';

export default function CreateAccountPage() {
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth(firebase);

  const handleLogin = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error creating user:', errorCode, errorMessage);
      });
  };


  return (

    // Main Login Form
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton size='large' slot='icon-only' fill='clear' routerLink='/'>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Return to Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
              <IonImg src='https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap.png?alt=media&token=e7758927-9883-440e-b153-530f85c8d8c9' alt='SkillSwap Logo' style={{ height: '175px' }} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonInput value={email} label='Email' labelPlacement='stacked' placeholder='Email' type='email' onIonChange={e => setEmail(e.detail.value || '')}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonInput value={password} label='Password' labelPlacement='stacked' placeholder='Password' type='password' onIonChange={e => setPassword(e.detail.value || '')} >
                  <IonInputPasswordToggle color={'medium'} slot='end' />
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonButton expand='block' color={'secondary'} shape='round' onClick={handleLogin}>Create Account</IonButton>
            </IonCol>
          </IonRow>
          <Copyright />
        </IonGrid>

      </IonContent>
      <IonToast color={'danger'} isOpen={invalid} onDidDismiss={() => setInvalid(false)} message={errorMessage} duration={2000} />
      <IonToast color={'success'} isOpen={success} onDidDismiss={() => setSuccess(false)} message='Account Created' duration={2000} />
    </IonPage>
  );
}
