import { Link, useLocation } from 'react-router-dom';

import carLogo from '../../images/car-Logo.svg';
import style from './styles/Header.module.css';

function Header() {
  const location = useLocation();
  return (
    <header className={style.header}>
      <div className={style.block}>
        <Link className={style.logoLink} to="/">
          <img src={carLogo} alt="Логотип" />
          <p className={style.logoText}>Premium Car Services</p>
        </Link>
        <div className={style.link}>
          <ul className={style.menu}>
            <li className={style.menu__item}>
              <Link
                className={`${style.linkText} ${
                  location.pathname === '/search' ? style.active : ''
                }`}
                to="/search"
              >
                Поиск автосервисов
              </Link>
            </li>
            <li className="menu__item">
              <Link
                className={`${style.linkText} ${
                  location.pathname === '/forservices' ? style.active : ''
                }`}
                to="/forservices"
              >
                Для автосервисов
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className={style.enterText}>Вход</p>
    </header>
  );
}

export default Header;
