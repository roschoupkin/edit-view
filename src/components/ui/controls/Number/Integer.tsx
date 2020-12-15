import React, { useCallback, useEffect, useState, FC } from 'react';

import BaseInput, { HtmlInputProps } from '../../BaseInput';

const INT_REGEX = /^[+-]?\d+$/;

export interface IntegerProps extends HtmlInputProps {
  type?: 'number';
  value?: number;
  onChange?(value: number): void;
}

const Integer: FC<IntegerProps> = ({ type, value: valueProp, onChange, ...props }) => {
  const [integer, setInteger] = useState<number | undefined>(valueProp);

  const handleChange = useCallback((value: string) => {
    if (INT_REGEX.test(value)) {
      setInteger(parseInt(value, 10));
    }
  }, []);

  useEffect(() => {
    if (integer != null) {
      onChange?.(integer);
    }
  }, [integer]);

  return <BaseInput {...props} type='number' value={integer?.toString()} onChange={handleChange} />;
};

export default Integer;
