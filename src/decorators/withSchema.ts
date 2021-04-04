import { createElement, FunctionComponent, useCallback } from 'react';
import { ControlProps } from '@controls';
import { useSchemaContext } from '../components/schema/Schema';

function hasKey<K extends string>(obj: object, key: K): obj is Record<K, unknown> {
  return obj.hasOwnProperty(key);
}

export function withSchema<P extends ControlProps>(key: string) {
  return useCallback(
    (Component: FunctionComponent<P>) => {
      return useCallback(
        (props: P) => {
          const { value: contextValue, onChange } = useSchemaContext();
          const value = hasKey(contextValue, key) ? contextValue[key] : undefined;

          const handleChange = useCallback(
            (patch: unknown) => {
              onChange({ [key]: patch });
            },
            [value, onChange]
          );

          return createElement(Component, { ...props, key, value, onChange: handleChange });
        },
        [Component]
      );
    },
    [key]
  );
}
