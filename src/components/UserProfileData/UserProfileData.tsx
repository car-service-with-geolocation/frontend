import { useForm } from 'react-hook-form';

import { baseUrl, REGEXP_EMAIL, REGEXP_PHONE_NUMBER } from '../../utils/constants';
import styles from './styles/styles.module.css';

function UserProfileData() {
  interface IUserProfileData {
    'user-name': string;
    'user-phone-number': string;
    'user-email': string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserProfileData>({
    defaultValues: {
      'user-name': '',
      'user-phone-number': '',
      'user-email': '',
    },
    mode: 'onTouched',
  });

  async function signUp(userData: IUserProfileData) {
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

  function onSubmit(userData: IUserProfileData) {
    signUp(userData);
  }

  return (
    <div className={styles.userProfileData}>
      <h1 className={styles.formTitle}>Мои данные</h1>
      <form
        id="user-profile-data-form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        action="submit"
        noValidate
      >
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
        <label htmlFor="user-phone-number" className={styles.form__label}>
          Телефон
          <input
            {...register('user-phone-number', {
              required: 'Обязательное поле для заполнения',
              pattern: {
                value: REGEXP_PHONE_NUMBER,
                message: 'Телефон не соответствует требуемому формату',
              },
            })}
            type="text"
            name="user-phone-number"
            id="user-phone-number"
            className={styles.form__input}
          />
          <span className={styles.input__error}>
            {errors['user-phone-number'] && errors['user-phone-number'].message}
          </span>
        </label>
        <label htmlFor="user-phone-number" className={styles.form__label}>
          Почта
          <input
            {...register('user-phone-number', {
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
        <button
          className={`${styles.form__submitbtn} ${
            isValid ? '' : styles.form__submitbtn_disabled
          }`}
          type="submit"
          disabled={!isValid}
        >
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
}

export default UserProfileData;
