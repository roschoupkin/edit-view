import { ReactText } from 'react';

export interface ControlProps<V = ReactText> {
  width?: ReactText;
  disabled?: boolean;
  focused?: boolean;
  value?: V;
  onChange?(value: V): void;
}
