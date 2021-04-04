import { withSchema } from '@decorators/withSchema';
import { Float, Integer, Select, String, StringMultiline } from '@controls';
import { createElement, FunctionComponent } from 'react';

import { Schema, View } from './types';
import { isFloat, isInteger, isSelect, isString, isStringMultiline } from './checkTypes';

const createSchemaComponent = <P = unknown>(key: string, component: FunctionComponent<P>, props: P) => {
  return (majorProps?: P) => createElement(withSchema<P>(key)(component), { ...props, ...majorProps });
};

const applyProps = <P, T extends Schema<P>>(properties: T, props: P): T => {
  return Object.keys(properties).reduce((applied, key) => {
    const property = properties[key];
    if (typeof property === 'function') {
      return { ...applied, [key]: property(props) };
    }
    return applied;
  }, properties);
};

export const createUseSchema = <P = unknown, K extends string = string>(schema: Record<K, Schema<P>>) => (props?: P) => {
  const createView = <Key extends K>(key: Key) => {
    const properties = schema[key];
    if (isInteger<P>(properties)) {
      return createSchemaComponent(key, Integer, applyProps(properties, props));
    }
    if (isFloat<P>(properties)) {
      return createSchemaComponent(key, Float, applyProps(properties, props));
    }
    if (isString<P>(properties)) {
      return createSchemaComponent(key, String, applyProps(properties, props));
    }
    if (isStringMultiline<P>(properties)) {
      return createSchemaComponent(key, StringMultiline, applyProps(properties, props));
    }
    if (isSelect<P>(properties)) {
      return createSchemaComponent(key, Select, applyProps(properties, props));
    }
    return () => null;
  };

  return Object.keys(schema).reduce((view, key) => ({ ...view, [key]: createView(key) }), {} as View<K>);
};
