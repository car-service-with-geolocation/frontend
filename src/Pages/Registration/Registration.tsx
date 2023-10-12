import { Link } from 'react-router-dom';
import style from './styles/styles.module.css';

function Registration() {
  return (
    <>
      <div className={style.registration}>
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
        </form>
      </div>
      <div>
        <Link rel="stylesheet" to="/signin">
          Вход
        </Link>
      </div>
    </>
  );
}

export default Registration;
