import React, { useState, useEffect, ChangeEvent } from 'react';
import AccountInformationForm from './AccounInformationForm';
import PersonalInformationForm from './PersonalInformationForm';
import SkillsForm from './SkillsForm';
import ProfilePictureForm from './ProfilePictureForm';
import { createProfile, getSkills, updateProfile } from '../services/firestoreService';
import { uploadImage } from '../services/storageService';
import { compressImage } from '../../util/imageCompression';
import { InputChangeEventDetail, IonButton } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../util/firebase';

interface Props {
  mode: 'create' | 'update';
  initialProfileData?: any;
}

const ProfileForm: React.FC<Props> = ({ mode, initialProfileData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    city: '',
    state: '',
    skills: {},
    profilePicture: '',
    profilePictureFile: null as File | null
  });
  const [allSkills, setAllSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skills = await getSkills();
      setAllSkills(skills);
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    if (initialProfileData) {
      setFormData(initialProfileData);
    }
  }, [initialProfileData]);

  const handleNext = async () => {
    if (step === 1) {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
  
        // Update formData with the user's UID
        setFormData(prev => ({ ...prev, userID: user.uid }));
  
        // Proceed to the next step
        setStep(step + 1);
      } catch (error) {
        console.error("Error creating user:", error);
        // Handle error
      }
    } else {
      // Proceed to the next step
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSkillChange = (category: string, subcategory: string, skill: string, isChecked: boolean) => {
    const updatedSkills: { [key: string]: { [key: string]: string[] } } = { ...formData.skills };
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
    setFormData({ ...formData, skills: updatedSkills });
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
    let profilePictureURL = null;
    if (formData.profilePictureFile) {
      const userId = formData.email;  
      profilePictureURL = await uploadImage(formData.profilePictureFile, userId);
    }
  
    const { profilePictureFile, ...profileWithoutProfilePictureFile } = formData;
  
    if (profilePictureURL !== null) {
      profileWithoutProfilePictureFile.profilePicture = profilePictureURL;
    }
  
    if (mode === 'create') {
      await createProfile(profileWithoutProfilePictureFile);
    } else if (mode === 'update') {
      // Assuming you have the profile id stored somewhere in your component state or props
      await updateProfile("22", profileWithoutProfilePictureFile);
    }
    alert("Profile updated successfully!");
    // reset the form or navigate to another page
  };
  
  
  
  
  

  return (
    <div>
      {step === 1 && (
        <AccountInformationForm formData={formData} handleChange={handleChange} handleNext={handleNext} />
      )}
      {step === 2 && (
        <PersonalInformationForm formData={formData} handleChange={handleChange} handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 3 && (
        <SkillsForm formData={formData} allSkills={allSkills} handleSkillChange={handleSkillChange} handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {step === 4 && (
        <ProfilePictureForm formData={formData} setFormData={setFormData} handleImageUpload={handleImageUpload} handleSubmit={handleSubmit} handlePrev={handlePrev} />
      )}
      <IonButton expand="block" onClick={handlePrev} disabled={step === 1}>Previous</IonButton>
      {step < 4 && <IonButton expand="block" onClick={handleNext}>Next</IonButton>}
      {step === 4 && <IonButton expand="block" onClick={handleSubmit}>Submit Profile</IonButton>}
    </div>
  );
};

export default ProfileForm;
