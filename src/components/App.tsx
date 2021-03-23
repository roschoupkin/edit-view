import React from 'react';

import { createUseStyles } from 'react-jss';

import Schema, { createUseSchema } from './schema';

const useStyles = createUseStyles({
  root: {
    'padding': 20,
    '& > *': {
      marginBottom: 20,
    },
  },
});

const useSchema = createUseSchema({
  string: {
    view: 'string',
  },
  stringMultiline: {
    view: 'string:multiline',
  },
  integer: {
    view: 'integer',
  },
  float: {
    view: 'float',
  },
  select: {
    view: 'select',
  },
});

const App = () => {
  const view = useSchema();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Schema>
        <div>Inputs:</div>
        {view.string()}
        {view.stringMultiline()}
        {view.integer()}
        {view.float()}
        <div>Select:</div>
        {view.select()}
      </Schema>
    </div>
  );
};

export default App;
