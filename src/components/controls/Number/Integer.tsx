import React, { useCallback, useEffect, useState, FC } from 'react';

import BaseInput, { BaseInputProps } from '../../ui/BaseInput';

const INT_REGEX = /^[+-]?\d+$/;

export interface IntegerProps extends BaseInputProps<number> {
  type?: 'number';
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

  return <BaseInput {...props} type="number" value={integer?.toString()} onChange={handleChange} />;
};

export default Integer;
