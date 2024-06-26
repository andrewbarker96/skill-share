import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { firestore, auth } from '../../util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText, IonButton } from '@ionic/react';
import { createChat } from '../services/messageService';

const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  const { uid } = useParams<{ uid: string }>();
  const history = useHistory();
  const currentUserId = auth.currentUser?.uid;

  console.log(uid)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) {
        console.error('UID is undefined. User might not be logged in.');
        window.location.href = '/';
        return;
      }

      const docRef = doc(firestore, 'userProfiles', uid);
      const docSnap = await getDoc(docRef);

      console.log(uid)
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.error('No such document!');
      }
    };

    fetchProfile();
  }, [uid]);



  const handleEditProfile = () => {
    history.push('/update-profile');
  };

  const handleMessageUser = async () => {
    try {
      const chatDocId = await createChat(uid);
      history.push(`/chats/${chatDocId}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };


  const renderSkills = (skills: any) => {
    if (!skills) return null;

    return Object.keys(skills).map((category) => (
      <div key={category}>
        <IonText className='ion-text-center'>
          <h2>{category} Skills</h2>
        </IonText>
        {Object.keys(skills[category]).map((subcategory) => (
          <div key={subcategory}>
            <IonText className='ion-text-center'>
              <h3>{subcategory}</h3>
            </IonText>
            <ul>
              {(skills[category][subcategory] as string[]).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ));
  };

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
        {renderSkills(profile.skillsOffered)}
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
            {currentUserId === uid ? (
                    <IonButton expand="block" onClick={handleEditProfile}>
                      Edit Profile
                    </IonButton>
                  ) : (
                    <IonButton expand="block" onClick={handleMessageUser}>
                      Message
                    </IonButton>
                  )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfilePage;
