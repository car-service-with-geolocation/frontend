import { Link } from 'react-router-dom';
import style from './styles/Header.module.css';
import carLogo from '../../images/car-Logo.svg';
import carServices from '../../images/Car-Services.svg';

function Header() {
  return (
    <div className={style.header}>
      <div className={style.block}>
        <div className={style.logo}>
          <img src={carLogo} alt="Логотип" />
          <img src={carServices} alt="Логотип" />
        </div>
        <div className={style.link}>
          <Link className={style.linkText} to="/">
            Поиск автосервисов
          </Link>
          <Link className={style.linkText} to="/">
            Для автосервисов
          </Link>
        </div>
      </div>
      <p className={style.enterText}>Вход</p>
    </div>
  );
}

export default Header;
