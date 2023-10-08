import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import carLogo from '../../images/car-Logo.svg';
import style from './styles/Header.module.css';

function Header() {
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);

  const handlerClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <header className={style.header}>
      <div className={style.block}>
        <Link className={style.logoLink} to="/">
          <img className={style.logoImg} src={carLogo} alt="Логотип" />
          <p className={style.logoText}>Premium Car Services</p>
        </Link>
        <div>
          <button
            onClick={handlerClick}
            className={`${style.hum__icon} ${isActive ? style.menu_active : ''}`}
          >
            <span />
          </button>
          <div className={`${style.menu} ${isActive ? style.menu_active : ''}`}>
            <ul className={style.menu__list}>
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
              <li className={style.menu__item}>
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
      </div>
      <p className={style.enterText}>Вход</p>
    </header>
  );
}

export default Header;
