import { Link } from 'react-router-dom';

import style from './styles/styles.module.css';

function Authorization() {
  return (
    <>
      <div className={style.authorization}>
        <h2>Регистрация</h2>
        <nav>
          <Link rel="stylesheet" to="/user">
            Автомобилист
          </Link>
          <Link rel="stylesheet" to="/organization">
            Автосервис
          </Link>
        </nav>
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button type="submit">Зарегестрироваться</button>
        </form>
      </div>
      <div>
        <p>Уже есть аккаунт?</p>
        <Link rel="stylesheet" to="/login">
          Вход
        </Link>
      </div>
    </>
  );
}

export default Authorization;
