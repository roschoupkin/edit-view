import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '@styles/types';

export type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export interface BaseInputProps extends HtmlInputProps {
  value?: string;
  onChange?(value: string): void;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    'display': 'block',
    'width': ({ width }: BaseInputProps) => width ?? '100%',
    'height': theme.controls.height,
    'borderRadius': theme.controls.borderRadius,
    'padding': theme.controls.padding,
    'border': `${theme.controls.sizeBorderWidth}px solid ${theme.colors.border.normal}`,
    'transition': 'border-color 0.3s',
    '&:disabled': {
      borderColor: theme.colors.border.disabled,
    },
    '&:focus': {
      borderColor: theme.colors.border.focus,
    },
    '&:hover': {
      borderColor: theme.colors.border.hover,
    },
  },
}));

const BaseInput: FC<BaseInputProps> = (props) => {
  const { onChange, ...inputProps } = props;
  const classes = useStyles(props);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return <input {...inputProps} className={classes.root} onChange={handleChange} />;
};

export default BaseInput;
