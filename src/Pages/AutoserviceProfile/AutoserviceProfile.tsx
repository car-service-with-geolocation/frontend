import { MouseEventHandler, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

// import { useAppSelectorб useAppDispatch } from '../../store';
import styles from './styles/styles.module.css';

function AutoserviceProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useAppDispatch();
  // const userLogin = useAppSelector((state) => state.auth.first_name);
  // const userEmail = useAppSelector((state) => state.auth.email);
  useEffect(() => {
    if (location.pathname === '/forservices') {
      navigate('/forservices/autoservice-profile-data');
    }
  }, [navigate, location]);

  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    console.log('SignOut');
  };

  return (
    <div className={styles.AutoserviceProfile}>
      <Helmet>
        <title>Личный кабинет автосервиса</title>
        <meta property="og:title" content="Личный кабинет автосервиса" />
      </Helmet>
      <div className={styles.AutoserviceProfile__menu}>
        {/* <h2 className={styles.AutoserviceProfile__menuTitle}>
          <p className={styles.AutoserviceProfile__menuTitleStroke}>{userLogin}</p>
          <p className={styles.AutoserviceProfile__menuTitleStroke}>{userEmail}</p>
        </h2> */}
        <ul className={styles.AutoserviceProfile__menuList}>
          <li className={styles.AutoserviceProfile__menuItem}>
            <NavLink to="autoservice-id1" className={styles.AutoserviceProfile__menuLink}>
              Автосервис номер 1
            </NavLink>
          </li>
          <li className={styles.AutoserviceProfile__menuItem}>
            <NavLink
              to="autoservice-orders"
              className={styles.AutoserviceProfile__menuLink}
            >
              Заявки
            </NavLink>
          </li>
          <li className={styles.AutoserviceProfile__menuItem}>
            <NavLink
              to="autoservice-feedback"
              className={styles.AutoserviceProfile__menuLink}
            >
              Отзывы
            </NavLink>
          </li>
        </ul>
        <ul className={styles.AutoserviceProfile__menuList}>
          <li className={styles.AutoserviceProfile__menuItem}>
            <NavLink
              to="autoservice-profile-data"
              className={styles.AutoserviceProfile__menuLink}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.AutoserviceProfile__menuItem}>
            <NavLink
              to="/"
              className={styles.AutoserviceProfile__menuLink}
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
