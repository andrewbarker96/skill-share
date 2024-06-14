import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { firestore } from '../../util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText } from '@ionic/react';

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
          <IonImg style={{ height: '100px', width: '100px' }} src={profile.profilePicture} />
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
          {/* <IonRow>
            <IonCol size='12'>
              <Link to={{
                pathname: '/update-profile',
                state: { initialStep: 0 } 
              }}>
                <IonButton expand="block">Edit Profile</IonButton>
              </Link>
            </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfilePage;
