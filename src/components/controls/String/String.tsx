import React, { FC } from 'react';

import BaseInput, { BaseInputProps } from '../../ui/BaseInput';

export interface StringProps extends BaseInputProps<string> {
  type?: 'number' | 'text' | 'password' | 'email' | 'tel';
}

const String: FC<StringProps> = ({ type, onChange, ...props }) => <BaseInput {...props} type={type} onChange={onChange} />;

export default String;
