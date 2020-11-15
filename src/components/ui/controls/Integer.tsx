import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

const INT_REGEX = /^[+-]?\d+$/;

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'>;

export interface IntegerProps extends BaseInputProps {
  type?: 'number';
  value?: number;
  onChange?(value: number): void;
}

const Integer: FC<IntegerProps> = ({ type, onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onChange && INT_REGEX.test(value)) {
      onChange(parseInt(value, 10));
    }
  };

  return <input {...props} type='number' onChange={handleChange} />;
};

export default Integer;
