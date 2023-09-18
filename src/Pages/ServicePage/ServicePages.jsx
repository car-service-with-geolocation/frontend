import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import servicePhoto from '../../images/bestService-card1.png';
import star from '../../images/bestService-Star.svg';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import styles from './styles/styles.module.css';

function ServicePage({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAutoServiceId(id));
  }, [dispatch, id]);
  return (
    <section className={styles.wrapper}>
      <p className={styles.way}>Главная / Поиск автосервисов / LR Premium</p>
      <div className={styles.serviceWrapper}>
        <div className={styles.service}>
          <h2 className={styles.serviceName}>LR Premium</h2>
          <div className={styles.raitingWrappper}>
            <img className={styles.starImg} src={star} alt="star" />
            <p className={styles.rating}>5.0 (156)</p>
          </div>
          <h3 className={styles.aboutHeader}>Об автосервисе</h3>
          {/* Посмотрим как тут будут бэки отдавать. Может сделаем через map */}
          <div className={styles.serviceInfo}>
            <ul className={styles.workInfo}>
              <li>Открыто с 9 до 00</li>
              <li>Суббота 9:00 - 15:00</li>
              <li>Воскресенье: Закрыто</li>
            </ul>
            <ul className={styles.workInfo}>
              <li>+7 900-200-20-20</li>
              <li>p.c.ser@gmail.com</li>
            </ul>
          </div>
          <div className={styles.buttonsWrapper}>
            <button className={styles.application}>Оставить заявку</button>
            <button className={styles.address}>Сайт</button>
          </div>
        </div>
        <img className={styles.servicePhoto} src={servicePhoto} alt="autoservice" />
      </div>
      <article className={styles.serviceJobWrapper}>
        <div className={styles.serviceWorksWrapper}>
          <h3 className={styles.serviceJobHeader}>Основые услуги</h3>
          <ul className={styles.jobsWrapper}>
            {/* Посмотрим как тут будут бэки отдавать. Может сделаем через map */}
            <li>Регулярное техобслуживание</li>
            <li>Шиномонтаж и балансировка шин</li>
            <li>Диагностика и ремонт двигателя</li>
            <li>Высококачественная покраска и ремонт кузова</li>
            <li>Настройка климатического контроля</li>
            <li>Установка дополнительного оборудования</li>
          </ul>
        </div>
        <div className={styles.serviceCarsWrapper}>
          <h3 className={styles.serviceJobHeader}>Марки обслуживаемых автомобилей:</h3>
          <ul className={styles.carsWrapper}>
            {/* Посмотрим как тут будут бэки отдавать. Может сделаем через map */}
            <li className={styles.carsItem}>BMW</li>
            <li className={styles.carsItem}>Land Rover</li>
            <li className={styles.carsItem}>Audi</li>
            <li className={styles.carsItem}>Volvo</li>
            <li className={styles.carsItem}>Lexus</li>
            <li className={styles.carsItem}>Mercedes</li>
          </ul>
        </div>
      </article>
      <div className={styles.addressWrapper}>
        <div className={styles.addressWithMap}>
          <h3 className={styles.addressHEader}>Адрес</h3>
          <p className={styles.addressText}>
            Москва, Красный Октябрь м-н, Киржач, Владимирская область, Пушкина ул. 27А
          </p>
        </div>
        <img src="#" alt="map" />
      </div>
    </section>
  );
}

ServicePage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ServicePage;
