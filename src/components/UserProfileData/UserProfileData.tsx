/* eslint-disable @typescript-eslint/no-unused-vars */
// import { BaseSyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUserDataChange } from '../../store/authSlice';
import { baseUrl, REGEXP_EMAIL, REGEXP_PHONE_NUMBER } from '../../utils/constants';
import styles from './styles/styles.module.css';

interface IUserProfileData {
  user_name: string;
  user_phone_number: string;
  user_email: string;
}

function UserProfileData() {
  const dispatch = useAppDispatch();

  const currentUserName = useAppSelector((state) =>
    state.auth.first_name ? state.auth.first_name : ''
  );
  const currentUserPhone = useAppSelector((state) =>
    state.auth.phone_number ? state.auth.phone_number : ''
  );
  const currentUserEmail = useAppSelector((state) =>
    state.auth.email ? state.auth.email : ''
  );

  const {
    register,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<IUserProfileData>({
    defaultValues: {
      user_name: currentUserName,
      user_phone_number: currentUserPhone,
      user_email: currentUserEmail,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      user_name: currentUserName,
      user_phone_number: currentUserPhone,
      user_email: currentUserEmail,
    });
  }, [currentUserName, currentUserPhone, currentUserEmail, reset]);
  // useEffect(() => {
  //   setValue('user_name', currentUserName);
  //   setValue('user_phone_number', currentUserPhone);
  //   setValue('user_email', currentUserEmail);
  // }, [currentUserName, currentUserPhone, currentUserEmail, setValue]);

  const onSubmit: SubmitHandler<IUserProfileData> = (
    userData: IUserProfileData
  ): void => {
    dispatch(
      fetchUserDataChange({
        email: userData.user_email,
        first_name: userData.user_name,
        phone_number: userData.user_phone_number,
      })
    );
  };

  return (
    <form
      id="user-profile-data-form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      action="submit"
      noValidate
    >
      <h1 className={styles.form__title}>Мои данные</h1>
      <fieldset className={styles.form__fieldset}>
        <label htmlFor="user_name" className={styles.form__label}>
          Имя
          <input
            {...register('user_name', {
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
            name="user_name"
            id="user_name"
            className={`${styles.form__input} ${
              !errors.user_name ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.user_name && errors.user_name?.message}
          </span>
        </label>
        <label htmlFor="user_email" className={styles.form__label}>
          Почта
          <input
            {...register('user_email', {
              required: 'Обязательное поле для заполнения',
              pattern: {
                value: REGEXP_EMAIL,
                message:
                  'Почта не соответствует требуемому формату <имя>@<домен>.<код страны>',
              },
            })}
            type="email"
            name="user_email"
            id="user_email"
            className={`${styles.form__input} ${
              !errors.user_email ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.user_email && errors.user_email.message}
          </span>
        </label>
        <label htmlFor="user_phone_number" className={styles.form__label}>
          Телефон
          <input
            {...register('user_phone_number', {
              required: 'Обязательное поле для заполнения',
              pattern: {
                value: REGEXP_PHONE_NUMBER,
                message: 'Телефон не соответствует требуемому формату',
              },
            })}
            type="tel"
            name="user_phone_number"
            id="user_phone_number"
            className={`${styles.form__input} ${
              !errors.user_phone_number ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.user_phone_number && errors.user_phone_number.message}
          </span>
        </label>
        <button
          className={`${styles.form__submitbtn} ${
            isValid && isDirty ? '' : styles.form__submitbtn_disabled
          }`}
          type="submit"
          disabled={!isValid || !isDirty}
        >
          Сохранить
        </button>
      </fieldset>
    </form>
  );
}

export default UserProfileData;
