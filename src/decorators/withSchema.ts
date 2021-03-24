import { createElement, FunctionComponent, useCallback } from 'react';
import { ControlProps } from '@controls';
import { useSchemaContext } from '../components/schema/Schema';

function hasKey<K extends string>(obj: object, key: K): obj is Record<K, unknown> {
  return obj.hasOwnProperty(key);
}

export function withSchema<T extends ControlProps>(key: string) {
  return (Component: FunctionComponent<T>) => {
    return (props: T) => {
      const { value: contextValue, onChange } = useSchemaContext();
      if (hasKey(contextValue, key)) {
        const value = contextValue[key];

        const handleChange = useCallback(
          (patch: unknown) => {
            onChange({ [key]: patch });
          },
          [value]
        );

        return createElement(Component, { ...props, value, onChange: handleChange });
      }
      return null;
    };
  };
}
