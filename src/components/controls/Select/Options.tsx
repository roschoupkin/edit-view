import React, { useMemo, FC } from 'react';

import { Option, OptionsItem, OptionsItemProps } from '../index';
import Paper from '../../ui/Paper';

import { prepareOption } from './utils';

export interface OptionsProps extends Omit<OptionsItemProps, 'value' | 'label'> {
  width?: number;
  options?: Array<string | Option>;
}

const Options: FC<OptionsProps> = ({ options, width, ...optionItemProps }) => {
  const items = useMemo(() => (options ?? []).map(prepareOption), [options]);

  return (
    <Paper width={width}>
      {items.map((option, idx) => (
        <OptionsItem key={idx} {...option} {...optionItemProps} />
      ))}
    </Paper>
  );
};

export default Options;
