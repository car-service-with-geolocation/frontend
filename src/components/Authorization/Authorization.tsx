import { Link } from 'react-router-dom';

import style from './styles/styles.module.css';

type TPropsAuthorization = {
  title: string;
  children: React.ReactNode;
};

function Authorization({ title, children }: TPropsAuthorization) {
  return (
    <>
      <div className={style.auth}>
        <h1 className={style.auth__title}>{title}</h1>
        {children}
      </div>
      <p className={style.auth__text}>
        Уже есть аккаунт?
        <Link to="/login" className={style.auth__link}>
          Войти
        </Link>
      </p>
    </>
  );
}

export default Authorization;
