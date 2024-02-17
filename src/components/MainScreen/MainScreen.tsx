import { useEffect, useState } from 'react';

import carDark from '../../images/car-MainScreen.svg';
import carLight from '../../images/car-MainScreen_white_theme.png';
import { useAppSelector } from '../../store';
import { Theme } from '../../utils/types';
import style from './MainScreen.module.css';

function MainScreen() {
  const [carSrc, setCarSrc] = useState('');

  const theme: Theme = useAppSelector((state) => state.darkLightMode.mode);

  useEffect(() => {
    if (theme === 'dark') {
      setCarSrc(carDark);
    } else {
      setCarSrc(carLight);
    }
  }, [theme]);

  return (
    <section className={style.section}>
      {theme === 'dark' && <div className={style.eclipse} />}
      <div className={style.infowrapper}>
        <h1 className={style.title}>Быстрый поиск Автосервисов Москвы</h1>
        <p className={style.subtitle}>
          Подберем лучший сервис для ремонта автомобиля рядом с вами
        </p>
      </div>
      <img
        className={`${style.img} ${theme === 'dark' && style.img_blendMode}`}
        src={carSrc}
        alt="Изображение фар автомобиля BMW M3"
      />
    </section>
  );
}

export default MainScreen;
