import React from 'react';

import { createUseStyles } from 'react-jss';

import Button from '@ui/controls/Button';
import Float from '@ui/controls/Float';
import Integer from '@ui/controls/Integer';
import String from '@ui/controls/String';

const useStyles = createUseStyles({
  root: {
    'padding': 20,
    '& > *': {
      marginBottom: 20,
    },
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>Hello world!</div>
      <String />
      <Float />
      <Button />
      <Integer />
    </div>
  );
};

export default App;
