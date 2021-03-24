import React, { useCallback, useEffect, useMemo, useState, FC } from 'react';

import BaseInput, { HtmlInputProps } from '../../ui/BaseInput';

export interface FloatProps extends HtmlInputProps {
  type?: 'number';
  value?: number;
  fraction?: number;
  onChange?(value: number): void;
}

const Float: FC<FloatProps> = ({ type, fraction, value: valueProp, onChange, ...props }) => {
  const [float, setFloat] = useState<number | undefined>(valueProp);

  const regex = useMemo(() => new RegExp(`^[+-]?\\d+(\\.\\d${fraction ?? '+'})?$`), [fraction]);

  const handleChange = useCallback(
    (value: string) => {
      if (regex.test(value)) {
        setFloat(parseFloat(value));
      }
    },
    [regex]
  );

  useEffect(() => {
    if (float != null) {
      onChange?.(float);
    }
  }, [float]);

  return <BaseInput {...props} type="number" value={valueProp?.toString()} onChange={handleChange} />;
};

export default Float;
