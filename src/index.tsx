import React, { FC } from 'react';

import { baseTheme } from '@styles/theme';
import { ThemeProvider } from 'react-jss';

import './styles/global.css';

const Root: FC = () => (
  <ThemeProvider theme={baseTheme}>
    <div>Hello world!</div>
  </ThemeProvider>
);

export default Root;
