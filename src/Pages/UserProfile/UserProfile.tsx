import { Link } from 'react-router-dom';

import UserProfileData from '../../components/UserProfileData/UserProfileData';
import styles from './styles/styles.module.css';

function UserProfile() {
  return (
    <div className={styles.userProfile}>
      <div className={styles.userProfile__menu}>
        <h2 className={styles.userProfile__userName}>Вася Васин</h2>
        <ul className={styles.userProfile__menuList}>
          <li className={styles.userProfile__menuItem}>
            <Link to="">Мои данные</Link>
          </li>
          <li className={styles.userProfile__menuItem}>
            <Link to="">Мои заявки</Link>
          </li>
          <li className={styles.userProfile__menuItem}>
            <Link to="">Выход</Link>
          </li>
        </ul>
      </div>
      <div className={styles.UserProfile__content}>
        <UserProfileData />
      </div>
    </div>
  );
}

export default UserProfile;
