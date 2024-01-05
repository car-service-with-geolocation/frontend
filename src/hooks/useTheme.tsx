import { useEffect, useState } from 'react';

import { Theme } from '../utils/types';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type TUseThemeReturn = [string, (e: ChangeEvent) => void];

const useTheme = (initialTheme: Theme): TUseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleChange = (e: ChangeEvent) => setTheme(e.target.checked ? 'light' : 'dark');

  useEffect(() => {
    document.body.parentElement?.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
  }, [theme]);

  return [theme, handleChange];
};

export default useTheme;
