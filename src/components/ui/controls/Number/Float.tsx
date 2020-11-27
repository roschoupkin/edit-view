import React, { useMemo, FC } from 'react';

import BaseInput, { HtmlInputProps } from '../../BaseInput';

export interface FloatProps extends HtmlInputProps {
  type?: 'number';
  value?: number;
  fraction?: number;
  onChange?(value: number): void;
}

const Float: FC<FloatProps> = ({ type, fraction, value: valueProp, onChange, ...props }) => {
  const regex = useMemo(() => new RegExp(`^[+-]?\\d+(\\.\\d${fraction ?? '+'})?$`), [fraction]);

  const handleChange = (value: string) => {
    if (onChange && regex.test(value)) {
      onChange(parseFloat(value));
    }
  };

  return <BaseInput {...props} type='number' value={valueProp?.toString()} onChange={handleChange} />;
};

export default Float;
