import React, { FC } from 'react';

export interface Option {
  label: string;
  value: string;
}

export interface OptionsProps {
  options?: Option[];
}

const Options: FC<OptionsProps> = () => <div />;

export default Options;
