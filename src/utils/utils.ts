/* eslint-disable import/prefer-default-export */
import { Theme } from './types';

export const getThemeFromStorage = (): Theme => {
  const theme = localStorage.getItem('data-theme');
  return (theme as Theme) || 'dark';
};
