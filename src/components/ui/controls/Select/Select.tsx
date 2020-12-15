import React, { useCallback, useState, FC } from 'react';

import { createUseStyles } from 'react-jss';

import { Options, OptionsProps, String } from '@ui/controls';
import Dropdown from '@ui/Dropdown';
import { Placement } from '@ui/Overlay';

import { ControlProps } from '../types';

export interface SelectProps extends ControlProps, OptionsProps {
  placement?: Placement;
  placeholder?: string;
}

const useStyles = createUseStyles({
  root: {
    cursor: 'pointer',
  },
});

const Select: FC<SelectProps> = ({ options, placement, ...props }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Dropdown open={open} placement={placement} onClickOutside={handleClose} overlay={<Options options={options} />}>
      <String {...props} className={classes.root} readOnly onClick={handleOpen} />
    </Dropdown>
  );
};

export default Select;
