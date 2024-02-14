import useTheme from '../../hooks/useTheme';
import { getThemeFromStorage } from '../../utils/utils';
import styles from './styles/styles.module.css';

function SwitchDarkLight() {
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
