import { useAppSelector } from '../../store';
import Ymap from '../Ymap/Ymap';
import styles from './styles/styles.module.css';

function FieldsetServiceAdress() {
  const serviceToRender = useAppSelector((store) => store.autoServiceById.data);

  return (
    <fieldset>
      <h2>Адресс</h2>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Адресс автосервиса
        <input
          // {...register('autoservice_name', {
          //   required: 'Обязательное поле для заполнения',
          //   minLength: {
          //     value: 3,
          //     message: 'Минимальное количество символов в поле 3',
          //   },
          //   maxLength: {
          //     value: 30,
          //     message: 'Максимальное количество символов в поле 30',
          //   },
          // })}
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

export default FieldsetServiceAdress;
