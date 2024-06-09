// src/components/PersonalInformationForm.tsx
import React from 'react';
import { IonButton, IonItem, IonLabel } from '@ionic/react';
import CustomIonInput from './CustomIonInput';

interface Props {
  formData: any;
  handleChange: (name: string, value: string) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const PersonalInformationForm: React.FC<Props> = ({ formData, handleChange, handleNext, handlePrev }) => {
  return (
    <div>
      <h2>Step 2: Personal Information</h2>
      <IonItem>
        <IonLabel position="floating">When's your birthday?</IonLabel>
        <CustomIonInput type="date" name="birthdate" value={formData.birthdate} onInputChange={handleChange} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">City</IonLabel>
        <CustomIonInput type="text" name="city" value={formData.city} onInputChange={handleChange} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">State</IonLabel>
        <CustomIonInput type="text" name="state" value={formData.state} onInputChange={handleChange} />
      </IonItem>
      <IonButton expand="block" onClick={handlePrev}>Previous</IonButton>
      <IonButton expand="block" onClick={handleNext}>Next</IonButton>
    </div>
  );
};

export default PersonalInformationForm;
