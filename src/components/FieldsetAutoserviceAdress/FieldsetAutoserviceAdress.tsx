import { useAppSelector } from '../../store';
import Ymap from '../Ymap/Ymap';
import styles from './styles/styles.module.css';

function FieldsetAutoserviceAdress() {
  const serviceToRender = useAppSelector((store) => store.autoServiceById.data);

  return (
    <fieldset>
      <h2>Адресс</h2>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Адресс автосервиса
        <input
          placeholder="Москва, Красный Октябрь м-н, Киржач, Владимирская область, Пушкина ул. 27А"
          type="text"
          name="autoservice_name"
          id="autoservice_name"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
      <div className={styles.mapWrapper}>
        <Ymap singleGeo={serviceToRender?.geolocation} />
      </div>
    </fieldset>
  );
}

export default FieldsetAutoserviceAdress;
