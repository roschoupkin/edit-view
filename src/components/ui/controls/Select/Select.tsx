import React, { useCallback, useState, FC } from 'react';

import { createUseStyles } from 'react-jss';

import { Options, OptionsProps, OptionValue, String } from '@ui/controls';
import Dropdown from '@ui/Dropdown';
import { Placement } from '@ui/Overlay';

import { ControlProps } from '../types';

export interface SelectProps extends ControlProps, OptionsProps {
  placement?: Placement;
  placeholder?: string;
  onChange?(value: OptionValue): void;
}

const useStyles = createUseStyles({
  root: {
    cursor: 'pointer',
  },
});

const Select: FC<SelectProps> = ({ width, options, placement, onChange, ...props }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSelect = useCallback(
    (value) => {
      onChange?.(value);
      handleClose();
    },
    [onChange]
  );

  return (
    <Dropdown
      open={open}
      placement={placement}
      onClickOutside={handleClose}
      overlay={<Options width={width} options={options} onClick={handleSelect} />}
    >
      <String {...props} width={width} className={classes.root} readOnly onClick={handleOpen} />
    </Dropdown>
  );
};

export default Select;
