import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'>;

export interface InputProps extends BaseInputProps {
  type?: 'number' | 'text' | 'password' | 'email' | 'tel';
  value?: string;
  onChange?(value: string): void;
}

const Input: FC<InputProps> = ({ type, onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return <input {...props} type={type} onChange={handleChange} />;
};

export default Input; // TODO: Convert it to BaseInput
