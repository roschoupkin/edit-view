import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SchemaContextType } from './types';

interface SchemaProps<T = Record<string, unknown>> {
  value: T;
  onChange?(value: T): void;
}

const SchemaContext = createContext<SchemaContextType | null>(null);

export const useSchemaContext = (): SchemaContextType => {
  const context = useContext(SchemaContext);

  if (!context) {
    throw Error('You can only use useSchemaContext inside <Schema />');
  }

  return context;
};

const Schema: FC<SchemaProps> = ({ children, value: initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (patch: Partial<Record<string, unknown>>) => {
      setValue({ ...value, ...patch });
    },
    [value]
  );

  const context = useMemo(
    () => ({
      value,
      onChange: handleChange,
    }),
    [value]
  );

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return <SchemaContext.Provider value={context}>{children}</SchemaContext.Provider>;
};

export default Schema;
