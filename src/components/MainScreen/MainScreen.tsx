import { useEffect, useState } from 'react';

import carDark from '../../images/car-MainScreen.svg';
import carLight from '../../images/car-MainScreen_white_theme.png';
import { getThemeFromStorage } from '../../utils/utils';
import style from './MainScreen.module.css';

function MainScreen() {
  const [carSrc, setCarSrc] = useState('');

  const theme = getThemeFromStorage();

  useEffect(() => {
    console.log(`Theme in useEffect ${theme}`);

    if (theme === 'dark') {
      setCarSrc(carDark);
    } else {
      setCarSrc(carLight);
    }
  }, [theme]);

  return (
    <section className={style.section}>
      <div className={style.eclipse} />
      <div className={style.infowrapper}>
        <h1 className={style.title}>Быстрый поиск Автосервисов Москвы</h1>
        <p className={style.subtitle}>
          Подберем лучший сервис для ремонта автомобиля рядом с вами
        </p>
      </div>
      <img className={style.img} src={carSrc} alt="Изображение фар автомобиля BMW M3" />
    </section>
  );
}

export default MainScreen;
