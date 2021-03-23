import { Float, Integer, Select, String, StringMultiline } from '@ui/controls';

import { SchemaView } from './types';

export const getEditor = (view: SchemaView) =>
  ({
    'integer': Integer,
    'float': Float,
    'string': String,
    'string:multiline': StringMultiline,
    'select': Select,
  }[view]);
