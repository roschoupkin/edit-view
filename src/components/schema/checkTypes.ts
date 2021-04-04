import { FloatSchema, IntegerSchema, SchemaProperty, SchemaProps, SelectSchema, StringMultilineSchema, StringSchema } from './types';

export const isInteger = <P = unknown>(properties: SchemaProps<SchemaProperty, P>): properties is IntegerSchema => {
  return properties.view === 'integer';
};

export const isFloat = <P = unknown>(properties: SchemaProps<SchemaProperty, P>): properties is FloatSchema => {
  return properties.view === 'float';
};

export const isString = <P = unknown>(properties: SchemaProps<SchemaProperty, P>): properties is StringSchema => {
  return properties.view === 'string';
};

export const isStringMultiline = <P = unknown>(properties: SchemaProps<SchemaProperty, P>): properties is StringMultilineSchema => {
  return properties.view === 'string:multiline';
};

export const isSelect = <P = unknown>(properties: SchemaProps<SchemaProperty, P>): properties is SelectSchema => {
  return properties.view === 'select';
};
