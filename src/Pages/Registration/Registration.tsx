/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import '../../components/Search/reactSelect.css';

import { BaseSyntheticEvent, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import Authorization from '../../components/Authorization/Authorization';
import ApplicationAcceptPopup from '../../components/Popups/ApplicationAcceptPopup/ApplicationAcceptPopup';
import { useAppDispatch } from '../../store';
import { fetchUserRegistration } from '../../store/authSlice';
import { REGEXP_EMAIL } from '../../utils/constants';
import styles from './styles/styles.module.css';

export type TRegistrationProps = {
  isOpen: boolean;
  onClose: () => void;
  onPopupOpen: () => void;
};

function Registration({ isOpen, onClose, onPopupOpen }: TRegistrationProps) {
  const [isChecked, setIsChecked] = useState(true);
  const [checkPuss, setCheckPuss] = useState(true);
  const [resCheckPuss, setResCheckPuss] = useState(true);

  const dispatch = useAppDispatch();

  interface IRegUserData {
    email: string;
    first_name: string;
    password: string;
    password_repeat: string;
    agree_checkbox: boolean;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IRegUserData>({
    defaultValues: {
      email: '',
      first_name: '',
      password: '',
      password_repeat: '',
      agree_checkbox: true,
    },
    mode: 'onChange',
  });

  const watchPasswordInput = watch('password');

  const onSubmit: SubmitHandler<IRegUserData> = (userData) => {
    dispatch(
      fetchUserRegistration({
        password: userData.password,
        email: userData.email,
        first_name: userData.first_name,
      })
    );
    onPopupOpen();
  };

  function onHandleChange() {
    setIsChecked((current) => !current);
  }

  function changePasswordVisible(event: BaseSyntheticEvent): void {
    event.currentTarget.id === 'password_button'
      ? setCheckPuss(!checkPuss)
      : setResCheckPuss(!resCheckPuss);

    const inputField = event.target.parentElement.querySelector('input');
    switch (inputField.type) {
      case 'password':
        inputField.type = 'text';
        break;
      case 'text':
        inputField.type = 'password';
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Authorization title="Регистрация">
        <div className={styles.reg__choice}>
          <button
            className={`${styles.reg__choicebtn} ${styles.reg__choicebtn_active}`}
            type="button"
          >
            Водитель
          </button>
          <button className={styles.reg__choicebtn} type="button">
            Автосервис
          </button>
        </div>
        <form
          id="user-reg-form"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          action="submit"
          noValidate
        >
          <fieldset className={styles.form__fieldset}>
            <label htmlFor="email" className={styles.form__label}>
              Почта
              <input
                {...register('email', {
                  required: 'Обязательное поле для заполнения',
                  pattern: {
                    value: REGEXP_EMAIL,
                    message:
                      'Почта не соответствует требуемому формату <имя>@<домен>.<код страны>',
                  },
                })}
                type="email"
                name="email"
                id="email"
                className={
                  errors.email
                    ? `${styles.form__input} ${styles.form__input_active}`
                    : styles.form__input
                }
              />
              <span className={styles.input__error}>
                {errors.email && errors.email.message}
              </span>
            </label>

            <label htmlFor="first_name" className={styles.form__label}>
              Имя
              <input
                {...register('first_name', {
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
                name="first_name"
                id="first_name"
                className={
                  errors.first_name
                    ? `${styles.form__input} ${styles.form__input_active}`
                    : styles.form__input
                }
              />
              <span className={styles.input__error}>
                {errors.first_name && errors.first_name?.message}
              </span>
            </label>

            <label htmlFor="password" className={styles.form__label}>
              Пароль
              <div className={styles.input__wrapper}>
                <input
                  {...register('password', {
                    required: 'Обязательное поле для заполнения',
                    minLength: {
                      value: 8,
                      message: 'Минимальное количество символов в поле 8',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Максимальное количество символов в поле 16',
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password
                      ? `${styles.form__input} ${styles.form__input_active}`
                      : styles.form__input
                  }
                />
                <button
                  type="button"
                  id="password_button"
                  className={
                    checkPuss
                      ? styles.input__icon
                      : `${styles.input__icon} ${styles.input__icon_active}`
                  }
                  onClick={changePasswordVisible}
                />
              </div>
              <span className={styles.input__error}>
                {errors.password && errors.password?.message}
              </span>
            </label>

            <label htmlFor="password-repeat" className={styles.form__label}>
              Повторите пароль
              <div className={styles.input__wrapper}>
                <input
                  {...register('password_repeat', {
                    required: 'Обязательное поле для заполнения',
                    minLength: {
                      value: 8,
                      message: 'Минимальное количество символов в поле 8',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Максимальное количество символов в поле 16',
                    },
                    validate: (value) =>
                      value === watchPasswordInput || 'Пароли не совпадают',
                  })}
                  type="password"
                  name="password_repeat"
                  id="password_repeat"
                  className={
                    errors.password_repeat
                      ? `${styles.form__input} ${styles.form__input_active}`
                      : styles.form__input
                  }
                />
                <button
                  type="button"
                  id="password_repeat_button"
                  className={
                    resCheckPuss
                      ? styles.input__icon
                      : `${styles.input__icon} ${styles.input__icon_active}`
                  }
                  onClick={changePasswordVisible}
                />
              </div>
              <span className={styles.input__error}>
                {errors.password_repeat && errors.password_repeat?.message}
              </span>
            </label>
          </fieldset>
          <label
            className={`${styles.form__label} ${styles.form__label_checkbox} ${
              isChecked ? styles.checkboxLabel_active : ''
            }`}
            htmlFor="agree_checkbox"
          >
            <input
              {...register('agree_checkbox')}
              className={styles.form__checkbox}
              type="checkbox"
              name="agree_checkbox"
              id="agree_checkbox"
              checked={isChecked}
              onChange={onHandleChange}
            />
            Даю согласие на обработку персональных данных
          </label>
          <button
            className={`${styles.form__submitbtn} ${
              isChecked && isValid ? '' : styles.form__submitbtn_disabled
            }`}
            type="submit"
            disabled={!isChecked || !isValid}
          >
            Зарегестрироваться
          </button>
        </form>
      </Authorization>
      <ApplicationAcceptPopup isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Registration;
