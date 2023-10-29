/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '../../components/Checkbox/Checkbox';
import { useAppDispatch } from '../../store';
import { fetchUserLogin } from '../../store/authSlice';
import styles from './styles/styles.module.css';

function Login() {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUserTabActive, setIsUserTabActive] = useState(true);
  const [isServiceTabActive, setIsServiceTabActive] = useState(false);
  const [userData, setUserData] = useState({
    password: '',
    email: '',
  });

  function handleChange(evt: any) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(evt: any) {
    evt.preventDefault();
    // eslint-disable-next-line react/prop-types
    dispatch(
      fetchUserLogin({
        password: userData.password,
        username: userData.email,
      })
    );
  }

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
          onSubmit={handleSubmit}
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
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder=""
            value={userData.email || ''}
            onChange={handleChange}
            required
          />
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
          <div className={styles.passwordBlock}>
            <input
              className={`${styles.input} ${styles.input_password}`}
              type={isActive ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder=""
              value={userData.password || ''}
              onChange={handleChange}
              required
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
          </div>

          <Checkbox
            isChecked={isChecked}
            label="Запомнить меня"
            checkHandler={() => onHandleCheck()}
            index={0}
          />
          <button type="submit" className={styles.submitButton}>
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
