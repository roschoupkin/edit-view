import { FloatProps, IntegerProps, Option, SelectProps, StringMultilineProps, StringProps } from '@controls';
import { Placement } from '@ui/Overlay';
import { ReactNode } from 'react';

export interface SchemaContextType<T = unknown> {
  value: T;
  onChange(patch: Partial<T>): void;
}

export type SchemaView = 'integer' | 'float' | 'string' | 'string:multiline' | 'select';

export interface SchemaProperty {
  view: SchemaView;
  required?: boolean;
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
  placement?: Placement;
  options?: Array<string | Option>;
  props?: SelectProps;
}

export type SchemaProps<T extends SchemaProperty, P = unknown> = {
  [K in keyof T]: T[K] | ((props: P) => T[K]);
};

export type Schemas = IntegerSchema | FloatSchema | StringSchema | StringMultilineSchema | SelectSchema;

export type Schema<P = unknown> = SchemaProps<Schemas, P>;

export type View<Keys extends string> = {
  [K in Keys]: () => ReactNode;
};
