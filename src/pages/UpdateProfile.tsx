import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { auth } from '../../util/firebase';
import { getUserProfile } from '../services/firestoreService';
import { ProfileData } from '../types';

const UpdateProfilePage: React.FC = () => {
    const [initialProfileData, setInitialProfileData] = useState<ProfileData | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProfileData = async () => {
        if (auth.currentUser) {
          try {
            const profileData = await getUserProfile(auth.currentUser.uid);
            setInitialProfileData(profileData);
          } catch (error) {
            console.error('Error fetching profile data:', error);
            setError('Failed to fetch profile data');
          } finally {
            setLoading(false);
          }
        }else {
          console.error('No authenticated user found');
          setLoading(false);
        }
      };
  
      fetchProfileData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // You can replace this with a loading spinner
    }
  
    if (error) {
      return <div>{error}</div>; // Display the error message
    };
  return (
    <IonPage>
      <IonGrid>
        <IonRow>
            <IonCol size='12'>
                <ProfileForm mode="update" initialProfileData={initialProfileData} initialStep={1}  />
            </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default UpdateProfilePage;
