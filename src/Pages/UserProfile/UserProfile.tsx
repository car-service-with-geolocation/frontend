import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles/styles.module.css';

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/profile/user-data');
    }
  }, [navigate, location]);

  return (
    <div className={styles.userProfile}>
      <Helmet>
        <title>Личный кабинет</title>
        <meta property="og:title" content="Личный кабинет" />
      </Helmet>
      <div className={styles.userProfile__menu}>
        <h2 className={styles.userProfile__menuTitle}>
          <p className={styles.userProfile__menuTitleStroke}>Вася</p>
          <p className={styles.userProfile__menuTitleStroke}>Васин</p>
        </h2>
        <ul className={styles.userProfile__menuList}>
          <li className={styles.userProfile__menuItem}>
            <NavLink to="user-data" className={styles.userProfile__menuLink}>
              Мои данные
            </NavLink>
          </li>
          <li className={styles.userProfile__menuItem}>
            <NavLink to="user-request" className={styles.userProfile__menuLink}>
              Мои заявки
            </NavLink>
          </li>
          <li className={styles.userProfile__menuItem}>
            <NavLink to="/" className={styles.userProfile__menuLink}>
              Выход
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default UserProfile;
