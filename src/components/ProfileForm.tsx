import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AccountInformationForm from './AccounInformationForm';
import SkillsForm from './SkillsForm';
import ProfilePictureForm from './ProfilePictureForm';
import { createProfile, getUserProfile, updateProfile } from '../services/firestoreService';
import { compressImage } from '../../util/imageCompression';
import { IonLoading, IonToast } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../util/firebase';
import { ProfileData, Skills } from '../types';
import { uploadImage } from '../services/storageService';

interface Props {
  mode: 'create' | 'update';
  initialProfileData?: ProfileData;
  initialStep: number;
  initialSkills: Skills;
  setInvalid: (state: boolean) => void;
  setSuccess: (state: boolean) => void;
  setErrorMessage: (message: string) => void;
  handleContinueProfile?: (uid: string) => void;
}

const ProfileForm: React.FC<Props> = ({
  mode,
  initialProfileData,
  initialStep = 0,
  initialSkills,
  setInvalid,
  setSuccess,
  setErrorMessage,
  handleContinueProfile
}) => {
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    city: '',
    state: '',
    skillsOffered: {},
    skillsWanted: {},
    profileImage: '',
    profilePictureFile: null,
    uid: ''
  });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const history = useHistory();

  useEffect(() => {
    if (mode === 'update' && initialProfileData) {
      setFormData(initialProfileData);
    } else if (mode === 'update') {
      const fetchUserProfile = async () => {
        if (auth.currentUser) {
          try {
            const userProfile = await getUserProfile(auth.currentUser.uid);
            setFormData(userProfile);
          } catch (error) {
            setErrorMessage('Failed to fetch user profile');
            setShowToast(true);
          }
        }
      };
      fetchUserProfile();
    }
  }, [mode, initialProfileData, setErrorMessage]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfileData = async () => {
    const { password, confirmPassword, ...profileData } = formData;
    try {
      await updateProfile(formData.uid, profileData);
    } catch (error) {
      setToastMessage('Failed to save profile data');
      setShowToast(true);
    }
  };

  const handleAccountCreation = async (redirectHome: boolean) => {
    if (formData.password !== formData.confirmPassword) {
      setToastMessage('Passwords do not match');
      setShowToast(true);
      return;
    }

    try {
      //create user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const updatedFormData = { ...formData, uid: user.uid };
      const { password, confirmPassword, ...profileData } = updatedFormData;
      // create user profile
      await createProfile(profileData);
      setToastMessage("Account created successfully!");
      setShowToast(true);
      setSuccess(true);
      setFormData(updatedFormData);

      if (!redirectHome && handleContinueProfile) {
        await handleContinueProfile(user.uid);
      } else if (redirectHome) {
        history.push('/');
      }
    } catch (error) {
      setErrorMessage('Failed to create account');
      setInvalid(true);
      setToastMessage('Failed to create account');
      setShowToast(true);
    }
  };

  const handlePrev = async () => {
    await saveProfileData();
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = async () => {
    await saveProfileData();
    setStep((prevStep) => prevStep + 1);
  };

  const handleSkillChange = (type: 'offered' | 'wanted', category: string, subcategory: string, skill: string, isChecked: boolean) => {
    const updatedSkills = { ...formData[type === 'offered' ? 'skillsOffered' : 'skillsWanted'] };
    if (!updatedSkills[category]) updatedSkills[category] = {};
    if (!updatedSkills[category][subcategory]) updatedSkills[category][subcategory] = [];

    if (isChecked) {
      updatedSkills[category][subcategory].push(skill);
    } else {
      updatedSkills[category][subcategory] = updatedSkills[category][subcategory].filter((s: string) => s !== skill);
    }

    setFormData({ ...formData, [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: updatedSkills });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const compressedFile = await compressImage(file);
        const downloadURL = await uploadImage(compressedFile, formData.uid);
        setFormData((prevData) => ({
          ...prevData,
          profileImage: downloadURL,
          profilePictureFile: null
        }));
      } catch (error) {
        setToastMessage('Failed to upload image');
        setShowToast(true);
      }
    }
  };

  const handleSubmit = async () => {
    await saveProfileData();
    setToastMessage("Profile updated successfully!");
    setShowToast(true);
    history.push('/profile');
  };

  const steps = [
    <AccountInformationForm
      formData={formData}
      handleChange={handleChange}
      handleContinueHome={() => handleAccountCreation(true)}
      handleContinueProfile={() => handleAccountCreation(false)}
      handleNext={handleNext}
    />,
    <SkillsForm
      mode="offered"
      formData={formData}
      handleSkillChange={(category, subcategory, skill, isChecked) => handleSkillChange('offered', category, subcategory, skill, isChecked)}
      handleNext={handleNext}
      handlePrev={handlePrev}
    />,
    <SkillsForm
      mode="wanted"
      formData={formData}
      handleSkillChange={(category, subcategory, skill, isChecked) => handleSkillChange('wanted', category, subcategory, skill, isChecked)}
      handleNext={handleNext}
      handlePrev={handlePrev}
      filterOfferedSkills={formData.skillsOffered}
    />,
    <ProfilePictureForm
      formData={formData}
      setFormData={setFormData}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleSubmit}
      handlePrev={handlePrev}
    />
  ];

  useEffect(() => {
    if (mode === 'create' && step === 0 && formData.uid) {
      setStep(1);
    }
  }, [formData.uid, mode, step]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <IonLoading isOpen={loading} message="Processing..." />
        ) : (
          steps[step]
        )}
      </form>
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
};

export default ProfileForm;
