import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonText, IonRow, IonInput, IonInputPasswordToggle, IonGrid } from '@ionic/react';

interface Props {
  formData: any;
  handleChange: (name: string, value: string) => void;
  handleContinueHome: () => void;
  handleContinueProfile: () => void;
  handleNext: () => void;
}

const AccountInformationForm: React.FC<Props> = ({ formData, handleChange, handleContinueHome, handleContinueProfile, handleNext }) => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthdate: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setPasswordsMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'This field is required.';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'This field is required.';
        }
        break;
      case 'username':
        if (!value.trim()) {
          error = 'This field is required.';
        }
        break;
      case 'city':
        if (!value.trim()) {
          error = 'This field is required.';
        }
        break;
      case 'state':
        if (!value.trim()) {
          error = 'This field is required.';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email address.';
        }
        break;
      case 'birthdate':
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();
        if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
          error = 'You must be at least 18 years old.';
        }
        break;
      case 'password':
        if (value.length < 6) {
          error = 'Password must be at least 6 characters long.';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFieldChange = (name: string, value: string) => {
    handleChange(name, value);
    validateField(name, value);
  };

  const handleSubmit = (continueType: 'home' | 'profile') => {
    // Check all fields before submission
    Object.keys(formData).forEach(field => validateField(field, formData[field]));
    if (passwordsMatch && !Object.values(errors).some(error => error)) {
      if (continueType === 'home') {
        handleContinueHome();
      } else {
        handleContinueProfile();
      }
    }
  };

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
              onIonChange={(e) => handleFieldChange('firstName', e.detail.value!)}
            />
            {errors.firstName && <IonText color="danger">{errors.firstName}</IonText>}
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='Last Name'
              name='lastName'
              value={formData.lastName}
              onIonChange={(e) => handleFieldChange('lastName', e.detail.value!)}
            />
            {errors.lastName && <IonText color="danger">{errors.lastName}</IonText>}
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='Username'
              name='username'
              value={formData.username}
              onIonChange={(e) => handleFieldChange('username', e.detail.value!)}
            />
            {errors.username && <IonText color="danger">{errors.username}</IonText>}
          </IonCol>
          <IonCol>
            <IonInput
              type='email'
              labelPlacement='stacked'
              label='Email'
              name='email'
              value={formData.email}
              onIonChange={(e) => handleFieldChange('email', e.detail.value!)}
            />
            {errors.email && <IonText color="danger">{errors.email}</IonText>}
          </IonCol>
          <IonCol>
            <IonInput
              type='date'
              labelPlacement='stacked'
              label='When is your birthday?'
              name='birthdate'
              value={formData.birthdate}
              onIonChange={(e) => handleFieldChange('birthdate', e.detail.value!)}
            />
            {errors.birthdate && <IonText color="danger">{errors.birthdate}</IonText>}
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='City'
              name='city'
              value={formData.city}
              onIonChange={(e) => handleFieldChange('city', e.detail.value!)}
            />
            {errors.city && <IonText color="danger">{errors.city}</IonText>}
          </IonCol>
          <IonCol>
            <IonInput
              type='text'
              labelPlacement='stacked'
              label='State'
              name='state'
              value={formData.state}
              onIonChange={(e) => handleFieldChange('state', e.detail.value!)}
            />
            {errors.state && <IonText color="danger">{errors.state}</IonText>}
          </IonCol>
          {!formData.uid && (
            <>
              <IonCol>
                <IonInput
                  type='password'
                  labelPlacement='stacked'
                  label='Password'
                  name='password'
                  value={formData.password}
                  onIonChange={(e) => handleFieldChange('password', e.detail.value!)}
                >
                  <IonInputPasswordToggle slot='end' color={'medium'} />
                </IonInput>
                {errors.password && <IonText color="danger">{errors.password}</IonText>}
              </IonCol>
              <IonCol>
                <IonInput
                  type='password'
                  labelPlacement='stacked'
                  label='Confirm Password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onIonChange={(e) => handleFieldChange('confirmPassword', e.detail.value!)}
                >
                  <IonInputPasswordToggle slot='end' color={'medium'} />
                </IonInput>
                {errors.confirmPassword && <IonText color="danger">{errors.confirmPassword}</IonText>}
              </IonCol>
            </>
          )}
          <IonCol>

          {formData.uid ? (
            <IonButton expand='block' onClick={handleNext}>Next</IonButton>
          ) : (
            <>
              <IonButton expand='block' onClick={() => handleSubmit('home')}>Create Account and Go to Home</IonButton>
              <IonButton expand='block' onClick={() => handleSubmit('profile')}>Continue Creating Profile</IonButton>
            </>
          )}
          </IonCol>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AccountInformationForm;
