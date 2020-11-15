import * as color from 'color';
import { Property } from 'csstype';

import { Theme } from './types';

export function important(value: string | number) {
  const postfix = typeof value === 'number' ? 'px' : '';
  return `${value}${postfix} !important`;
}

export const mixColor = (colorBase: Property.Color, colorState: Property.Color, opacity: number) =>
  color(colorBase).mix(color(colorState), opacity).hex();

export const tonerHover = (colorBase: Property.Color) => mixColor(colorBase, '#000000', 0.04);
export const tonerDisabled = (colorBase: Property.Color) => mixColor(colorBase, '#FFFFFF', 0.04);
export const tonerFocus = (colorBase: Property.Color) => mixColor(colorBase, '#000000', 0.08);

export const baseTheme: Theme = {
  colorBg: '#FFFFFF',
  colorBgSecondary: '#F0F0F0',
  controls: {
    height: 40,
    padding: [10, 12],
    borderRadius: 4,
    sizeBorderWidth: 1,
  },
  fonts: {
    controls: {
      normal: {
        fontSize: 15,
        lineHeight: 20,
      },
      primary: {
        fontSize: 15,
        lineHeight: 20,
        textTransform: 'uppercase',
      },
      secondary: {
        fontSize: 15,
        lineHeight: 20,
        textTransform: 'lowercase',
      },
    },
  },
  colors: {
    primary: {
      normal: '#005BD1',
      hover: tonerHover('#005BD1'),
      focus: tonerFocus('#005BD1'),
      disabled: tonerDisabled('#005BD1'),
    },
    secondary: {
      normal: '#FF9E00',
      hover: tonerHover('#FF9E00'),
      focus: tonerFocus('#FF9E00'),
      disabled: tonerDisabled('#FF9E00'),
    },
    text: {
      normal: '#333333',
      hover: tonerHover('#333333'),
      focus: tonerFocus('#333333'),
      disabled: tonerDisabled('#333333'),
    },
    textContrast: {
      normal: '#FFFFFF',
      hover: '#FFFFFF',
      focus: '#FFFFFF',
      disabled: '#FFFFFF',
    },
    textSecondary: {
      normal: '#999999',
      hover: tonerHover('#999999'),
      focus: tonerFocus('#999999'),
      disabled: tonerDisabled('#999999'),
    },
    warning: {
      normal: '#FF9E00',
      hover: tonerHover('#FF9E00'),
      focus: tonerFocus('#FF9E00'),
      disabled: tonerDisabled('#FF9E00'),
    },
    error: {
      normal: '#ED0A34',
      hover: tonerHover('#ED0A34'),
      focus: tonerFocus('#ED0A34'),
      disabled: tonerDisabled('#ED0A34'),
    },
    success: {
      normal: '#0DC268',
      hover: tonerHover('#0DC268'),
      focus: tonerFocus('#0DC268'),
      disabled: tonerDisabled('#0DC268'),
    },
    border: {
      normal: mixColor('#FFFFFF', '#000000', 0.12),
      hover: mixColor('#FFFFFF', '#000000', 0.24),
      active: mixColor('#FFFFFF', '#000000', 0.48),
      focus: mixColor('#FFFFFF', '#000000', 0.24),
      disabled: mixColor('#FFFFFF', '#000000', 0.12),
    },
  },
};
