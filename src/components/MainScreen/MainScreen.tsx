import car from '../../images/car-MainScreen.svg';
import style from './MainScreen.module.css';

function MainScreen() {
  return (
    <section className={style.section}>
      <div className={style.eclipse} />
      <div className={style.infowrapper}>
        <h1 className={style.title}>Быстрый поиск Автосервисов Москвы</h1>
        <p className={style.subtitle}>
          Подберем лучший сервис для ремонта автомобиля рядом с вами
        </p>
      </div>
      <img className={style.img} src={car} alt="Изображение фар автомобиля BMW M3" />
    </section>
  );
}

export default MainScreen;
