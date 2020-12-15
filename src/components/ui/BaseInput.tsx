import React, { useCallback, ChangeEvent, FC, InputHTMLAttributes } from 'react';

import cx from 'classnames';
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
    'backgroundColor': theme.colorBg,
    'borderRadius': theme.controls.borderRadius,
    'padding': theme.controls.padding,
    'border': `${theme.controls.borderWidth}px solid ${theme.colors.border.normal}`,
    'fontSize': theme.fonts.controls.normal.fontSize,
    'lineHeight': `${theme.fonts.controls.normal.lineHeight}px`,
    'transition': 'border-color 0.3s',
    '&::placeholder': {
      color: theme.colors.textSecondary.normal,
    },
    '&:disabled': {
      backgroundColor: theme.colorBgSecondary,
      borderColor: theme.colors.border.disabled,
      cursor: 'default',
    },
    '&:focus': {
      borderColor: theme.colors.border.focus,
    },
    '&:hover:not(:disabled)': {
      borderColor: theme.colors.border.hover,
    },
  },
}));

const BaseInput: FC<BaseInputProps> = (props) => {
  const { onChange, className, ...inputProps } = props;
  const classes = useStyles(props);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value), []);

  return <input {...inputProps} className={cx(classes.root, className)} onChange={handleChange} />;
};

export default BaseInput;
