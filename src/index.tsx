import React, { FC } from 'react';

import { ThemeProvider } from 'react-jss';

import { baseTheme } from '@styles/theme';

import App from './components/App';
import './styles/global.css';

const Root: FC = () => (
  <ThemeProvider theme={baseTheme}>
    <App />
  </ThemeProvider>
);

export default Root;
