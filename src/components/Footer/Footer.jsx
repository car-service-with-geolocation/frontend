import { Link, useLocation } from 'react-router-dom';

import icon from '../../images/YmapIcon.svg';
import style from './Footer.module.css';

function Footer() {
  const location = useLocation();

  return (
    <footer className={style.footer}>
      <Link className={style.logo_wrapper} to="/">
        <img className={style.img} src={icon} alt="Логотип приложения" />
        <p className={style.img_descrition}>Premium Car Services</p>
      </Link>
      <ul className={style.navigation_wrapper}>
        <li className={style.navigation_wrapper_section}>
          <Link
            className={
              location.pathname === '/search'
                ? `${style.link} ${style.link_active}`
                : `${style.link}`
            }
            to="/search"
          >
            Поиск автосервисов
          </Link>
        </li>
        <li className={style.navigation_wrapper_section}>
          <Link
            className={
              location.pathname === '/forservices'
                ? `${style.link} ${style.link_active}`
                : `${style.link}`
            }
            to="/forservices"
          >
            Для автосервисов
          </Link>
        </li>
      </ul>
      <address className={style.address_wrapper}>
        <a
          className={style.address_link}
          rel="noreferrer"
          target="_blank"
          href="https://t.me/@premium_carservies"
        >
          Telegram: @premium_carservies
        </a>
        <a
          className={style.address_link}
          target="_blank"
          rel="noreferrer"
          href="tel:+7 900-200-20-20"
        >
          +7 900-200-20-20
        </a>
        <a
          className={style.address_link}
          target="_blank"
          href="mailto:p.c.ser@gmail.com"
          rel="noreferrer"
        >
          p.c.ser@gmail.com
        </a>
      </address>
    </footer>
  );
}

export default Footer;
