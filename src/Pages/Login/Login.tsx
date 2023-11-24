import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Checkbox from '../../components/Checkbox/Checkbox';
import { useAppDispatch } from '../../store';
import { fetchUserLogin } from '../../store/authSlice';
import { REGEXP_EMAIL } from '../../utils/constants';
import styles from './styles/styles.module.css';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isUserTabActive, setIsUserTabActive] = useState(true);
  const [isServiceTabActive, setIsServiceTabActive] = useState(false);

  interface ILoginUserData {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginUserData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginUserData> = (data) => {
    dispatch(
      fetchUserLogin({
        password: data.password,
        email: data.email,
      })
    ).then((req) => {
      if (req.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };

  function onHandleCheck() {
    setIsChecked((current) => !current);
  }

  function onHandleClick() {
    setIsActive((current) => !current);
  }

  function onHandleUserClick() {
    if (!isUserTabActive && isServiceTabActive) {
      setIsUserTabActive((current) => !current);
      setIsServiceTabActive((current) => !current);
    }
  }

  function onHandleServiceClick() {
    if (!isServiceTabActive && isUserTabActive) {
      setIsServiceTabActive((current) => !current);
      setIsUserTabActive((current) => !current);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Войти</h1>
        <form
          id="login_form"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          action="submit"
          noValidate
        >
          <div className={styles.userblock}>
            <div className={styles.tabBlock}>
              <button
                className={`${styles.subtitle} ${styles.userButton}`}
                type="button"
                onClick={onHandleUserClick}
              >
                Водитель
              </button>
              <div
                className={`${
                  isUserTabActive ? styles.underline : styles.underlineDisabled
                }`}
              />
            </div>
            <div className={styles.tabBlock}>
              <button
                className={`${styles.subtitle} ${styles.userButton}`}
                type="button"
                onClick={onHandleServiceClick}
              >
                Автосервис
              </button>
              <div
                className={`${
                  isServiceTabActive ? styles.underline : styles.underlineDisabled
                }`}
              />
            </div>
          </div>
          <h3 className={styles.label}>Почта</h3>
          <div className={styles.inputWrapper}>
            <input
              {...register('email', {
                required: 'Это поле обязательно для заполнения',
                pattern: {
                  value: REGEXP_EMAIL,
                  message: 'Почта не соответствует требуемому формату',
                },
              })}
              className={
                errors.email ? `${styles.input} ${styles.inputActive}` : styles.input
              }
              type="email"
              name="email"
              id="email"
            />
            <span className={styles.error}>{errors?.email && errors.email.message}</span>
          </div>
          <div className={styles.password_text}>
            <h3 className={styles.label}>Пароль</h3>
            <Link
              className={`${styles.label} ${styles.link}`}
              rel="stylesheet"
              to="/reset-password"
            >
              Не помню пароль
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <input
              {...register('password', {
                required: 'Это поле обязательно для заполнения',
                minLength: {
                  value: 8,
                  message: `Текст должен быть не короче 8 символов`,
                },
                maxLength: {
                  value: 16,
                  message: `Текст должен быть не длиннее 16 символов `,
                },
              })}
              className={
                errors.password
                  ? `${styles.input} ${styles.input_password} ${styles.inputActive}`
                  : `${styles.input} ${styles.input_password}`
              }
              type={isActive ? 'text' : 'password'}
              name="password"
              id="password"
            />
            <button
              type="button"
              className={
                isActive
                  ? `${styles.eyeButton} ${styles.eyeButtonActive}`
                  : styles.eyeButton
              }
              onClick={onHandleClick}
            />
            <span className={styles.error}>
              {errors?.password && errors.password.message}
            </span>
          </div>

          <Checkbox
            isChecked={isChecked}
            label="Запомнить меня"
            checkHandler={() => onHandleCheck()}
            index={0}
          />
          <button
            type="submit"
            className={
              isValid
                ? styles.submitButton
                : `${styles.submitButton} ${styles.submitButton_disable}`
            }
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
      </div>
      <div className={styles.registrationBlock}>
        <p className={styles.subtitle} id="newUser">
          Новый пользователь?
        </p>
        <Link
          rel="stylesheet"
          to="/registration"
          className={`${styles.subtitle} ${styles.link}`}
        >
          Зарегистрироваться
        </Link>
      </div>
    </>
  );
}

export default Login;
