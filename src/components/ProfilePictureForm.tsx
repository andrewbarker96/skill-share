// src/components/ProfilePictureForm.tsx
import React from 'react';
import { IonButton, IonItem, IonLabel, IonInput, IonImg } from '@ionic/react';

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handlePrev: () => void;
}

const ProfilePictureForm: React.FC<Props> = ({ formData, setFormData, handleImageUpload, handleSubmit, handlePrev }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event);
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setFormData((prevData: any) => ({
        ...prevData,
        profilePicture: fileURL,
      }));
    }
  };
  return (
    <div>
      <h2>Step 4: Profile Picture</h2>
      <IonItem>
        <IonLabel position="stacked">Upload Profile Picture</IonLabel>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </IonItem>
      {formData.profilePicture && (
        <IonItem>
          <IonImg src={formData.profilePicture} />
        </IonItem>
      )}
      <IonButton expand="block" onClick={handlePrev}>Previous</IonButton>
      <IonButton expand="block" onClick={handleSubmit}>Submit Profile</IonButton>
    </div>
  );
};

export default ProfilePictureForm;
