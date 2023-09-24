import { Link, useLocation } from 'react-router-dom';

import carLogo from '../../images/car-Logo.svg';
import style from './styles/Header.module.css';

function Header() {
  const location = useLocation();
  return (
    <div className={style.header}>
      <div className={style.block}>
        <Link className={style.logoLink} to="/">
          <img src={carLogo} alt="Логотип" />
          <p className={style.logoText}>Premium Car Services</p>
        </Link>
        <div className={style.link}>
          <Link
            className={`${style.linkText} ${
              location.pathname === '/search' ? style.active : ''
            }`}
            to="/search"
          >
            Поиск автосервисов
          </Link>
          <Link
            className={`${style.linkText} ${
              location.pathname === '/forservices' ? style.active : ''
            }`}
            to="/forservices"
          >
            Для автосервисов
          </Link>
        </div>
      </div>
      <p className={style.enterText}>Вход</p>
    </div>
  );
}

export default Header;
