import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { firestore } from '../../util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { IonContent, IonImg, IonPage, IonText } from '@ionic/react';

interface UserProfilePageProps extends RouteComponentProps<{ uid: string }> { }

const UserProfilePage: React.FC<UserProfilePageProps> = ({ match }) => {
  const { uid } = match.params;
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    const fetchProfile = async () => {
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
      </IonContent>
    </IonPage>
  );
};

export default UserProfilePage;
