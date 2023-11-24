import { Link } from 'react-router-dom';

import style from './Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.img_descrition}>Find Car Services</p>
      <ul className={style.navigation_wrapper}>
        <li className={style.navigation_wrapper_section}>
          <Link className={style.link} to="/search">
            Поиск автосервисов
          </Link>
        </li>
        <li className={style.navigation_wrapper_section}>
          <Link className={style.link} to="/forservices">
            Для автосервисов
          </Link>
        </li>
      </ul>
      <address className={style.address_wrapper}>
        <a
          className={style.address_link}
          rel="noreferrer"
          target="_blank"
          href="https://t.me/@find_carservies"
        >
          Telegram: @find_carservies
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
