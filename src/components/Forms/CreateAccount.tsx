import React, { useState } from 'react';
import { firestore, auth } from '../../../util/firebase';  // Ensure these are initialized correctly
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import {
  IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonInputPasswordToggle,
  IonItem, IonModal, IonRow, IonText, IonTitle, IonToast, IonToolbar
} from '@ionic/react';
import { close } from 'ionicons/icons';

const CreateAccountForm: React.FC = () =>{

  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleCreateAccount = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created successfully
        console.log('User created:', userCredential.user);
      })
      .catch((error) => {
        // An error occurred
        console.error('Error creating user:', error);
      });
    console.log('Creating account:', email, password);
  }


  return (
    <>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol size='12'>
              <IonText>
                <h1>Create Account</h1>
              </IonText>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonInput value={email} label='Email' labelPlacement='stacked' placeholder='Email' type='email' onIonChange={e => setEmail(e.detail.value || '')}
                />
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonInput value={password} label='Password' labelPlacement='stacked' placeholder='Password' type='password' onIonChange={e => setPassword(e.detail.value || '')} >
                  <IonInputPasswordToggle color={'medium'} slot='end' />
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          </IonGrid>
        <IonButton expand='block' color={'secondary'} shape='round' onClick={() => console.log('test')}>Create Account</IonButton>
      </IonContent>
      <IonToast color={'danger'} isOpen={invalid} onDidDismiss={() => setInvalid(false)} message={errorMessage} duration={2000} />
      <IonToast color={'success'} isOpen={success} onDidDismiss={() => setSuccess(false)} message='Account Created' duration={2000} />
    </>
  )
}

export default CreateAccountForm;
