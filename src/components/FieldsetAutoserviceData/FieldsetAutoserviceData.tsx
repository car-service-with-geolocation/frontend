// import { REGEXP_EMAIL, REGEXP_INN, REGEXP_PHONE_NUMBER } from '../../utils/constants';
import styles from './styles/styles.module.css';

function FieldsetAutoserviceData() {
  return (
    <fieldset className={styles.form__fieldset}>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Название автосервиса
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
          type="text"
          name="autoservice_name"
          id="autoservice_name"
          className={styles.form__input}
          // className={`${styles.form__input}${
          //   !errors.autoservice_email ? '' : styles.form__input_error
          // }`}
        />
        {/* <span className={styles.input__error}>
          {errors.autoservice_name && errors.autoservice_name?.message}
        </span> */}
      </label>
      <label htmlFor="autoservice_email" className={styles.form__label}>
        Почта
        <input
          // {...register('autoservice_email', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_EMAIL,
          //     message:
          //       'Почта не соответствует требуемому формату <имя>@<домен>.<код страны>',
          //   },
          // })}
          type="email"
          name="autoservice_email"
          id="autoservice_email"
          className={styles.form__input}
          // className={`${styles.form__input}${
          //   !errors.autoservice_email ? '' : styles.form__input_error
          // }`}
        />
        {/* <span className={styles.input__error}>
          {errors.autoservice_email && errors.autoservice_email.message}
        </span> */}
      </label>
      <label htmlFor="autoservice_phone_number" className={styles.form__label}>
        Телефон
        <input
          // {...register('autoservice_phone_number', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_PHONE_NUMBER,
          //     message: 'Телефон не соответствует требуемому формату',
          //   },
          // })}
          type="tel"
          name="autoservice_phone_number"
          id="autoservice_phone_number"
          className={styles.form__input}
          // className={`${styles.form__input}${
          //   !errors.autoservice_email ? '' : styles.form__input_error
          // }`}
        />
        {/* <span className={styles.input__error}>
          {errors.autoservice_phone_number && errors.autoservice_phone_number.message}
        </span> */}
      </label>
      <label htmlFor="autoservice_inn" className={styles.form__label}>
        Режим работы
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          type="text"
          name="autoservice_inn"
          id="autoservice_inn"
          className={styles.form__input}
          // className={`${styles.form__input}${
          //   !errors.autoservice_email ? '' : styles.form__input_error
          // }`}
        />
        {/* <span className={styles.input__error}>
          {errors.autoservice_inn && errors.autoservice_inn.message}
        </span> */}
      </label>
      <label htmlFor="autoservice_inn" className={styles.form__label}>
        Сайт вашего автосервиса
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          type="text"
          name="autoservice_inn"
          id="autoservice_inn"
          className={styles.form__input}
          // className={`${styles.form__input}${
          //   !errors.autoservice_email ? '' : styles.form__input_error
          // }`}
        />
        {/* <span className={styles.input__error}>
          {errors.autoservice_inn && errors.autoservice_inn.message}
        </span> */}
      </label>
    </fieldset>
  );
}

export default FieldsetAutoserviceData;
