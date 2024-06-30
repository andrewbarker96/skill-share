import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { firestore, auth } from '../../util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { IonCol, IonContent, IonCard, IonCardContent, IonCardTitle,IonCardHeader, IonCardSubtitle, IonGrid, IonImg, IonPage, IonRow, IonText, IonButton, IonFabButton, IonIcon, IonFab, IonAvatar, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { createChat } from '../services/messageService';
import { chatbox, pencil } from 'ionicons/icons';
import { getUserProfile } from '../services/firestoreService';
import './UserProfile.css';
import TopMenu from '../components/TopMenu';
import GoBackOption from "../components/GoBack";

interface LocationState {
  updatedProfile?: any;
}

const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  const { uid } = useParams<{ uid: string }>();
  const [selectedSkills, setSelectedSkills] = useState<{ [category: string]: { [subcategory: string]: string[] } }>({});
  const history = useHistory();
  const location = useLocation<LocationState>();
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) {
        console.error('UID is undefined. User might not be logged in.');
        window.location.href = '/';
        return;
      }

      const docRef = doc(firestore, 'userProfiles', uid);
      const docSnap = await getDoc(docRef);

      const userProfile = await getUserProfile(uid);
      setProfile(userProfile);
      setSelectedSkills(userProfile.skillsOffered || {});

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.error('No such document!');
      }
    };

    if (location.state?.updatedProfile) {
      setProfile(location.state.updatedProfile);
    } else {
      fetchProfile();
    }
  }, [uid, location.state?.updatedProfile]);

  const handleEditProfile = () => {
    history.push('/update-profile', {
      mode: 'update',
      initialStep: 0,
      initialSkills: profile.skillsOffered || {}
    });
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
      <IonCard key={category}>
        <IonCardHeader>
          <IonCardTitle>{category} Skills</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {Object.keys(skills[category]).map((subcategory) => (
            <div key={subcategory} style={{ marginBottom: '10px' }}>
              <IonText>
                <h3><strong>{subcategory}</strong></h3>
              </IonText>
              <ul>
                {(skills[category][subcategory] as string[]).map((skill, index) => (
                  <li key={index} className='skillList'>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </IonCardContent>
      </IonCard>
    ));
  };



/*   const renderSkills = (skills: any) => {
    if (!skills) return null;

    return Object.keys(skills).map((category) => (
      <div key={category} style={{ paddingLeft: '20px' }}>
        <IonText>
          <h2>{category} Skills</h2>
        </IonText>
        {Object.keys(skills[category]).map((subcategory) => (
          <div key={subcategory}>
            <IonText>
              <h3><strong>{subcategory}</strong></h3>
            </IonText>
            <ul>
              {(skills[category][subcategory] as string[]).map((skill, index) => (
                <li key={index} className='skillList'>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ));
  }; */
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>{profile.username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div className='avatarContainer'>
          <IonAvatar className='profileAvatar'>
            <IonImg src={profile.profileImage} />
          </IonAvatar>
        </div>
        
        <IonText className='ion-text-center'>
          <h1>{profile.firstName} {profile.lastName}</h1>
          <p>{profile.city}, {profile.state}</p>
          <p>{profile.profileDescription}</p>
        </IonText>
        
        <IonText className='profileSkills'>
          <h1><span className='swap'>Swappable</span> Skills</h1> <br></br>
          {renderSkills(profile.skillsOffered)}
        </IonText>

        <IonFab className='ion-padding' slot='fixed' vertical='top' horizontal='end'>
          {currentUserId === uid ? (
            <IonFabButton onClick={handleEditProfile}>
              <IonIcon icon={pencil} />
            </IonFabButton>
          ) : (
            <IonFabButton onClick={handleMessageUser}>
              <IonIcon icon={chatbox} />
            </IonFabButton>
          )}
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UserProfilePage;
