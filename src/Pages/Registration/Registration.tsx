/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import '../../components/Search/reactSelect.css';

import { SyntheticEvent, useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';

// import { useForm } from 'react-hook-form';
import Authorization from '../../components/Authorization/Authorization';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCars } from '../../store/carsSlice';
import { TCar } from '../../utils/types';
import styles from './styles/styles.module.css';

function Registration() {
  const dispatch = useAppDispatch();
  const options = useAppSelector((store) => store.cars.data);
  const userData = useAppSelector((store) => store.user.data);

  const [currentAuto, setCurrentAuto] = useState<string | null>();
  const [firstSearch, setFirstSearch] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('selectedAuto')) {
      setCurrentAuto(sessionStorage.getItem('selectedAuto'));
    }
    dispatch(fetchCars());
  }, [dispatch, firstSearch]);

  function getValue() {
    return options.find((auto) => auto.brand === currentAuto);
  }

  function onChangeSelect(newValue: SingleValue<TCar>) {
    if (newValue) {
      setCurrentAuto(newValue.brand);
      currentAuto && sessionStorage.setItem('selectedAuto', newValue.brand);
    }
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    firstSearch ? '' : setFirstSearch(!firstSearch);
    currentAuto && sessionStorage.setItem('selectedAuto', currentAuto);
    // const userData = {
    //   email: 'email',
    // };
    // navigate('/search');
  }

  function onHandleChange() {
    setIsChecked((current) => !current);
    console.log(userData);
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
        onSubmit={handleSubmit}
        className={styles.form}
        action="submit"
      >
        <fieldset className={styles.form__fieldset}>
          <label htmlFor="user-email" className={styles.form__label}>
            Почта
            <input
              type="email"
              name="user-email"
              id="user-email"
              className={styles.form__input}
            />
            <span className={styles.input__error}>Error text</span>
          </label>

          <label htmlFor="user-name" className={styles.form__label}>
            Имя
            <input
              type="text"
              name="user-name"
              id="user-name"
              className={styles.form__input}
            />
            <span className={styles.input__error}>Error text</span>
          </label>
          <div className={styles.form__label}>
            Укажите вашу марку автомобиля
            <Select
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
          </div>

          <label htmlFor="user-password" className={styles.form__label}>
            Пароль
            <div className={styles.input__wrapper}>
              <input
                type="password"
                name="user-password"
                id="user-password"
                className={styles.form__input}
              />
              <button type="button" className={styles.input__icon} />
            </div>
            <span className={styles.input__error}>Error text</span>
          </label>

          <label htmlFor="user-password-repeat" className={styles.form__label}>
            Повторите пароль
            <div className={styles.input__wrapper}>
              <input
                type="password"
                name="user-password-repeat"
                id="user-password-repeat"
                className={styles.form__input}
              />
              <button type="button" className={styles.input__icon} />
            </div>
            <span className={styles.input__error}>Error text</span>
          </label>
        </fieldset>
        <label
          className={`${styles.form__label} ${styles.form__label_checkbox} ${
            isChecked ? styles.checkboxLabel_active : ''
          }`}
          htmlFor="agree-checkbox"
        >
          <input
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
            isChecked ? styles.form__submitbtn_disabled : ''
          }`}
          type="submit"
          disabled={!isChecked}
        >
          Зарегестрироваться
        </button>
      </form>
    </Authorization>
  );
}

export default Registration;
