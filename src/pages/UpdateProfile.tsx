import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import { IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import { auth } from '../../util/firebase';
import { getUserProfile } from '../services/firestoreService';
import { ProfileData } from '../types';

const UpdateProfilePage: React.FC = () => {
  const [initialProfileData, setInitialProfileData] = useState<ProfileData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log('Fetching profile data...');
      if (auth.currentUser) {
        try {
          const profileData = await getUserProfile(auth.currentUser.uid);
          setInitialProfileData(profileData);
          console.log('Fetched profile data:', profileData);
        } catch (error) {
          console.error('Error fetching profile data:', error);
          setError('Failed to fetch profile data');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No authenticated user found');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    // Replace this with a loading spinner
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Determine the initial step based on the navigation state
  const initialStep = location.state && (location.state as any).initialStep !== undefined ? (location.state as any).initialStep : 0;

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <ProfileForm
              mode="update"
              initialProfileData={initialProfileData}
              initialStep={initialStep}
              initialSkills={{}} // You can pass an empty object or fetch skills separately if needed
              setInvalid={() => {}}
              setSuccess={() => {}}
              setErrorMessage={() => {}}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default UpdateProfilePage;
