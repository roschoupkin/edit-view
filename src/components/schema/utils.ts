import { withSchema } from '@decorators/withSchema';
import { Float, Integer, Select, String, StringMultiline } from '@controls';
import { createElement, FunctionComponent } from 'react';

import { Schema, View } from './types';
import { isFloat, isInteger, isSelect, isString, isStringMultiline } from './checkTypes';

const createSchemaComponent = <P = unknown>(key: string, component: FunctionComponent<P>, props: P) => {
  return () => createElement(withSchema<P>(key)(component), props);
};

export const createUseSchema = <P = unknown, K extends string = string>(schema: Record<K, Schema>) => (props?: P) => {
  const createView = <Key extends K>(key: Key) => {
    const property = schema[key];
    if (isInteger(property)) {
      return createSchemaComponent(key, Integer, property);
    }
    if (isFloat(property)) {
      return createSchemaComponent(key, Float, property);
    }
    if (isString(property)) {
      return createSchemaComponent(key, String, property);
    }
    if (isStringMultiline(property)) {
      return createSchemaComponent(key, StringMultiline, property);
    }
    if (isSelect(property)) {
      return createSchemaComponent(key, Select, property);
    }
    return () => null;
  };

  return Object.keys(schema).reduce((view, key) => ({ ...view, [key]: createView(key) }), {} as View<K>);
};
