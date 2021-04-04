import React, { useEffect, useState } from 'react';

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

interface Example {
  string: string;
  stringMultiline: string;
  integer: number;
  float: number;
  select: 'test' | 'select' | 'another';
  select2?: string;
}

const initial: Example = {
  string: 'string',
  stringMultiline: 'string:multiline',
  integer: 1,
  float: 1.1,
  select: 'select',
};

const useSchema = createUseSchema<Example>({
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
    options: ['test', 'select', 'another'],
    view: 'select',
  },
  select2: {
    placeholder: 'Test value',
    disabled: ({ select }) => select === 'another',
    options: ({ select }) => (select === 'test' ? ['one', 'two', 'three'] : ['test', 'select', 'another']),
    view: 'select',
  },
});

const App = () => {
  const classes = useStyles();

  const [value, setValue] = useState(initial);
  const view = useSchema(value);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className={classes.root}>
      <Schema value={value} onChange={setValue}>
        <div>Inputs:</div>
        {view.string()}
        {view.stringMultiline()}
        {view.integer()}
        {view.float()}
        <div>Select:</div>
        {view.select()}
        {view.select2()}
      </Schema>
    </div>
  );
};

export default App;
