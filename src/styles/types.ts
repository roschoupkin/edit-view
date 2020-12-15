import { Property } from 'csstype';

export interface ThemeControls {
  height: Property.Height<number>;
  padding: number[];
  borderRadius: Property.BorderRadius<number>;
  borderWidth: Property.BorderWidth<number>;
}

export interface ThemeFont {
  fontSize: number;
  lineHeight: Property.LineHeight;
  fontWeight?: Property.FontWeight;
  fontFamily?: Property.FontFamily;
  letterSpacing?: Property.LetterSpacing;
  textTransform?: Property.TextTransform;
  marginTop?: Property.MarginTop;
  marginBottom?: Property.MarginBottom;
}

export interface ThemeFonts {
  controls: {
    normal: ThemeFont;
    primary: ThemeFont;
    secondary: ThemeFont;
  };
}

export interface ThemeColor {
  normal: Property.Color;
  hover: Property.Color;
  focus: Property.Color;
  active: Property.Color;
  disabled: Property.Color;
}

export interface ThemeColors {
  primary: ThemeColor;
  secondary: ThemeColor;
  warning: ThemeColor;
  error: ThemeColor;
  success: ThemeColor;
  border: Required<ThemeColor>;
  text: ThemeColor;
  textSecondary: ThemeColor;
  textContrast: ThemeColor;
}

export interface ThemeBoxShadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: Property.Color;
}

export interface ThemeBoxShadows {
  normal: ThemeBoxShadow;
  active: ThemeBoxShadow;
}

export interface Theme {
  colorBg: Property.Color;
  colorBgPopup: Property.Color;
  colorBgSecondary: Property.Color;
  controls: ThemeControls;
  fonts: ThemeFonts;
  colors: ThemeColors;
  boxShadows: ThemeBoxShadows;
  transitionDuration: Property.TransitionDuration;
  borderRadius: Property.BorderRadius<number>;
  offset: number;
}
