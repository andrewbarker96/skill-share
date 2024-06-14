import React, { useState } from 'react';
import CustomIonInput from './CustomIonInput';
import { IonButton, IonItem, IonLabel, IonText, IonRow, IonCol, IonIcon } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';

interface Props {
  formData: any;
  handleChange: (name: string, value: string) => void;
  handleContinueHome: () => void;
  handleContinueProfile: () => void;
  handleNext: () => void;
}

const AccountInformationForm: React.FC<Props> = ({ formData, handleChange, handleContinueHome, handleContinueProfile, handleNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <IonRow>
      <IonCol size='12'>
        <IonText>
          <h2>{formData.uid ? 'Update' : 'Create'} Account</h2>
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
          <IonLabel position="floating">Username</IonLabel>
          <CustomIonInput type="text" name="username" value={formData.username} onInputChange={handleChange} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <CustomIonInput type="email" name="email" value={formData.email} onInputChange={handleChange} />
        </IonItem>
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
        {!formData.uid && (
          <>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <CustomIonInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onInputChange={handleChange}
                showPasswordIcon
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <CustomIonInput
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onInputChange={handleChange}
                showPasswordIcon
                togglePasswordVisibility={toggleConfirmPasswordVisibility}
                showPassword={showConfirmPassword}
              />
            </IonItem>
          </>
        )}
        {formData.uid ? (
          <IonButton expand="block" onClick={handleNext}>Next</IonButton>
        ) : (
          <>
            <IonButton expand="block" onClick={handleContinueHome}>Create Account and Go to Home</IonButton>
            <IonButton expand="block" onClick={handleContinueProfile}>Continue Creating Profile</IonButton>
          </>
        )}
      </IonCol>
    </IonRow>
  );
};

export default AccountInformationForm;
