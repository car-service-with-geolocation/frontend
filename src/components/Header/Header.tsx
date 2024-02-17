import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import carLogo from '../../images/car-Logo.svg';
import carLogoRevers from '../../images/car-Logo-revers.svg';
import { useAppSelector } from '../../store';
import { Theme } from '../../utils/types';
import SwitchDarkLight from '../SwitcherLightDark/SwitcherLightDark';
import style from './styles/styles.module.css';

function Header() {
  const location = useLocation();

  const { isLoggedIn } = useAppSelector((store) => store.auth);

  const [serviceLogo, setServiceLogo] = useState('');
  const [isActive, setIsActive] = useState(false);

  const theme: Theme = useAppSelector((state) => state.darkLightMode.mode);

  useEffect(() => {
    if (theme === 'dark') {
      setServiceLogo(carLogo);
    } else {
      setServiceLogo(carLogoRevers);
    }
  }, [theme]);

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
          <img className={style.logoImg} src={serviceLogo} alt="Логотип" />
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
      <div className={style.rightSide}>
        <SwitchDarkLight />
        <Link
          to={isLoggedIn ? '/profile/user-data' : '/login'}
          className={`${isLoggedIn ? style.enterText_icon : style.enterText} ${
            location.pathname === '/login' ? style.active : ''
          }`}
        >
          Вход
        </Link>
      </div>
    </header>
  );
}

export default Header;
