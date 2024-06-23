import React, { useState } from 'react';
import { IonButton, IonCol, IonText, IonRow, IonInput, IonInputPasswordToggle, IonGrid } from '@ionic/react';

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

  return (
    <IonGrid>
      <IonRow>
        <IonCol size='12'>
          <IonText>
            <h2>{formData.uid ? 'Update' : 'Create'} Account</h2>
          </IonText>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='First Name'
              name='firstName'
              value={formData.firstName}
              onIonChange={(e) => handleChange('firstName', e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='Last Name'
              name='lastName'
              value={formData.lastName}
              onIonChange={(e) => handleChange('lastName', e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='Username'
              name='username'
              value={formData.username}
              onIonChange={(e) => handleChange('username', e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              type='email'
              labelPlacement='stacked'
              label='Email'
              name='email'
              value={formData.email}
              onIonChange={(e) => handleChange('email', e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              type='date'
              labelPlacement='stacked'
              label='When is your birthday?'
              name='birthdate'
              value={formData.birthdate}
              onIonChange={(e) => handleChange('birthdate', e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='City'
              name='city'
              value={formData.city}
              onIonChange={(e) => handleChange('city', e.detail.value!)}
            />
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='State'
              name='state'
              value={formData.state}
              onIonChange={(e) => handleChange('state', e.detail.value!)}
            />
          </IonCol>
          {!formData.uid && (
            <>
              <IonCol>
                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  labelPlacement='stacked'
                  label='Password'
                  name='password'
                  value={formData.password}
                  onIonChange={(e) => handleChange('password', e.detail.value!)}
                >
                  <IonInputPasswordToggle slot='end' onClick={() => setShowPassword(!showPassword)} />
                </IonInput>
              </IonCol>
              <IonCol>
                <IonInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  labelPlacement='stacked'
                  label='Confirm Password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onIonChange={(e) => handleChange('confirmPassword', e.detail.value!)}
                >
                  <IonInputPasswordToggle slot='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                </IonInput>
              </IonCol>
            </>
          )}
          {formData.uid ? (
            <IonButton expand='block' onClick={handleNext}>Next</IonButton>
          ) : (
            <>
              <IonButton expand='block' onClick={handleContinueHome}>Create Account and Go to Home</IonButton>
              <IonButton expand='block' onClick={handleContinueProfile}>Continue Creating Profile</IonButton>
            </>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AccountInformationForm;
