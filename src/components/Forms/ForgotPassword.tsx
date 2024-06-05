import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,

} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../../../util/firebase';
import { close } from 'ionicons/icons';


export default function ForgotPasswordForm() {
  const [emailVerification, setEmailVerification] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modal, showModal] = useState(false);

  const auth = getAuth(firebase);

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
    <>
      <IonButton fill='clear' color={'primary'} onClick={() => showModal(true)}>Forgot Password</IonButton>

      <IonModal isOpen={modal} onDidDismiss={() => showModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton slot='icon-only' onClick={() => showModal(false)}>
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
                <IonText className='ion-text-center'>Enter email below to reset password.</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='12'>
                <IonItem lines='none'>
                  <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Enter Email Address' value={emailVerification} onIonChange={e => setEmailVerification(e.detail.value!)} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='12'>
                <IonButton shape='round' expand='block' onClick={handleForgotPassword}>Send Verification Email</IonButton>
              </IonCol>
            </IonRow>
            <IonToast isOpen={invalid} onDidDismiss={() => setInvalid(true)} message='Email does not exist and/or is invalid' duration={2000} />
            <IonToast isOpen={success} onDidDismiss={() => setSuccess(false)} message='Password reset email sent. Email may take 5-10 minutes. If you do not receive contact your Stock & Associates IT Admin.' duration={5000} />
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  );
}
