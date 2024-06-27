import { useState } from 'react';
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
} from '@ionic/react';
import { getSkills } from '../services/firestoreService';
import { Skills } from '../types';
import ProfileForm from '../components/ProfileForm';
import Copyright from '../components/Copyright';
import { arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import GoBackOption from '../components/GoBack';

const CreateAccountPage: React.FC = () => {
  const [skills, setSkills] = useState<Skills>({});
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleContinueProfile = (uid: string) => {
    history.push({
      pathname: '/update-profile',
      state: { mode: 'update', initialStep: 1, initialSkills: skills, uid }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <GoBackOption />
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

export default CreateAccountPage;
