import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonIcon,
  IonCardContent,
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
} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../../util/firebase';
import { close, eye, eyeOff, send } from 'ionicons/icons';
import Copyright from '../components/Copyright';
import { IonRefresher } from '@ionic/react';
import { IonLoading } from '@ionic/react';
import Logo from '../components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth(firebase);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log('User signed in:', user, uid);
        window.location.href = '/';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        setInvalid(true);
        setEmail('');
        setPassword('');
      });
  };

  const clickForgotPassword = () => {
    setShowModal(true);
  }

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, emailVerification)
      .then(() => {
        console.log('Password reset email sent');
        setSuccess(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error sending password reset email:', errorCode, errorMessage);
        setInvalid(true);
        setEmailVerification('');
      });
  }


  return (
    // Main Login Form
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
              <IonImg src='https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap.png?alt=media&token=e7758927-9883-440e-b153-530f85c8d8c9' alt='SkillSwap Logo' style={{ height: '200px' }} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
            <IonItem>
              <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Email' value={email} onIonChange={e => setEmail(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonInput type={showPassword ? 'text' : 'password'} labelPlacement='floating' label='Password' placeholder='Password' value={password} onIonChange={e => setPassword(e.detail.value!)} />
              <IonIcon slot='end' icon={showPassword ? eye : eyeOff} size='small' color='medium' onClick={() => setShowPassword(!showPassword)} />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked' color='danger'>{invalid ? 'Invalid email or password' : ''}</IonLabel>
              <IonButton slot='end' fill='clear' onClick={clickForgotPassword}>Forgot Password?</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton id='open-loading' expand='block' onClick={handleLogin}>Login</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton color={'secondary'} expand='block' routerLink='/register'>Register</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Copyright />
            </IonCol>
          </IonRow>
        </IonGrid>
        
            <IonLoading className='custom-loading' trigger='open-loading' isOpen={false} onDidDismiss={() => setInvalid(false)} message='Logging in...' duration={2000} />




        {/* Reset Password Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot='start'>
                <IonButton slot='icon-only' onClick={() => setShowModal(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>Reset Password</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <IonGrid>
              <IonRow>
                <IonCol size='12'>
                  <IonText className='ion-text-center'>Please enter your email address below to receive a password reset email.</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size='12'>
                  <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Enter Email Address' value={emailVerification} onIonChange={e => setEmailVerification(e.detail.value!)} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size='12'>
                  <IonButton expand='block' onClick={handleForgotPassword}>Send Verification Email</IonButton>
                </IonCol>
              </IonRow>
              <IonToast isOpen={invalid} onDidDismiss={() => setInvalid(true)} message='Email does not exist and/or is invalid' duration={2000} />
              <IonToast isOpen={success} onDidDismiss={() => setSuccess(false)} message='Password reset email sent. Email may take 5-10 minutes. If you do not receive contact your Stock & Associates IT Admin.' duration={5000} />
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
