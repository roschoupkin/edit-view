import React, { useCallback, useMemo, useState, FC, useEffect } from 'react';

import { createUseStyles, useTheme } from 'react-jss';

import { Theme } from '@styles/types';
import { Options, OptionsProps, String } from '../index';
import { prepareOptionSet } from './utils';
import Dropdown from '@ui/Dropdown';
import { Placement } from '@ui/Overlay';

import { ControlProps } from '../types';

export interface SelectProps extends ControlProps<string>, OptionsProps {
  placement?: Placement;
  placeholder?: string;
}

const useStyles = createUseStyles({
  root: {
    cursor: 'pointer',
  },
});

const Select: FC<SelectProps> = ({ value: valueProp, width, options, placement, onChange, ...props }) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSelect = useCallback(
    (selected: string) => {
      onChange?.(selected);
      handleClose();
    },
    [onChange]
  );

  const optionsSet = useMemo(() => (options ?? []).reduce(prepareOptionSet, new Set()), [options]);
  const value = useMemo(() => (valueProp && optionsSet.has(valueProp) ? valueProp : ''), [valueProp, optionsSet]);

  useEffect(() => {
    if (valueProp != null && valueProp !== '') {
      if (!optionsSet.has(valueProp)) {
        onChange?.('');
      }
    }
  }, [optionsSet, valueProp, onChange]);

  return (
    <Dropdown
      open={open}
      offset={theme.offset}
      placement={placement}
      onClickOutside={handleClose}
      overlay={<Options width={width} options={options} selected={value} onClick={handleSelect} />}
    >
      <String {...props} width={width} className={classes.root} readOnly value={value} onClick={handleOpen} />
    </Dropdown>
  );
};

export default Select;
