// import { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

// import { useAppDispatch, useAppSelector } from '../../store';
import { REGEXP_EMAIL, REGEXP_INN, REGEXP_PHONE_NUMBER } from '../../utils/constants';
import FieldsetCTAbtn from '../FieldsetCTAbtn/FieldsetCTAbtn';
import FieldsetImgUpload from '../FieldsetImgUpload/FieldsetImgUpload';
import FieldsetServiceAdress from '../FieldsetServiceAdress/FieldsetServiceAdress';
import FieldsetServiceDescript from '../FieldsetServiceDescript/FieldsetServiceDescript';
import styles from './styles/styles.module.css';

interface IAutoserviceInfoData {
  autoservice_name: string;
  autoservice_phone_number: string;
  autoservice_email: string;
  autoservice_inn: string;
}

function AutoserviceInfoData() {
  const currentAutoserviceName = 'Автосервис номер 1';
  const currentAutoservicePhone = '+7 (952) 210 49 96';
  const currentAutoserviceEmail = 'ayautoservice1@mail.ru';
  const currentAutoserviceInn = '7736340111';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IAutoserviceInfoData>({
    defaultValues: {
      autoservice_name: currentAutoserviceName,
      autoservice_phone_number: currentAutoservicePhone,
      autoservice_email: currentAutoserviceEmail,
      autoservice_inn: currentAutoserviceInn,
    },
    mode: 'onChange',
  });

  const onSubmit = () => {
    console.log('Запрос на отправку данных');
  };

  return (
    <div className={styles.autoservice__wrapper}>
      <form
        id="autoservice-profile-data-form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        action="submit"
        noValidate
      >
        <h1 className={styles.form__title}>Мой автосервис</h1>
        <fieldset className={styles.form__fieldset}>
          <label htmlFor="autoservice_name" className={styles.form__label}>
            Название автосервиса
            <input
              {...register('autoservice_name', {
                required: 'Обязательное поле для заполнения',
                minLength: {
                  value: 3,
                  message: 'Минимальное количество символов в поле 3',
                },
                maxLength: {
                  value: 30,
                  message: 'Максимальное количество символов в поле 30',
                },
              })}
              type="text"
              name="autoservice_name"
              id="autoservice_name"
              className={`${styles.form__input} ${
                !errors.autoservice_name ? '' : styles.form__input_error
              }`}
            />
            <span className={styles.input__error}>
              {errors.autoservice_name && errors.autoservice_name?.message}
            </span>
          </label>
          <label htmlFor="autoservice_email" className={styles.form__label}>
            Почта
            <input
              {...register('autoservice_email', {
                required: 'Обязательное поле для заполнения',
                pattern: {
                  value: REGEXP_EMAIL,
                  message:
                    'Почта не соответствует требуемому формату <имя>@<домен>.<код страны>',
                },
              })}
              type="email"
              name="autoservice_email"
              id="autoservice_email"
              className={`${styles.form__input} ${
                !errors.autoservice_email ? '' : styles.form__input_error
              }`}
            />
            <span className={styles.input__error}>
              {errors.autoservice_email && errors.autoservice_email.message}
            </span>
          </label>
          <label htmlFor="autoservice_phone_number" className={styles.form__label}>
            Телефон
            <input
              {...register('autoservice_phone_number', {
                required: 'Обязательное поле для заполнения',
                pattern: {
                  value: REGEXP_PHONE_NUMBER,
                  message: 'Телефон не соответствует требуемому формату',
                },
              })}
              type="tel"
              name="autoservice_phone_number"
              id="autoservice_phone_number"
              className={`${styles.form__input} ${
                !errors.autoservice_phone_number ? '' : styles.form__input_error
              }`}
            />
            <span className={styles.input__error}>
              {errors.autoservice_phone_number && errors.autoservice_phone_number.message}
            </span>
          </label>
          <label htmlFor="autoservice_inn" className={styles.form__label}>
            Режим работы
            <input
              {...register('autoservice_inn', {
                required: 'Обязательное поле для заполнения',
                pattern: {
                  value: REGEXP_INN,
                  message: 'ИНН не соответствует требуемому формату',
                },
              })}
              type="text"
              name="autoservice_inn"
              id="autoservice_inn"
              className={`${styles.form__input} ${
                !errors.autoservice_inn ? '' : styles.form__input_error
              }`}
            />
            <span className={styles.input__error}>
              {errors.autoservice_inn && errors.autoservice_inn.message}
            </span>
          </label>
          <label htmlFor="autoservice_inn" className={styles.form__label}>
            Сайт вашего автосервиса
            <input
              {...register('autoservice_inn', {
                required: 'Обязательное поле для заполнения',
                pattern: {
                  value: REGEXP_INN,
                  message: 'ИНН не соответствует требуемому формату',
                },
              })}
              type="text"
              name="autoservice_inn"
              id="autoservice_inn"
              className={`${styles.form__input} ${
                !errors.autoservice_inn ? '' : styles.form__input_error
              }`}
            />
            <span className={styles.input__error}>
              {errors.autoservice_inn && errors.autoservice_inn.message}
            </span>
          </label>
        </fieldset>
        <FieldsetImgUpload />
        <FieldsetCTAbtn />
        <FieldsetServiceDescript />
        <FieldsetServiceAdress />
        <button
          className={`${styles.btn} ${styles.btn_grid} ${
            isValid && isDirty ? '' : styles.btn_disabled
          }`}
          type="submit"
          disabled={!isValid || !isDirty}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default AutoserviceInfoData;
