import { Float, Integer, Select, String, StringMultiline } from '@ui/controls';

import { FloatSchema, IntegerSchema, SchemaProperty, SelectSchema, StringMultilineSchema, StringSchema } from './types';

export function isInteger(property: SchemaProperty): property is IntegerSchema {
  return property.view === 'integer';
}

export function isFloat(property: SchemaProperty): property is FloatSchema {
  return property.view === 'float';
}

export function isString(property: SchemaProperty): property is StringSchema {
  return property.view === 'string';
}

export function isStringMultiline(property: SchemaProperty): property is StringMultilineSchema {
  return property.view === 'string:multiline';
}

export function isSelect(property: SchemaProperty): property is SelectSchema {
  return property.view === 'select';
}

export const getEditor = (property: SchemaProperty) =>
  ({
    'integer': Integer,
    'float': Float,
    'string': String,
    'string:multiline': StringMultiline,
    'select': Select,
  }[property.view]);
