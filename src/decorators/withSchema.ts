import { createElement, FunctionComponent, useCallback } from 'react';
import { ControlProps } from '../components/controls/types';
import { useSchemaContext } from '../components/schema/Schema';

export function withSchema<T extends ControlProps>(key: string) {
  return (Component: FunctionComponent<T>) => {
    return (props: T) => {
      const context = useSchemaContext();
      const value = context.value[key];

      const handleChange = useCallback(
        (patch: unknown) => {
          context.onChange({ [key]: patch });
        },
        [value]
      );

      return createElement(Component, { ...props, value, onChange: handleChange });
    };
  };
}
