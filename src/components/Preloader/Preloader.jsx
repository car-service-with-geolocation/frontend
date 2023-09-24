import carLogo from '../../images/car-Logo-Preloader.svg';
import style from './Preloader.module.css';

function Preloader() {
  return (
    <div className={style.preloader}>
      <div className={style.preloaderImg}>
        <img className={style.img} src={carLogo} alt="Логотип" />
        {/* <div className={style.hover}> </div> */}
      </div>
      <p className={style.preloadeText}>Premium Car Services</p>
    </div>
  );
}

export default Preloader;
