import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

export type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export interface BaseInputProps extends HtmlInputProps {
  value?: string;
  onChange?(value: string): void;
}

const BaseInput: FC<BaseInputProps> = ({ onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return <input {...props} onChange={handleChange} />;
};

export default BaseInput;
