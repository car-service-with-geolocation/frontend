import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import carLogo from '../../images/car-Logo.svg';
import { useAppSelector } from '../../store';
import style from './styles/styles.module.css';

function Header() {
  const location = useLocation();

  const { isLoggedIn } = useAppSelector((store) => store.auth);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [isActive]);

  const handlerClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <header className={style.header}>
      <div className={style.block}>
        <Link className={style.logoLink} to="/">
          <img className={style.logoImg} src={carLogo} alt="Логотип" />
          <p className={style.logoText}>Find Car Services</p>
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
      <Link
        to={isLoggedIn ? '/profile/user-data' : '/login'}
        className={`${isLoggedIn ? style.enterText_icon : style.enterText}`}
      >
        Вход
      </Link>
    </header>
  );
}

export default Header;
