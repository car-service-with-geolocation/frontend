import { NavLink, Outlet } from 'react-router-dom';

import styles from './styles/styles.module.css';

function UserProfile() {
  return (
    <div className={styles.userProfile}>
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
