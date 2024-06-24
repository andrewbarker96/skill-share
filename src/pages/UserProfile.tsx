import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { firestore, auth } from '../../util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { IonCol, IonContent, IonGrid, IonImg, IonInput, IonLabel, IonPage, IonRow, IonText } from '@ionic/react';


const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) {
        console.error('UID is undefined. User might not be logged in.');
        window.location.href = '/';
        return;
      }
      const docRef = await getDoc(doc(firestore, 'userProfiles', uid));
      if (docRef.exists()) {
        setProfile(docRef.data());
      } else {
        console.error('No such document!');
      }
    };

    fetchProfile();
  }, [uid]);

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '50%' }}>
          <IonImg style={{ height: '100px', width: '100px' }} src={profile.profileImage} />
        </div>
        <IonText className='ion-text-center'>
          <h1>{profile.firstName} {profile.lastName}</h1>
        </IonText>
        <IonText className='ion-text-center'>
          <p>{profile.email}</p>
        </IonText>
        <IonText className='ion-text-center'>
          <p>{profile.profileDescription}</p>
        </IonText>
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfilePage;
