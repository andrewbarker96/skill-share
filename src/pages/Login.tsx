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
  IonImg,
  IonCard,
  IonCardContent,
  IonModal,
} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../../util/firebase';
import { close, eye, eyeOff, send } from 'ionicons/icons';
import Copyright from '../components/Copyright';
import { IonRefresher } from '@ionic/react';
import { IonLoading } from '@ionic/react';

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
        <IonCardContent className='form'>
          <IonItem>
            <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Email' value={email} onIonChange={e => setEmail(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonInput type={showPassword ? 'text' : 'password'} labelPlacement='floating' label='Password' placeholder='Enter your Password' value={password} onIonChange={e => setPassword(e.detail.value!)} />
            <IonIcon slot='end' icon={showPassword ? eye : eyeOff} size='small' color='medium' onClick={() => setShowPassword(!showPassword)} />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked' color='danger'>{invalid ? 'Invalid email or password' : ''}</IonLabel>
            <IonButton slot='end' fill='clear' onClick={clickForgotPassword}>Forgot Password?</IonButton>
          </IonItem>
          <br />
          <IonButton id='open-loading' expand='block' onClick={handleLogin}>Login</IonButton>
          <IonLoading className='custom-loading' trigger='open-loading' isOpen={false} onDidDismiss={() => setInvalid(false)} message='Logging in...' duration={2000} />
        </IonCardContent>
        <IonCardContent>
          <Copyright />
        </IonCardContent>

        {/* Reset Password Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonCard>
            <IonCardContent>
              <IonIcon onClick={() => setShowModal(false)} icon={close} size='large' color='primary' slot='start' />
            </IonCardContent>
            <IonCardContent>
              <IonText class='ion-text-center'><h1>Reset Password</h1></IonText>
              <IonText class='ion-text-center'><h3>Enter your email address to receive a password reset link.</h3></IonText>
            </IonCardContent>
            <IonCardContent>
              <IonItem>
                <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Enter Email Address' value={emailVerification} onIonChange={e => setEmailVerification(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position='stacked' color='danger'>{invalid ? 'Email does not exist and/or is invalid' : ''}</IonLabel>
                <IonLabel position='stacked' color='primary'>{success ? '' : ''}Password reset email sent.<br /><br />Email may take 5-10 minutes.<br />If you do not receive contact your Stock & Associates IT Admin. </IonLabel>
              </IonItem>
            </IonCardContent>
            <IonCardContent>
              <IonButton id='open-loading' expand='block' onClick={handleForgotPassword}>Send Verification Email</IonButton>
              <IonLoading className='custom-loading' trigger='open-loading' isOpen={success} onDidDismiss={() => setSuccess(false)} message='Sending Email...' duration={2000} />
            </IonCardContent>
          </IonCard>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
