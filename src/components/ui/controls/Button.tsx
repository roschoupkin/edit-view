import React, { ButtonHTMLAttributes, FC, ReactText } from 'react';

import cx from 'classnames';
import { createUseStyles } from 'react-jss';

import { Theme, ThemeColor } from '@styles/types';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonColors = 'primary' | 'secondary' | 'error' | 'warning';

export interface ButtonProps extends BaseButtonProps {
  color?: ButtonColors;
  mode?: 'contained' | 'outlined' | 'text';
  width?: ReactText;
}

const useStyles = createUseStyles((theme: Theme) => {
  const getContainedTextColor = (state: keyof ThemeColor) => ({ color = 'primary' }: ButtonProps) =>
    theme.colors[color === 'secondary' ? 'text' : 'textContrast'][state];
  const getColor = (state: keyof ThemeColor) => ({ color = 'primary' }: ButtonProps) => theme.colors[color][state];

  return {
    root: {
      display: 'block',
      width: ({ width }: ButtonProps) => width ?? '100%',
      height: theme.controls.height,
      borderRadius: theme.controls.borderRadius,
      fontSize: theme.fonts.controls.normal.fontSize,
      lineHeight: `${theme.fonts.controls.normal.lineHeight}px`,
    },
    contained: {
      'color': getContainedTextColor('normal'),
      'backgroundColor': getColor('normal'),
      '&:disabled': {
        color: getContainedTextColor('disabled'),
        backgroundColor: getColor('disabled'),
      },
      '&:focus': {
        color: getContainedTextColor('focus'),
        backgroundColor: getColor('focus'),
      },
      '&:hover': {
        color: getContainedTextColor('hover'),
        backgroundColor: getColor('hover'),
      },
    },
    outlined: {
      'color': getColor('normal'),
      'borderColor': getColor('normal'),
      'borderWidth': theme.controls.sizeBorderWidth,
      'borderStyle': 'solid',
      '&:disabled': {
        color: getColor('disabled'),
        borderColor: getColor('disabled'),
      },
      '&:focus': {
        color: getColor('focus'),
        borderColor: getColor('focus'),
      },
      '&:hover': {
        color: getColor('hover'),
        borderColor: getColor('hover'),
      },
    },
    text: {
      'color': getColor('normal'),
      '&:disabled': {
        color: getColor('disabled'),
      },
      '&:focus': {
        color: getColor('focus'),
      },
      '&:hover': {
        color: getColor('hover'),
      },
    },
  };
});

const Button: FC<ButtonProps> = (props) => {
  const { children, className, mode = 'contained', ...buttonProps } = props;
  const classes = useStyles(props);

  return (
    <button {...buttonProps} className={cx(classes.root, classes[mode], className)}>
      {children}
    </button>
  );
};

export default Button;
