import { Property } from 'csstype';

export interface ThemeControls {
  height: number;
  padding: number[];
  borderRadius: number;
  sizeBorderWidth: number;
}

export interface ThemeFont {
  fontSize: number;
  lineHeight?: Property.LineHeight;
  fontWeight?: Property.FontWeight;
  fontFamily?: Property.FontFamily;
  letterSpacing?: Property.LetterSpacing;
  textTransform?: Property.TextTransform;
  marginTop?: number;
  marginBottom?: number;
}

export interface ThemeFonts {
  controls: {
    normal: ThemeFont;
    primary: ThemeFont;
    secondary: ThemeFont;
  };
}

export interface ThemeColor {
  normal: string;
  hover?: string;
  focus?: string;
  active?: string;
  disabled?: string;
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

export interface Theme {
  colorBg: Property.Color;
  colorBgSecondary: Property.Color;
  controls: ThemeControls;
  fonts: ThemeFonts;
  colors: ThemeColors;
}
