import { useEffect, useState } from 'react';

import { useAppDispatch } from '../store';
import { switchMode } from '../store/darkLightModeSlice';
import { Theme } from '../utils/types';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type TUseThemeReturn = [string, (e: ChangeEvent) => void];

const useTheme = (initialTheme: Theme): TUseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent) => setTheme(e.target.checked ? 'light' : 'dark');

  useEffect(() => {
    document.body.parentElement?.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
    dispatch(switchMode(theme));
  }, [theme, dispatch]);

  return [theme, handleChange];
};

export default useTheme;
