import { FloatSchema, IntegerSchema, SchemaProperty, SchemaProps, SelectSchema, StringMultilineSchema, StringSchema } from './types';

export const isInteger = (property: SchemaProps<SchemaProperty>): property is IntegerSchema => {
  return property.view === 'integer';
};

export const isFloat = (property: SchemaProps<SchemaProperty>): property is FloatSchema => {
  return property.view === 'float';
};

export const isString = (property: SchemaProps<SchemaProperty>): property is StringSchema => {
  return property.view === 'string';
};

export const isStringMultiline = (property: SchemaProps<SchemaProperty>): property is StringMultilineSchema => {
  return property.view === 'string:multiline';
};

export const isSelect = (property: SchemaProps<SchemaProperty>): property is SelectSchema => {
  return property.view === 'select';
};
