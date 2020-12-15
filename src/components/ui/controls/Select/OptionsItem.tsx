import React, { useCallback, FC } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '@styles/types';

export type OptionValue = string | number | boolean;

export interface Option {
  label: string;
  value: OptionValue;
}

export interface OptionsItemProps extends Option {
  onClick?(value: OptionValue): void;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: 'block',
    width: '100%',
    height: theme.controls.height / 2,
    borderRadius: theme.controls.borderRadius,
    fontSize: theme.fonts.controls.normal.fontSize,
    lineHeight: `${theme.fonts.controls.normal.lineHeight}px`,
  },
}));

const OptionsItem: FC<OptionsItemProps> = ({ value, label, onClick }) => {
  const classes = useStyles();
  const handleClick = useCallback(() => onClick?.(value), [value, onClick]);

  return (
    <button type='button' className={classes.root} onClick={handleClick}>
      {label}
    </button>
  );
};

export default OptionsItem;
