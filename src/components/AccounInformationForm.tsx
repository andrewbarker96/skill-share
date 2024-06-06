import React from 'react';
import CustomIonInput from './CustomIonInput';
import { IonButton, IonItem, IonLabel, IonContent, IonText } from '@ionic/react';

interface Props {
  formData: any;
  handleChange: (name: string, value: string) => void;
  handleNext: () => void;
}

const AccountInformationForm: React.FC<Props> = ({ formData, handleChange, handleNext }) => {
  return (
    <IonContent>
        <IonText>
            <h2>Step 1: Account Information</h2>
        </IonText>
        <IonItem>
            <IonLabel position="floating">First Name</IonLabel>
            <CustomIonInput type="text" name="firstName" value={formData.firstName} onInputChange={handleChange} />
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Last Name</IonLabel>
            <CustomIonInput type="text" name="lastName" value={formData.lastName} onInputChange={handleChange} />
        </IonItem>
        <IonItem>
            <IonLabel position="floating"></IonLabel>
            <CustomIonInput type="text" name="username" value={formData.username} onInputChange={handleChange} />
        </IonItem>
        <IonItem>
            <IonLabel position="floating"></IonLabel>
            <CustomIonInput type="email" name="email" value={formData.email} onInputChange={handleChange} />
        </IonItem>
        <IonItem>
            <IonLabel position="floating"></IonLabel>
            <CustomIonInput type="password" name="password" value={formData.password} onInputChange={handleChange} />
        </IonItem>
        <IonItem>
            <IonLabel position="floating"></IonLabel>
            <CustomIonInput type="password" name="confirmPassword" value={formData.confirmPassword} onInputChange={handleChange} />
        </IonItem>
        <IonButton expand="block" onClick={handleNext}>Next</IonButton>
    </IonContent>
  );
};

export default AccountInformationForm;
