import React, { useMemo, useState } from 'react';

import { createUseStyles } from 'react-jss';

import { Button, ButtonProps, Float, Integer, Select, String, StringMultiline } from '@ui/controls';

const BUTTON_MODES: ButtonProps['mode'][] = ['contained', 'outlined', 'text'];
const BUTTON_COLORS: ButtonProps['color'][] = ['primary', 'secondary', 'error', 'warning'];

const useStyles = createUseStyles({
  root: {
    'padding': 20,
    '& > *': {
      marginBottom: 20,
    },
  },
  buttons: {
    'display': 'flex',
    'flexFlow': 'row wrap',
    'justifyContent': 'flex-start',
    'alignItems': 'center',
    '& > *': {
      width: 300,
      marginRight: 20,
      marginBottom: 20,
    },
  },
});

const App = () => {
  const classes = useStyles();
  const [area, setArea] = useState('');

  const buttons = useMemo(
    () =>
      BUTTON_MODES.map((mode) => {
        return BUTTON_COLORS.map((color) => (
          <Button key={`${mode} ${color}`} mode={mode} color={color}>
            {`${mode} ${color}`}
          </Button>
        ));
      }),
    []
  );

  return (
    <div className={classes.root}>
      <div>Inputs:</div>
      <String />
      <Float />
      <Integer />
      <div>Buttons:</div>
      <div className={classes.buttons}>{buttons}</div>
      <div>String multiline:</div>
      <StringMultiline value={area} onChange={setArea} />
      <div>Select:</div>
      <Select />
    </div>
  );
};

export default App;
