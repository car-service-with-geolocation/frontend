// import carLogo from '../../images/car-Logo-Preloader.svg';
import style from './Preloader.module.css';

function Preloader() {
  return (
    <section className={style.section}>
      <div className={style.spinner} />
    </section>
  );
}

export default Preloader;
