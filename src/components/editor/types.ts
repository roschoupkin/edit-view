import { FloatProps, IntegerProps, Option, SelectProps, StringMultilineProps, StringProps } from '@ui/controls';

export type SchemaView = 'integer' | 'float' | 'string' | 'string:multiline' | 'select';

export interface SchemaProperty {
  view: SchemaView;
  placeholder?: string;
  disabled?: boolean;
  props?: unknown;
}

export interface IntegerSchema extends SchemaProperty {
  view: 'integer';
  props?: IntegerProps;
}

export interface FloatSchema extends SchemaProperty {
  view: 'float';
  props?: FloatProps;
}

export interface StringSchema extends SchemaProperty {
  view: 'string';
  props?: StringProps;
}

export interface StringMultilineSchema extends SchemaProperty {
  view: 'string:multiline';
  props?: StringMultilineProps;
}

export interface SelectSchema extends SchemaProperty {
  view: 'select';
  options?: string | Option[];
  props?: SelectProps;
}

export type Schema<Name extends string = string> = Record<
  Name,
  IntegerSchema | FloatSchema | StringSchema | StringMultilineSchema | SelectSchema
>;
