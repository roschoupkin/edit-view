export interface ITheme {
  colorBg: string;
}

export const baseTheme: ITheme = {
  colorBg: '#FFFFFF',
};

export function important(value: string | number) {
  const postfix = typeof value === 'number' ? 'px' : '';
  return `${value}${postfix} !important`;
}
