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
      <div className={styles.areaContainer}>
        <label htmlFor="autoservice_services" className={styles.form__label}>
          Основные услуги:
          <textarea
            {...register('autoservice_services')}
            placeholder="Автосервис СССР"
            id="autoservice_services"
            className={`${styles.form__textarea} ${
              !errors.autoservice_services ? '' : styles.form__textarea_error
            }`}
          />
          <span className={styles.textarea__error}>
            {errors.autoservice_site?.message as ReactNode}
          </span>
        </label>
        <label htmlFor="autoservice_cars" className={styles.form__label}>
          Марки автомобилей:
          <textarea
            {...register('autoservice_cars')}
            placeholder="Автосервис СССР"
            id="autoservice_cars"
            className={`${styles.form__textarea} ${
              !errors.autoservice_cars ? '' : styles.form__textarea_error
            }`}
          />
          <span className={styles.textarea__error}>
            {errors.autoservice_site?.message as ReactNode}
          </span>
        </label>
      </div>
    </fieldset>
  );
}

export default FieldsetServiceDescript;
