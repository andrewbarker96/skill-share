import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import { IonPage, IonGrid, IonRow, IonCol, IonLoading, IonContent, IonText, IonImg, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { auth } from '../../util/firebase';
import { getUserProfile } from '../services/firestoreService';
import { ProfileData } from '../types';
import TopMenu from '../components/TopMenu';
import GoBackOption from '../components/GoBack';

interface LocationState {
  mode: 'update';
  initialStep?: number;
  initialSkills?: any;
  uid?: string;
}

const UpdateProfilePage: React.FC = () => {
  const [initialProfileData, setInitialProfileData] = useState<ProfileData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation<LocationState>();
  const history = useHistory();

  const initialStep = location.state?.initialStep ?? 0;
  const initialSkills = location.state?.initialSkills ?? {};

  useEffect(() => {
    const fetchProfileData = async () => {
      if (auth.currentUser) {
        try {
          const profileData = await getUserProfile(auth.currentUser.uid);
          setInitialProfileData(profileData);
        } catch (error) {
          setError('Failed to fetch profile data');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No authenticated user found');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileUpdate = (updatedProfileData: ProfileData) => {
    setInitialProfileData(updatedProfileData);
    history.push(`/profile/${auth.currentUser?.uid}`, { updatedProfile: updatedProfileData });
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent>
          <IonLoading isOpen={loading} message="Loading profile..." />
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent>
          <IonText color="danger">{error}</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <GoBackOption />
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid class="form">
          <IonRow>
            <IonCol size="12">
              <IonImg
                src="https://firebasestorage.googleapis.com/v0/b/skill-share-791ad.appspot.com/o/SkillSwap-Horizontal.png?alt=media&token=b1ac2ccd-0de3-4997-b50a-6ee7a07580a2"
                alt="SkillSwap Logo"
                style={{ height: '75px', marginBottom: '5%' }}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <ProfileForm
                mode="update"
                initialProfileData={initialProfileData}
                initialStep={initialStep}
                initialSkills={initialSkills}
                onSubmit={handleProfileUpdate}
                setInvalid={() => {}}
                setSuccess={() => {}}
                setErrorMessage={() => {}}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UpdateProfilePage;
