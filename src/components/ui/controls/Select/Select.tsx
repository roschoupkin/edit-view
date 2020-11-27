import React, { FC } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '@styles/types';
import Dropdown from '@ui/Dropdown';

import { ControlProps } from '../types';

interface SelectProps extends ControlProps {
  placeholder?: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    'display': 'block',
    'width': ({ width }: SelectProps) => width ?? '100%',
    'height': theme.controls.height,
    'backgroundColor': theme.colorBg,
    'borderRadius': theme.controls.borderRadius,
    'padding': theme.controls.padding,
    'border': `${theme.controls.sizeBorderWidth}px solid ${theme.colors.border.normal}`,
    'fontSize': theme.fonts.controls.normal.fontSize,
    'lineHeight': `${theme.fonts.controls.normal.lineHeight}px`,
    'transition': 'border-color 0.3s',
    '&::placeholder': {
      color: theme.colors.textSecondary.normal,
    },
    '&:hover:not($disabled)': {
      borderColor: theme.colors.border.hover,
    },
  },
  disabled: {
    backgroundColor: theme.colorBgSecondary,
    borderColor: theme.colors.border.disabled,
    cursor: 'default',
  },
  focused: {
    borderColor: theme.colors.border.focus,
  },
}));

const Select: FC<SelectProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Dropdown overlay={<div />}>
      <div className={classes.root} />
    </Dropdown>
  );
};

export default Select;
