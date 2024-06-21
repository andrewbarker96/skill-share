import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

const ProfileForm: React.FC<Props> = ({ mode, initialProfileData, initialStep = 0, initialSkills, setInvalid, setSuccess, setErrorMessage, handleContinueProfile }) => {
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
    profileImage: '',
    profilePictureFile: null,
    uid: ''
  });
  const [allSkills, setAllSkills] = useState<Skills>(initialSkills);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log("Component mounted. Current step:", step);
    console.log("Initial skills:", initialSkills);
  }, [step, initialSkills]);

  useEffect(() => {
    if (mode === 'update' && initialProfileData) {
      console.log('Setting initial profile data:', initialProfileData);
      setFormData(initialProfileData);
    } else if (mode === 'update' && !initialProfileData) {
      const fetchUserProfile = async () => {
        try {
          if (auth.currentUser) {
            console.log('Fetching user profile...');
            const userProfile = await getUserProfile(auth.currentUser.uid);
            console.log('Fetched user profile:', userProfile);
            setFormData(userProfile);
          } else {
            console.error('No authenticated user found');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Failed to fetch user profile');
          setToastMessage('Failed to fetch user profile');
          setShowToast(true);
        }
      };
      fetchUserProfile();
    }
  }, [mode, initialProfileData]);

  const handleChange = (name: string, value: string) => {
    console.log(`Changing ${name} to ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfileData = async () => {
    const { password, confirmPassword, ...profileData } = formData;
    try {
      await updateProfile(formData.uid, profileData);
      console.log("Profile data saved successfully");
    } catch (error) {
      console.error("Error saving profile data:", error);
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
      console.log("Creating account...");
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("... created account");
  
      const user = userCredential.user;
  
      const updatedFormData = { ...formData, uid: user.uid };
      console.log("updated form data: ", updatedFormData);
      const { password, confirmPassword, ...profileData } = updatedFormData;
      try {
        await createProfile(profileData);
        console.log("Profile data created: ", profileData);
  
        setToastMessage("Account created successfully!");
        setShowToast(true);
        setSuccess(true);
        setFormData(updatedFormData);
  
        if (!redirectHome && handleContinueProfile) {
          setTimeout(() => {
            handleContinueProfile(user.uid);
          }, 2000);
        }
        if (redirectHome) {
          history.push('/');
        }
  
      } catch (error) {
        console.error("Error creating profile:", error);
        setErrorMessage('Failed to create profile');
        setInvalid(true);
        setShowToast(true);
      }
  
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage('Failed to create account');
      setInvalid(true);
      setToastMessage('Failed to create account');
      setShowToast(true);
    }
  };
  
  
  
  

  const handlePrev = async () => {
    await saveProfileData();
    console.log("Current step before decrement: ", step);
    setStep((prevStep) => {
      const newStep = prevStep - 1;
      console.log("Step updated to: ", newStep);
      return newStep;
    });
  };

  const handleNext = async () => {
    await saveProfileData();
    console.log("Moving to next step from:", step);
    setStep((prevStep) => {
      const newStep = prevStep + 1;
      console.log("Next step is:", newStep);
      return newStep;
    });
  };

  const handleSkillChange = (category: string, subcategory: string, skill: string, isChecked: boolean) => {
    const updatedSkills = { ...formData.skillsOffered };
    if (!updatedSkills[category]) {
      updatedSkills[category] = {};
    }
    if (!updatedSkills[category][subcategory]) {
      updatedSkills[category][subcategory] = [];
    }
    if (isChecked) {
      updatedSkills[category][subcategory].push(skill);
    } else {
      updatedSkills[category][subcategory] = updatedSkills[category][subcategory].filter((s: string) => s !== skill);
    }
    setFormData({ ...formData, skillsOffered: updatedSkills });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        console.log('Compressing image...');
        const compressedFile = await compressImage(file);
        console.log('Uploading image...');
        const downloadURL = await uploadImage(compressedFile, formData.uid);
        console.log('downloadURL: ', downloadURL)
        setFormData((prevData) => ({
          ...prevData,
          profileImage: downloadURL,
          profilePictureFile: null // Clear the file after uploading
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        setError('Failed to upload image');
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
      formData={formData}
      allSkills={allSkills}
      handleSkillChange={handleSkillChange}
      handleNext={handleNext}
      handlePrev={handlePrev}
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
      // Increment the step from 0 to 1 after uid is set
      setStep(1);
      console.log("Step incremented to 1 after UID is set", step);
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

