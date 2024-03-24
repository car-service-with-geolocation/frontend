import { MouseEventHandler, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

// import { useAppSelectorб useAppDispatch } from '../../store';
import styles from './styles/styles.module.css';

function AutoserviceProfile() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const dispatch = useAppDispatch();
  // const userLogin = useAppSelector((state) => state.auth.first_name);
  // const userEmail = useAppSelector((state) => state.auth.email);
  useEffect(() => {
    if (pathname === '/forservices') {
      navigate('/forservices/autoservice-profile-data');
    }
  }, [navigate, pathname]);

  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    console.log('SignOut');
  };

  return (
    <div
      className={`${styles.autoserviceProfile} ${
        pathname === '/forservices/autoservice-orders' && styles.autoserviceProfile_row
      }`}
    >
      <Helmet>
        <title>Личный кабинет автосервиса</title>
        <meta property="og:title" content="Личный кабинет автосервиса" />
      </Helmet>
      <div
        className={`${styles.autoserviceProfile__menu} ${
          pathname === '/forservices/autoservice-orders' && styles.menu_row
        }`}
      >
        <ul
          className={`${styles.autoserviceProfile__menuList} ${
            pathname === '/forservices/autoservice-orders' && styles.menuList_row
          }`}
        >
          <li className={styles.autoserviceProfile__menuItem}>
            <NavLink to="autoservice-id1" className={styles.autoserviceProfile__menuLink}>
              Автосервис номер 1
            </NavLink>
          </li>
          <li className={styles.autoserviceProfile__menuItem}>
            <NavLink
              to="autoservice-orders"
              className={styles.autoserviceProfile__menuLink}
            >
              Заявки
            </NavLink>
            <span className={styles.menuItem_redDotMessage} />
          </li>
          <li className={styles.autoserviceProfile__menuItem}>
            <NavLink
              to="autoservice-feedback"
              className={styles.autoserviceProfile__menuLink}
            >
              Отзывы
            </NavLink>
          </li>
        </ul>
        <ul
          className={`${styles.autoserviceProfile__menuList} ${
            pathname === '/forservices/autoservice-orders' && styles.menuList_row
          }`}
        >
          <li className={styles.autoserviceProfile__menuItem}>
            <NavLink
              to="autoservice-profile-data"
              className={styles.autoserviceProfile__menuLink}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.autoserviceProfile__menuItem}>
            <NavLink
              to="/"
              className={styles.autoserviceProfile__menuLink}
              onClick={handleClick}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default AutoserviceProfile;
