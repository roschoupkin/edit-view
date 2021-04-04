import { ReactText } from 'react';
import { SchemaProperty, SchemaView } from '../schema/types';

export interface ControlProps<V = ReactText> extends SchemaProperty {
  view: SchemaView;
  width?: ReactText;
  disabled?: boolean;
  focused?: boolean;
  value?: V;
  onChange?(value: V): void;
}
