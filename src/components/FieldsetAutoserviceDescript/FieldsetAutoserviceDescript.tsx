import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './styles/styles.module.css';

function FieldsetServiceDescript() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset className={styles.fieldset}>
      <h2 className={styles.form__title}>Описание автосервиса</h2>
      <label htmlFor="autoservice_services" className={styles.form__label}>
        Основные услуги:
        <input
          {...register('autoservice_services')}
          placeholder="Автосервис СССР"
          type="text"
          id="autoservice_services"
          className={`${styles.form__input} ${
            !errors.autoservice_services ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_site?.message as ReactNode}
        </span>
      </label>
      <label htmlFor="autoservice_cars" className={styles.form__label}>
        Марки обслуживаемых автомобилей:
        <input
          {...register('autoservice_cars')}
          placeholder="Автосервис СССР"
          type="text"
          id="autoservice_cars"
          className={`${styles.form__input} ${
            !errors.autoservice_cars ? '' : styles.form__input_error
          }`}
        />
        <span className={styles.input__error}>
          {errors.autoservice_site?.message as ReactNode}
        </span>
      </label>
    </fieldset>
  );
}

export default FieldsetServiceDescript;
