import React, { ChangeEvent, FC, ReactText, TextareaHTMLAttributes } from 'react';

import cx from 'classnames';
import { createUseStyles } from 'react-jss';

import { Theme } from '@styles/types';

export type HtmlTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export interface StringMultilineProps extends HtmlTextAreaProps {
  value?: string;
  onChange?(value: string): void;
  width?: ReactText;
}

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    'display': 'block',
    'width': ({ width }: StringMultilineProps) => width ?? '100%',
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
    '&:disabled': {
      backgroundColor: theme.colorBgSecondary,
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

const StringMultiline: FC<StringMultilineProps> = (props) => {
  const { onChange, className, ...textAreaProps } = props;
  const classes = useStyles(props);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return <textarea {...textAreaProps} className={cx(classes.root, className)} onChange={handleChange} />;
};

export default StringMultiline;
