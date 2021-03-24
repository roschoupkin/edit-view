import { FloatProps, IntegerProps, Option, SelectProps, StringMultilineProps, StringProps } from '@ui/../controls';
import { ReactNode } from 'react';

export interface SchemaContextType<T = Record<string, unknown>> {
  value: T;
  onChange(patch: Partial<T>): void;
}

export type View = () => ReactNode;

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
  options?: Array<string | Option>;
  props?: SelectProps;
}

export type Schema = IntegerSchema | FloatSchema | StringSchema | StringMultilineSchema | SelectSchema;
