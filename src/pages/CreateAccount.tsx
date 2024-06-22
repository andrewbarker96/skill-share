import { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonImg,
  IonPage,
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
import { useHistory } from 'react-router-dom';

export default function CreateAccountPage() {
  const [skills, setSkills] = useState<Skills>({});
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    let didCancel = false;

    const fetchSkills = async () => {
      try {
        console.log('Fetching skills...');
        const skillsData = await getSkills();
        if (!didCancel) {
          setSkills(skillsData);
          console.log('Fetched skills data: ', skillsData);
        }
      } catch (error) {
        if (!didCancel) {
          console.error('Error fetching skills:', error);
          setError('Failed to fetch skills');
          setErrorMessage('Failed to fetch skills');
          setInvalid(true);
        }
      } finally {
        if (!didCancel) {
          setLoadingSkills(false);
        }
      }
    };

    fetchSkills();

    return () => {
      didCancel = true;
    };
  }, []);

  if (loadingSkills) {
    return <IonLoading isOpen={loadingSkills} message="Loading skills..." />;
  }

  const handleContinueProfile = (uid: string) => {
    console.log("continue profile CA start: ", skills, uid);
    history.push({
      pathname: '/update-profile',
      state: { mode: 'update', initialStep: 1, initialSkills: skills, uid }
    });
  };

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
                handleContinueProfile={handleContinueProfile}
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
