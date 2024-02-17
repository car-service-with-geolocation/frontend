import { SyntheticEvent } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';

// import Err404 from '../../images/Err404.png';
import Err404 from '../../images/car-photo-for-404.jpg';
import style from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  function handleClick(event: SyntheticEvent) {
    event.preventDefault();
    navigate('/');
  }
  return (
    <section className={style.notFoundPageContainer}>
      <Helmet>
        <title>404</title>
        <meta property="og:title" content="404" />
      </Helmet>
      <img src={Err404} alt="404 ошибка" className={style.notFoundPageimg} />
      <p className={style.notFoundPageText}>
        К сожалению, cтраница, которую вы ищете, не существует.
      </p>
      <button onClick={handleClick} className={style.notFoundPageBtn}>
        Перейти на главную
      </button>
    </section>
  );
}

export default NotFound;
