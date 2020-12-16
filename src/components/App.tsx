import React from 'react';

import { createUseStyles } from 'react-jss';

import { createUseSchema, Editor } from './editor';

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
  const classes = useStyles();
  const view = useSchema();

  return (
    <div className={classes.root}>
      <Editor>
        <div>Inputs:</div>
        {view.string()}
        {view.stringMultiline()}
        {view.integer()}
        {view.float()}
        <div>Select:</div>
        {view.select()}
      </Editor>
    </div>
  );
};

export default App;
