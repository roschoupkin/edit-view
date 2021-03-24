import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { SchemaContextType } from './types';

interface SchemaProps<T extends object> {
  value: T;
  children?: ReactNode;
  onChange?(value: T): void;
}

const SchemaContext = createContext<SchemaContextType | null>(null);

export function useSchemaContext<T extends object>() {
  const context = useContext(SchemaContext);

  if (!context) {
    throw Error('You can only use useSchemaContext inside <Schema />');
  }

  return context as SchemaContextType<T>;
}

export default function Schema<T extends object>({ children, value: initialValue, onChange }: SchemaProps<T>) {
  const prevValue = useRef<T>(initialValue);
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = useCallback(
    (patch: Partial<T>) => {
      setValue({ ...value, ...patch });
    },
    [value]
  );

  const context: SchemaContextType<T> = useMemo(
    () => ({
      value,
      onChange: handleChange,
    }),
    [value]
  );

  useEffect(() => {
    if (!isEqual(prevValue.current, value)) {
      onChange?.(value);
    }
    return () => {
      prevValue.current = value;
    };
  }, [value]);

  return <SchemaContext.Provider value={context}>{children}</SchemaContext.Provider>;
}
