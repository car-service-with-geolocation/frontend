// import { REGEXP_EMAIL, REGEXP_INN, REGEXP_PHONE_NUMBER } from '../../utils/constants';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './styles/styles.module.css';

function FieldsetAutoserviceData() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset className={styles.form__fieldset}>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Название автосервиса
        <input
          {...register('autoservice_name')}
          type="text"
          name="autoservice_name"
          id="autoservice_name"
          className={`${styles.form__input}${
            !errors.autoservice_name ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_name?.message as ReactNode}
        </span>
      </label>
      <label htmlFor="autoservice_email" className={styles.form__label}>
        Почта
        <input
          {...register('autoservice_email')}
          type="text"
          name="autoservice_email"
          id="autoservice_email"
          className={`${styles.form__input}${
            !errors.autoservice_email ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_email?.message as ReactNode}
        </span>
      </label>
      <label htmlFor="autoservice_phone" className={styles.form__label}>
        Телефон
        <input
          {...register('autoservice_phone')}
          type="text"
          name="autoservice_phone"
          id="autoservice_phone"
          className={`${styles.form__input}${
            !errors.autoservice_phone ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_phone?.message as ReactNode}
        </span>
      </label>
      <label htmlFor="autoservice_work_time" className={styles.form__label}>
        Режим работы автосервиса
        <input
          {...register('autoservice_work_time')}
          type="text"
          name="autoservice_work_time"
          id="autoservice_work_time"
          className={`${styles.form__input}${
            !errors.autoservice_work_time ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_work_time?.message as ReactNode}
        </span>
      </label>
      <label htmlFor="autoservice_site" className={styles.form__label}>
        Сайт вашего автосервиса
        <input
          {...register('autoservice_site')}
          type="text"
          name="autoservice_site"
          id="autoservice_site"
          className={`${styles.form__input}${
            !errors.autoservice_site ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_site?.message as ReactNode}
        </span>
      </label>
    </fieldset>
  );
}

export default FieldsetAutoserviceData;
