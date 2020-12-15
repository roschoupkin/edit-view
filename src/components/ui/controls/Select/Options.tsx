import React, { FC } from 'react';

import Paper from '@ui/Paper';

export interface Option {
  label: string;
  value: string;
}

export interface OptionsProps {
  width?: number;
  options?: Option[];
}

const Options: FC<OptionsProps> = () => <Paper />;

export default Options;
