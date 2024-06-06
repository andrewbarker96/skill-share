import React from 'react';
import { IonInput, InputCustomEvent, InputChangeEventDetail } from '@ionic/react';

interface CustomIonInputProps extends React.ComponentProps<typeof IonInput> {
  onInputChange: (name: string, value: string) => void;
}

const CustomIonInput: React.FC<CustomIonInputProps> = ({ onInputChange, ...rest }) => {
  const handleChange = (e: InputCustomEvent<InputChangeEventDetail>) => {
    const target = e.target as unknown as HTMLInputElement;
    const { name, value } = target;
    onInputChange(name, value);
  };

  return (
    <IonInput
      {...rest}
      onIonChange={handleChange}
    />
  );
};

export default CustomIonInput;
