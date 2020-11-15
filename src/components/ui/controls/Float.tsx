import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

const FLOAT_REGEX = /^[+-]?\d+(\.\d+)?$/;

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'>;

export interface FloatProps extends BaseInputProps {
  type?: 'number';
  value?: number;
  onChange?(value: number): void;
}

const Float: FC<FloatProps> = ({ type, onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onChange && FLOAT_REGEX.test(value)) {
      onChange(parseFloat(value));
    }
  };

  return <input {...props} type='number' onChange={handleChange} />;
};

export default Float;
