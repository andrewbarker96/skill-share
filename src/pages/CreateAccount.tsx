import { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonImg,
  IonPage,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
  IonIcon,
  IonLoading,
} from '@ionic/react';
import { getSkills } from '../services/firestoreService';
import { Skills } from '../types';
import ProfileForm from '../components/ProfileForm';
import Copyright from '../components/Copyright';
import { arrowBack } from 'ionicons/icons';

export default function CreateAccountPage() {
  const [skills, setSkills] = useState<Skills>({});
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getSkills();
        setSkills(skillsData);
        console.log('skills data: ', skillsData)
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('Failed to fetch skills');
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  if (loadingSkills) {
    return <IonLoading isOpen={loadingSkills} message="Loading skills..." />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton size="large" slot="icon-only" fill="clear" routerLink="/">
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Return to Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="form">
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
                mode="create"
                initialStep={0}
                initialSkills={skills}
                setInvalid={setInvalid}
                setSuccess={setSuccess}
                setErrorMessage={setErrorMessage}
              />
            </IonCol>
          </IonRow>
          <Copyright />
        </IonGrid>
        <IonToast
          isOpen={invalid}
          color="danger"
          onDidDismiss={() => setInvalid(false)}
          message={errorMessage}
          duration={3000}
        />
        <IonToast
          isOpen={success}
          color="success"
          onDidDismiss={() => setSuccess(false)}
          message="Account Created"
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
}
