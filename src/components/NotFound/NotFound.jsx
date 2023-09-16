import style from './NotFound.module.css';

function NotFound() {
  return (
    <div className={style.notFoundPage}>
      <div className={style.notFoundPageContainer}>
        <p className={style.notFoundPageTitle}>404</p>
        <p className={style.notFoundPagesText}>Страница не найдена</p>
      </div>
    </div>
  );
}

export default NotFound;
