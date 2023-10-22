/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import '../../components/Search/reactSelect.css';

import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';

import Authorization from '../../components/Authorization/Authorization';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCars } from '../../store/carsSlice';
import { baseUrl, REGEXP_EMAIL } from '../../utils/constants';
import { TCar } from '../../utils/types';
import styles from './styles/styles.module.css';

function Registration() {
  const dispatch = useAppDispatch();
  const options = useAppSelector((store) => store.cars.data);

  const navigate = useNavigate();

  const [currentAuto, setCurrentAuto] = useState<string | null>();
  const [isChecked, setIsChecked] = useState(true);

  interface IRegUserData {
    'user-email': string;
    'user-name': string;
    'user-car': string;
    'user-password': string;
    'user-password-repeat': string;
    'agree-checkbox': boolean;
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<IRegUserData>({
    defaultValues: {
      'user-email': '',
      'user-name': '',
      'user-car': '',
      'user-password': '',
      'user-password-repeat': '',
      'agree-checkbox': true,
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (sessionStorage.getItem('selectedAuto')) {
      setCurrentAuto(sessionStorage.getItem('selectedAuto'));
    }
    dispatch(fetchCars());
  }, [dispatch]);

  const watchPasswordInput = watch('user-password');

  function getValue() {
    return options.find((auto) => auto.brand === currentAuto);
  }

  function onChangeSelect(newValue: SingleValue<TCar>) {
    if (newValue) {
      setCurrentAuto(newValue.brand);
      currentAuto && sessionStorage.setItem('selectedAuto', newValue.brand);
    }
  }

  async function signUp(userData: IRegUserData) {
    return fetch(`${baseUrl}auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка при получении объекта ${res.status}`);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }

  function onSubmit(userData: IRegUserData) {
    signUp(userData);
    navigate('/');
  }

  function onHandleChange() {
    setIsChecked((current) => !current);
  }

  function changePasswordVisible(event: BaseSyntheticEvent): void {
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
          <label htmlFor="user-email" className={styles.form__label}>
            Почта
            <input
              {...register('user-email', {
                required: 'Обязательное поле для заполнения',
                pattern: {
                  value: REGEXP_EMAIL,
                  message:
                    'Почта не соответствует требуемому формату <имя>@<домен>.<код страны>',
                },
              })}
              type="email"
              name="user-email"
              id="user-email"
              className={styles.form__input}
            />
            <span className={styles.input__error}>
              {errors['user-email'] && errors['user-email'].message}
            </span>
          </label>

          <label htmlFor="user-name" className={styles.form__label}>
            Имя
            <input
              {...register('user-name', {
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
              name="user-name"
              id="user-name"
              className={styles.form__input}
            />
            <span className={styles.input__error}>
              {errors['user-name'] && errors['user-name']?.message}
            </span>
          </label>
          <div className={styles.form__label}>
            Укажите вашу марку автомобиля
            <Controller
              name="user-car"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={onChangeSelect}
                  placeholder="Марка Автомобиля"
                  value={getValue()}
                  getOptionLabel={(option) => option.brand}
                  getOptionValue={(option) => option.slug}
                  options={options}
                  isLoading={false} // Небольшая Анимация загрузки данных.
                  isSearchable // Возможность вписывать текст в инпут и далее выбирать
                  classNamePrefix="react-select"
                  className={`select ${styles.select_position}`}
                  noOptionsMessage={() => 'Совпадений не найдено'}
                />
              )}
            />
          </div>
          <span className={styles.input__error}>
            {errors['user-car'] && errors['user-car']?.message}
          </span>

          <label htmlFor="user-password" className={styles.form__label}>
            Пароль
            <div className={styles.input__wrapper}>
              <input
                {...register('user-password', {
                  required: 'Обязательное поле для заполнения',
                  minLength: {
                    value: 6,
                    message: 'Минимальное количество символов в поле 6',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Максимальное количество символов в поле 30',
                  },
                })}
                type="password"
                name="user-password"
                id="user-password"
                className={styles.form__input}
              />
              <button
                type="button"
                className={styles.input__icon}
                onClick={changePasswordVisible}
              />
            </div>
            <span className={styles.input__error}>
              {errors['user-password'] && errors['user-password']?.message}
            </span>
          </label>

          <label htmlFor="user-password-repeat" className={styles.form__label}>
            Повторите пароль
            <div className={styles.input__wrapper}>
              <input
                {...register('user-password-repeat', {
                  required: 'Обязательное поле для заполнения',
                  minLength: {
                    value: 6,
                    message: 'Минимальное количество символов в поле 6',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Максимальное количество символов в поле 30',
                  },
                  validate: (value) =>
                    value === watchPasswordInput || 'Пароли не совпадают',
                })}
                type="password"
                name="user-password-repeat"
                id="user-password-repeat"
                className={styles.form__input}
              />
              <button
                type="button"
                className={styles.input__icon}
                onClick={changePasswordVisible}
              />
            </div>
            <span className={styles.input__error}>
              {errors['user-password-repeat'] && errors['user-password-repeat']?.message}
            </span>
          </label>
        </fieldset>
        <label
          className={`${styles.form__label} ${styles.form__label_checkbox} ${
            isChecked ? styles.checkboxLabel_active : ''
          }`}
          htmlFor="agree-checkbox"
        >
          <input
            {...register('agree-checkbox')}
            className={styles.form__checkbox}
            type="checkbox"
            name="agree-checkbox"
            id="agree-checkbox"
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
  );
}

export default Registration;
