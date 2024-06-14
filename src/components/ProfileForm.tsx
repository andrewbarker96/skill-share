import React, { useState, useEffect, ChangeEvent } from 'react';
import AccountInformationForm from './AccounInformationForm';
import SkillsForm from './SkillsForm';
import ProfilePictureForm from './ProfilePictureForm';
import { createProfile, getSkills, getUserProfile, updateProfile } from '../services/firestoreService';
import { uploadImage } from '../services/storageService';
import { compressImage } from '../../util/imageCompression';
import { InputChangeEventDetail, IonButton, IonCol, IonRow } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../util/firebase';
import { useHistory } from 'react-router';
import { ProfileData, Skills } from '../types';

interface Props {
  mode: 'create' | 'update';
  initialProfileData?: ProfileData;
  initialStep?: number;
}

const ProfileForm: React.FC<Props> = ({ mode, initialProfileData, initialStep = 0 }) => {
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
    // skillsWanted: {},
    profilePicture: '',
    profilePictureFile: null as File | null,
    uid: ''
  });
  const [allSkills, setAllSkills] = useState<Skills>({});
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // Log Current Step
  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getSkills();
        console.log('Skills data:', skills); // Debug log
        setAllSkills(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('Failed to fetch skills');
      } finally {
        setLoadingSkills(false);
      }
    };
    fetchSkills();
  }, []);

  // fetch profile data
  useEffect(() => {
    if (mode === 'update' && initialProfileData) {
      setFormData(initialProfileData);
    } else if (mode === 'update' && !initialProfileData) {
      // Fetch the user's profile data if not provided
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserProfile(auth.currentUser?.uid || '');
          setFormData(userProfile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [mode, initialProfileData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const saveProfileData = async () => {
    const { password, confirmPassword, ...profileData } = formData;
    try {
      await updateProfile(formData.uid, profileData);
      console.log("Profile data saved successfully");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleAccountCreation = async (redirectHome: boolean) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update formData with the user's UID
      const updatedFormData = { ...formData, uid: user.uid };

      // Create initial user profile in Firestore without password stored
      const { password, confirmPassword, ...profileData } = updatedFormData;
      await createProfile(profileData);

      alert("Account created successfully!");

      if (redirectHome) {
        // Redirect to home page
        history.push('/');
      } else {
        // Proceed to the next step
        setFormData(updatedFormData);
        history.push('/update-profile');
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
    }
  };
  
  const handlePrev = async () => {
    await saveProfileData();
    setStep(prevStep => prevStep - 1);
  };

  const handleNext = async () => {
    await saveProfileData();
    setStep(prevStep => prevStep + 1);
  };

  const handleSkillChange = (category: string, subcategory: string, skill: string, isChecked: boolean) => {
    const updatedSkills: { [key: string]: { [key: string]: string[] } } = { ...formData.skillsOffered };
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
        const compressedFile = await compressImage(file);
        setFormData({ ...formData, profilePictureFile: compressedFile });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async () => {
    await saveProfileData();
    alert("Profile updated successfully!");
    // Redirect to profile page
    history.push('/profile');
  };

  const steps = [
    <AccountInformationForm formData={formData} handleChange={handleChange} handleContinueHome={() => handleAccountCreation(true)} handleContinueProfile={() => handleAccountCreation(false)} handleNext={handleNext}/>,
    <SkillsForm formData={formData} allSkills={allSkills} handleSkillChange={handleSkillChange} handleNext={handleNext} handlePrev={handlePrev} />,
    <ProfilePictureForm formData={formData} setFormData={setFormData} handleImageUpload={handleImageUpload} handleSubmit={handleSubmit} handlePrev={handlePrev} />
  ];

  return (
    <form onSubmit={handleSubmit}>
      {mode === 'create' ? steps[0] : steps[step]}
    </form>
  );
};

export default ProfileForm;
