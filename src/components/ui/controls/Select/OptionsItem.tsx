import React, { useCallback, FC, ReactNode } from 'react';

import cx from 'classnames';
import { createUseStyles } from 'react-jss';

import { tonerDisabled } from '@styles/theme';
import { Theme } from '@styles/types';

export interface Option {
  label: ReactNode;
  value: string;
}

export interface OptionsItemProps extends Option {
  selected?: string;
  onClick?(value: string): void;
}

const useStyles = createUseStyles((theme: Theme) => {
  const { fontSize, lineHeight } = theme.fonts.controls.normal;
  return {
    root: {
      'display': 'block',
      'width': '100%',
      'fontSize': fontSize,
      'padding': [fontSize / 2, fontSize],
      'lineHeight': `${lineHeight}px`,
      'textAlign': 'left',
      '&:hover, &$selected': {
        backgroundColor: tonerDisabled(theme.colors.secondary.normal),
      },
    },
    selected: {},
  };
});

const OptionsItem: FC<OptionsItemProps> = ({ value, label, selected, onClick }) => {
  const classes = useStyles();
  const handleClick = useCallback(() => onClick?.(value), [value, onClick]);

  return (
    <button type='button' className={cx(classes.root, value === selected && classes.selected)} onClick={handleClick}>
      {label}
    </button>
  );
};

export default OptionsItem;
