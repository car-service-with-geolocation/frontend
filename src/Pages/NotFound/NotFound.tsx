import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';

import style from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  function handleClick(event: SyntheticEvent) {
    event.preventDefault();
    navigate('/');
  }
  return (
    <div className={style.notFoundPage}>
      <div className={style.notFoundPage}>
        <div className={style.notFoundPageContainer}>
          <p className={style.notFoundPageTitle}>404</p>
          <p className={style.notFoundPageText}>
            К сожалению, cтраница, которую вы ищете, не существует.
          </p>
          <button onClick={handleClick} className={style.notFoundPageBtn}>
            Перейти на главную
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
