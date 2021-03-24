import { withSchema } from '@decorators/withSchema';
import {
  Float,
  FloatProps,
  Integer,
  IntegerProps,
  Select,
  SelectProps,
  String,
  StringMultiline,
  StringMultilineProps,
  StringProps,
} from '@ui/../controls';
import { createElement } from 'react';

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
  const createView = <Key extends K>(key: Key) => {
    const property = schema[key];
    if (isInteger(property)) {
      return () => createElement(withSchema<IntegerProps>(key)(Integer), property);
    }
    if (isFloat(property)) {
      return () => createElement(withSchema<FloatProps>(key)(Float), property);
    }
    if (isString(property)) {
      return () => createElement(withSchema<StringProps>(key)(String), property);
    }
    if (isStringMultiline(property)) {
      return () => createElement(withSchema<StringMultilineProps>(key)(StringMultiline), property);
    }
    if (isSelect(property)) {
      return () => createElement(withSchema<SelectProps>(key)(Select), property);
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
