import car from '../../images/car-AboutUs.svg';
import style from './AboutUs.module.css';

function AboutUs() {
  return (
    <section className={style.section}>
      <img className={style.img} src={car} alt="Черный автомобиль марки мерседес" />
      <div className={style.container}>
        <h2 className={style.title}>О нас</h2>
        <p className={style.subtitle}>
          Find Car Services - ваш надежный партнер в премиум-обслуживании дорогих
          автомобилей.
        </p>
        <p className={style.subtitle}>Мы предоставляем:</p>
        <ul className={style.table}>
          <li className={style.tableSell}>Быстрый поиск всех ближайших автосервисов </li>
          <li className={style.tableSell}>Надежные отзывы и рейтинги</li>
          <li className={style.tableSell}>Удобная запись на услуги онлайн</li>
          <li className={style.tableSell}>История обслуживания всегда под рукой</li>
        </ul>
        <p className={style.subtitle}>
          Ваш автомобиль в надежных руках вместе с нами. Используйте его уже сейчас!
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
