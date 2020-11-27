import React, { FC } from 'react';

import BaseInput, { HtmlInputProps } from '../../BaseInput';

const INT_REGEX = /^[+-]?\d+$/;

export interface IntegerProps extends HtmlInputProps {
  type?: 'number';
  value?: number;
  onChange?(value: number): void;
}

const Integer: FC<IntegerProps> = ({ type, value: valueProp, onChange, ...props }) => {
  const handleChange = (value: string) => {
    if (onChange && INT_REGEX.test(value)) {
      onChange(parseInt(value, 10));
    }
  };

  return <BaseInput {...props} type='number' value={valueProp?.toString()} onChange={handleChange} />;
};

export default Integer;
