import { Float, Integer, Select, String, StringMultiline } from '@ui/controls';
import { createElement, useState } from 'react';

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
  const [value, setValue] = useState(Object.keys(schema).reduce((acc, key) => ({ [key]: undefined }), {}));

  const handleChange = (key: K) => <T = unknown>(patch: T) => {
    setValue({ ...value, [key]: patch });
  };

  const createView = <Key extends K>(key: Key) => {
    const property = schema[key];
    if (isInteger(property)) {
      return () => createElement(Integer, { ...property, onChange: handleChange(key) }, null);
    }
    if (isFloat(property)) {
      return () => createElement(Float, { ...property, onChange: handleChange(key) }, null);
    }
    if (isString(property)) {
      return () => createElement(String, { ...property, onChange: handleChange(key) }, null);
    }
    if (isStringMultiline(property)) {
      return () => createElement(StringMultiline, { ...property, onChange: handleChange(key) }, null);
    }
    if (isSelect(property)) {
      return () => createElement(Select, { ...property, onChange: handleChange(key) }, null);
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
