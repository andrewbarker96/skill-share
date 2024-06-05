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
  IonRouterLink,
} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../../util/firebase';
import { close, create } from 'ionicons/icons';
import Copyright from '../components/Copyright';
import { IonLoading } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [modal, showModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth(firebase);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log('User signed in:', user, uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        setInvalid(true);
        setPassword('');
        setErrorMessage("Error Signing In. Verify Email & Password");
      });
  };


  return (

    // Main Login Form
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
              <IonImg src='https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap-Horizontal.png?alt=media&token=b1ac2ccd-0de3-4997-b50a-6ee7a07580a2' alt='SkillSwap Logo' style={{ height: '75px' }} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <h2 className='ion-text-center'>Login</h2>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonInput type='email' labelPlacement='stacked' label='Email' placeholder='Email' value={email} onIonChange={e => setEmail(e.detail.value!)} />
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonInput type='password' labelPlacement='stacked' label='Password' placeholder='Password' value={password} onIonChange={e => setPassword(e.detail.value!)}>
                  <IonInputPasswordToggle color={'medium'} slot='end' />
                </IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <div className='ion-text-end'>
                <IonButton fill='clear' color={'primary'} routerLink='/password-reset'>Forgot Password</IonButton>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton shape='round' id='open-loading' expand='block' onClick={handleLogin}>Login</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton color={'secondary'} shape='round' expand='block' routerLink='/create-account'>Create Account</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Copyright />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading className='custom-loading' trigger='open-loading' isOpen={false} onDidDismiss={() => setInvalid(false)} message='Logging in...' duration={500} />
        <IonToast isOpen={invalid} color={'danger'} onDidDismiss={() => setInvalid(false)} message={errorMessage} duration={2000} />
      </IonContent>
    </IonPage>
  );
}
