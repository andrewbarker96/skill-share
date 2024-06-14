import React from 'react';
import { IonInput, InputCustomEvent, InputChangeEventDetail, IonIcon, IonItem } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';

interface CustomIonInputProps extends React.ComponentProps<typeof IonInput> {
  onInputChange: (name: string, value: string) => void;
  showPasswordIcon?: boolean;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
}

const CustomIonInput: React.FC<CustomIonInputProps> = ({ onInputChange, showPasswordIcon, togglePasswordVisibility, showPassword, ...rest }) => {
  const handleChange = (e: InputCustomEvent<InputChangeEventDetail>) => {
    const target = e.target as unknown as HTMLInputElement;
    const { name, value } = target;
    onInputChange(name, value);
  };

  return (
      <IonInput
        {...rest}
        onIonChange={handleChange}
      >
      {showPasswordIcon && togglePasswordVisibility && (
        <IonIcon
          slot="end"
          icon={showPassword ? eyeOff : eye}
          onClick={togglePasswordVisibility}
          style={{ cursor: 'pointer',marginRight: '0.5rem' }}
        />
      )}
      
    </IonInput>
  );
};

export default CustomIonInput;
