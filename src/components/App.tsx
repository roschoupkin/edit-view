import React, { useState } from 'react';

import { createUseStyles } from 'react-jss';

import { Button, ButtonProps, Float, Integer, Select, String, StringMultiline } from '@ui/controls';

const BUTTON_MODES = ['contained', 'outlined', 'text'];
const BUTTON_COLORS = ['primary', 'secondary', 'error', 'warning'];

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
  const [area, setArea] = useState('');
  const [mode, setMode] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  return (
    <div className={classes.root}>
      <div>Inputs:</div>
      <String placeholder='Строка' />
      <Float placeholder='Дрбные числа' />
      <Integer placeholder='Целые числа' />
      <div>Select:</div>
      <Select options={BUTTON_MODES} placeholder='Вариант отображения кнопки' value={mode} onChange={setMode} />
      <Select placement='top' options={BUTTON_COLORS} placeholder='Цвет отображения кнопки' value={color} onChange={setColor} />
      <div>Buttons:</div>
      <div>
        <Button color={color as ButtonProps['color']} mode={mode as ButtonProps['mode']}>
          Button test
        </Button>
      </div>
      <div>String multiline:</div>
      <StringMultiline value={area} placeholder='Ввод длинного текста' onChange={setArea} />
    </div>
  );
};

export default App;
