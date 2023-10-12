/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import '../../components/Search/reactSelect.css';

import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';

import Checkbox from '../../components/Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCars } from '../../store/carsSlice';
import { TCar } from '../../utils/types';
import style from './styles/styles.module.css';

function Registration() {
  const dispatch = useAppDispatch();
  const options = useAppSelector((store) => store.cars.data);

  const [currentAuto, setCurrentAuto] = useState<string | null>();
  const [firstSearch, setFirstSearch] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
    // navigate('/search');
  }

  function onHandleChange() {
    setIsChecked((current) => !current);
  }

  return (
    <>
      <div className={style.authorization}>
        <h2>Регистрация</h2>
        <div>Водитель</div>
        <div>Автосервис</div>
        <form
          id="registration_form"
          onSubmit={handleSubmit}
          className={style.form}
          action="submit"
        >
          <fieldset>
            <legend>Почта</legend>
            <input type="text" name="user-email" />

            <legend>Имя</legend>
            <input type="text" name="user-name" />

            <legend>Укажите вашу марку автомобиля</legend>
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
              className="select"
              noOptionsMessage={() => 'Совпадений не найдено'}
            />

            <legend>Пароль</legend>
            <input type="text" name="user-password" />

            <legend>Повторите пароль</legend>
            <input type="text" name="user-password" />

            <Checkbox
              isChecked={isChecked}
              label="Даю согласие на обработку персональных данных"
              checkHandler={() => onHandleChange()}
              index={0}
            />
            <button type="submit">Зарегестрироваться</button>
          </fieldset>
        </form>
      </div>
      <div>
        <p>Уже есть аккаунт?</p>
        <Link rel="stylesheet" to="/login">
          Вход
        </Link>
      </div>
    </>
    // <Authorization
    //   titleText={"Добро пожаловать"}
    //   buttonText={"Зарегистрироваться"}
    //   path={"/signin"}
    // >
    //   <Link to="/organization"></Link>
    // </Authorization>
  );
}

export default Registration;
