import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import { IonPage, IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import { auth } from '../../util/firebase';
import { getUserProfile } from '../services/firestoreService';
import { ProfileData } from '../types';

// Define the type for location state
interface LocationState {
  initialStep?: number;
  initialSkills?: any;
}

const UpdateProfilePage: React.FC = () => {
  const [initialProfileData, setInitialProfileData] = useState<ProfileData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation<LocationState>();

  const initialStep = location.state?.initialStep ?? 0;
  const initialSkills = location.state?.initialSkills ?? {};

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
    return <IonLoading isOpen={loading} message="Loading profile..." />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <ProfileForm
              mode="update"
              initialProfileData={initialProfileData}
              initialStep={initialStep}
              initialSkills={initialSkills}
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
