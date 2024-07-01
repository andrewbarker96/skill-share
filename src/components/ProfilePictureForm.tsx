import React from 'react';
import { IonButton, IonItem, IonLabel, IonImg, IonRow, IonCol, IonText } from '@ionic/react';
import { auth } from '../../util/firebase';

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  handlePrev: () => void;
}

const ProfilePictureForm: React.FC<Props> = ({ formData, setFormData, handleImageUpload, handleSubmit, handlePrev }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event);
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0]);
      setFormData((prevData: any) => ({
        ...prevData,
        profileImage: fileURL,
      }));
    }
  };

  return (
    <IonRow>
      <IonCol size='12'>
        <IonText>
          <h2>Profile Picture</h2>
        </IonText>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Upload Profile Picture</IonLabel>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ padding: '1rem 0rem 0.5rem' }} />
          </IonItem>
          {formData.profileImage && (
            <IonItem>
              <IonImg src={formData.profileImage} />
            </IonItem>
          )}
        </IonCol>
      </IonCol>
      <IonCol>
        <IonButton shape='round' expand="block" onClick={handlePrev}>Previous</IonButton>
        <IonButton shape='round' expand="block" type="submit">Submit Profile</IonButton>
      </IonCol>
    </IonRow>
  );
};

export default ProfilePictureForm;
