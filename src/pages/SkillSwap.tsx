import { IonButton, IonCard, IonTitle, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText, IonLabel, IonThumbnail, IonItem, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonAvatar } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { firestore, auth } from '../../util/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import "./SkillSwap.css"

interface SkillCardProps {
  title: string;
  description: string;
  image: string;
}

interface ProfileCardProps {
  id: string;
  firstName: string;
  lastName: string;
  location: string;
  profileImage: string;

}

const SkillSwapPage: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileCardProps[]>([]);
  const history = useHistory();
  const uid = auth.currentUser?.uid;


  useEffect(() => {
    const fetchProfiles = async () => {
      if (!uid) {
        console.error('UID is undefined. User might not be logged in.');
        window.location.href = '/';
        return;
      }

      const profilesCollection = collection(firestore, 'userProfiles');
      const profilesSnapshot = await getDocs(profilesCollection);
      const profilesList = profilesSnapshot.docs
        .filter(doc => doc.id !== uid)  // Exclude the currently logged-in user
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProfileCardProps[];

      setProfiles(profilesList);
    };

    fetchProfiles();
  }, [uid]);

  const handleProfileClick = (id: string) => {
    history.push(`/profile/${id}`);
  };



  return (
    <IonPage>

      <IonContent className='ion-padding'>
        <h2>Swappers</h2>
        <h3>Explore other swappers!</h3>
        <IonGrid>
          {profiles.map(profile => (
            <IonCard key={profile.id} onClick={() => handleProfileClick(profile.id)}>
              <IonItem lines='none' className='ion-padding-top ion-padding-bottom'>
                <IonAvatar slot='start' className='cardAvatar'>
                  <IonImg src={profile.profileImage || "https://ionicframework.com/docs/img/demos/card-media.png"} alt="Profile Image" />
                </IonAvatar>
                <IonCardContent>
                  <IonText><h1>{profile.firstName} {profile.lastName}</h1></IonText>
                  <IonCardSubtitle>{profile.location}</IonCardSubtitle>
                </IonCardContent>
              </IonItem>
            </IonCard>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default SkillSwapPage