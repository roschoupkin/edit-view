import React, { FC } from 'react';

import BaseInput, { HtmlInputProps } from '@ui/BaseInput';

export interface StringProps extends HtmlInputProps {
  type?: 'number' | 'text' | 'password' | 'email' | 'tel';
  value?: string;
  onChange?(value: string): void;
}

const String: FC<StringProps> = ({ type, onChange, ...props }) => <BaseInput {...props} type={type} onChange={onChange} />;

export default String;
