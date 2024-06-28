import { IonButton, IonCard, IonTitle,IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText, IonLabel, IonThumbnail, IonItem, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import React, {useEffect, useState} from 'react'
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
  id:string;
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
      
      <IonContent className = 'swapBackground'>
        <h2 className = ''>Swappers</h2>
        <h3>Explore other swappers!</h3>
        <IonGrid>
          {profiles.map(profile => (
            <IonCard key={profile.id} className='card' onClick={() => handleProfileClick(profile.id)}>
              <IonRow>
                <IonCol size="4">
                  <IonImg src={profile.profileImage || "https://ionicframework.com/docs/img/demos/card-media.png"} alt="Profile Image" />
                </IonCol>
                <IonCol size="8">
                  <IonCardHeader>
                    <IonCardTitle>{profile.firstName} {profile.lastName}</IonCardTitle>
                    <IonCardSubtitle>{profile.location}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCol>
              </IonRow>
            </IonCard>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default SkillSwapPage