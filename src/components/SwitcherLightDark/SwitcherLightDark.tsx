import useTheme from '../../hooks/useTheme';
import { Theme } from '../../utils/types';
import styles from './styles/styles.module.css';

function SwitchDarkLight() {
  const getThemeFromStorage = (): Theme => {
    const theme = localStorage.getItem('data-theme');
    return (theme as Theme) || 'dark';
  };

  const [theme, handleChange] = useTheme(getThemeFromStorage());

  return (
    <div className={styles.switch__container}>
      <label className={styles.switch__label} htmlFor="checkbox-dark-light">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={theme === 'light'}
          className={styles.switch__checkbox}
          id="checkbox-dark-light"
        />
        <span />
      </label>
    </div>
  );
}
export default SwitchDarkLight;
