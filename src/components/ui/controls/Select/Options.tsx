import React, { useMemo, FC } from 'react';

import { Option, OptionsItem, OptionsItemProps, OptionValue } from '@ui/controls';
import Paper from '@ui/Paper';

export interface OptionsProps extends Omit<OptionsItemProps, 'value' | 'label'> {
  width?: number;
  options?: (OptionValue | Option)[];
}

const prepareOptions = (option: OptionValue | Option) =>
  typeof option === 'object' ? option : { value: option, label: option.toString() };

const Options: FC<OptionsProps> = ({ options, width, ...optionItemProps }) => {
  const items = useMemo(() => (options ?? []).map(prepareOptions), [options]);

  return (
    <Paper width={width}>
      {items.map((option, idx) => (
        <OptionsItem key={idx} {...option} {...optionItemProps} />
      ))}
    </Paper>
  );
};

export default Options;
