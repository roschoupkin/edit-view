import React, { FC } from 'react';

import { baseTheme } from '@styles/theme';
import { ThemeProvider } from 'react-jss';

import App from './components/App';
import './styles/global.css';

const Root: FC = () => (
  <ThemeProvider theme={baseTheme}>
    <div>Hello world!</div>
    <App />
  </ThemeProvider>
);

export default Root;
