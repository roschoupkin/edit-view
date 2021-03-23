import { Float, Integer, Select, String, StringMultiline } from '@ui/controls';
import { createElement, FunctionComponent } from 'react';
import { useSchemaContext } from './Schema';

import { FloatSchema, IntegerSchema, Schema, SchemaProperty, SelectSchema, StringMultilineSchema, StringSchema, View } from './types';

const isInteger = (property: SchemaProperty): property is IntegerSchema => {
  return property.view === 'integer';
};

const isFloat = (property: SchemaProperty): property is FloatSchema => {
  return property.view === 'float';
};

const isString = (property: SchemaProperty): property is StringSchema => {
  return property.view === 'string';
};

const isStringMultiline = (property: SchemaProperty): property is StringMultilineSchema => {
  return property.view === 'string:multiline';
};

const isSelect = (property: SchemaProperty): property is SelectSchema => {
  return property.view === 'select';
};

export const createUseSchema = <P = unknown, K extends string = string>(schema: Record<K, Schema>) => (props?: P) => {
  const createComponent = <P extends {}>(key: K, component: FunctionComponent<P>, props?: P) => () => {
    const handleChange = (key: K) => <T = unknown>(patch: T) => {
      const { onChange } = useSchemaContext();
      onChange({ [key]: patch });
    };
    return createElement(component, { ...props, onChange: handleChange(key) } as any, null); // TODO: Fix types
  };

  const createView = <Key extends K>(key: Key) => {
    const property = schema[key];
    if (isInteger(property)) {
      return createComponent(key, Integer, property);
    }
    if (isFloat(property)) {
      return createComponent(key, Float, property);
    }
    if (isString(property)) {
      return createComponent(key, String, property);
    }
    if (isStringMultiline(property)) {
      return createComponent(key, StringMultiline, property);
    }
    if (isSelect(property)) {
      return createComponent(key, Select, property);
    }
    return () => null;
  };

  const view: Array<[K, View]> = [];
  for (const key of Object.keys(schema)) {
    view.push([key, createView(key)]);
  }
  return view.reduce(
    (acc, [key, component]) => ({
      ...acc,
      [key]: component,
    }),
    {} as Record<K, View>
  );
};
