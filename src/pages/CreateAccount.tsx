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
import { firebase, firestore } from '../../util/firebase';
import Copyright from '../components/Copyright';
import { createUserWithEmailAndPassword, verifyBeforeUpdateEmail } from 'firebase/auth';
import { arrowBack } from 'ionicons/icons';
import { doc, setDoc } from 'firebase/firestore';
import ProfileForm from '../components/ProfileForm';

export default function CreateAccountPage() {
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth(firebase);

  const handleCreateAccount = async () => {
    if (password.length < 6) {
      setInvalid(true);
      setErrorMessage('Password must be at least 6 characters');
      return;
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user);
        setSuccess(true);

        await setDoc(doc(firestore, 'userProfiles', user.uid), {
          email: email,
          admin: false,
          profileImage: '',
          firstName: '',
          lastName: '',
          birthday: '',
          profileDescription: '',
          skillsOffered: [],
          uid: user.uid,
        });

        console.log('User Profile Created', user.uid);
      } catch (error) {
        const errorCode = error;
        setErrorMessage('Error creating user');
        console.error('Error creating user:', errorCode, errorMessage);
      }
    }
  };


  return (
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
              <IonImg src='https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap-Horizontal.png?alt=media&token=b1ac2ccd-0de3-4997-b50a-6ee7a07580a2' alt='SkillSwap Logo' style={{ height: '75px' }} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <h2>Create Account</h2>
              </IonText>
            </IonCol>
          </IonRow>
          {/* <IonRow>

            <ProfileForm mode={'create'}></ProfileForm>
          </IonRow> */}
          <IonRow>
            <IonCol size='12'>
              <IonInput value={email} label='Email' labelPlacement='stacked' placeholder='Email' type='email' onIonChange={e => setEmail(e.detail.value || '')}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonInput value={password} label='Password' labelPlacement='stacked' placeholder='Password' type='password' onIonChange={e => setPassword(e.detail.value || '')} >
                <IonInputPasswordToggle color={'medium'} slot='end' />
              </IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonButton expand='block' color={'secondary'} shape='round' onClick={handleCreateAccount}>Create Account</IonButton>
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
