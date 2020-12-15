import React, { useCallback, useLayoutEffect, useRef, ChangeEvent, FC, ReactText, TextareaHTMLAttributes } from 'react';

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
    'border': `${theme.controls.borderWidth}px solid ${theme.colors.border.normal}`,
    'fontSize': theme.fonts.controls.normal.fontSize,
    'lineHeight': `${theme.fonts.controls.normal.lineHeight}px`,
    'transition': 'border-color 0.3s',
    'overflow': 'hidden',
    'resize': 'none',
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

const StringMultiline: FC<StringMultilineProps> = (props) => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const { onChange, className, value, ...textAreaProps } = props;
  const classes = useStyles(props);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  useLayoutEffect(() => {
    const area = areaRef.current;
    if (area) {
      area.style.cssText = 'height: auto';
      area.style.cssText = `height: ${Math.max(area.offsetHeight, area.scrollHeight)}px`;
      area.scrollTop = area.scrollHeight;
    }
  }, [value]);

  return <textarea {...textAreaProps} ref={areaRef} className={cx(classes.root, className)} value={value} onChange={handleChange} />;
};

export default StringMultiline;
