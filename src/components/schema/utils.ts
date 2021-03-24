import { withSchema } from '@decorators/withSchema';
import { Float, Integer, Select, String, StringMultiline } from '@controls';
import { createElement, FunctionComponent } from 'react';

import {
  FloatSchema,
  IntegerSchema,
  Schema,
  SchemaProperty,
  SchemaProps,
  SelectSchema,
  StringMultilineSchema,
  StringSchema,
  View,
} from './types';

const isInteger = (property: SchemaProps<SchemaProperty>): property is IntegerSchema => {
  return property.view === 'integer';
};

const isFloat = (property: SchemaProps<SchemaProperty>): property is FloatSchema => {
  return property.view === 'float';
};

const isString = (property: SchemaProps<SchemaProperty>): property is StringSchema => {
  return property.view === 'string';
};

const isStringMultiline = (property: SchemaProps<SchemaProperty>): property is StringMultilineSchema => {
  return property.view === 'string:multiline';
};

const isSelect = (property: SchemaProps<SchemaProperty>): property is SelectSchema => {
  return property.view === 'select';
};

export const createUseSchema = <P = unknown, K extends string = string>(schema: Record<K, Schema>) => (props?: P) => {
  const createComponent = <FP = unknown>(key: string, component: FunctionComponent<FP>, property: FP) => {
    return () => createElement(withSchema<FP>(key)(component), property);
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

  const view = {} as View<K>;
  for (const key of Object.keys(schema)) {
    view[key] = createView(key);
  }
  return view;
};
