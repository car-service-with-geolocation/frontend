/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import './reactSelect.css';

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select, { SingleValue } from 'react-select';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServiceByCoord } from '../../store/autoServiceByCoordSlice';
import { fetchCars } from '../../store/carsSlice';
import { navigatorOptions } from '../../utils/constants';
import { getReverseGeocod } from '../../utils/dadataApi';
import { TCar, TCoord } from '../../utils/types';
import style from './Search.module.css';

function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const options = useAppSelector((store) => store.cars.data);

  const [currentAuto, setCurrentAuto] = useState<string | null>();
  const [currentLocation, setCurrentLocation] = useState<string | null>('');
  const [coordinates, setcoordinates] = useState<TCoord>();
  const [isRotation, setIsRotation] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);

  // Далее работа с поиском геолокации юзера =>
  function success(position: GeolocationPosition) {
    // если всё хорошо, собираем ссылку
    setcoordinates({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
    // Убрать после =>
    setTimeout(() => {
      setIsRotation(false);
    }, 2000);
  }
  function error() {
    // Убрать после =>
    setTimeout(() => {
      setIsRotation(false);
    }, 2000);
    // если всё плохо, просто напишем об этом
    console.log('Не получается определить вашу геолокацию'); // Обработать ошибку тут!! + тот-же попап?
  }

  function handleFindlonLat() {
    if (!navigator.geolocation) {
      console.log('Ваш браузер не дружит с геолокацией...'); // попап с ошибкой сюда!!
    } else {
      setIsRotation(true);
      navigator.geolocation.getCurrentPosition(success, error, navigatorOptions);
    }
  }

  // Ранее работа с поиском геолокации юзера <=

  function getValue() {
    return options.find((auto) => auto.brand === currentAuto);
  }

  function onChangeSelect(newValue: SingleValue<TCar>) {
    if (newValue) {
      setCurrentAuto(newValue.brand);
      currentAuto && sessionStorage.setItem('selectedAuto', newValue.brand);
    }
  }

  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setCurrentLocation(e.target.value);
    currentLocation && sessionStorage.setItem('selectedLocation', e.target.value);
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    firstSearch ? '' : setFirstSearch(!firstSearch);
    if (coordinates) {
      dispatch(fetchAutoServiceByCoord(coordinates));
    }
    currentLocation && sessionStorage.setItem('selectedLocation', currentLocation);
    currentAuto && sessionStorage.setItem('selectedAuto', currentAuto);
    coordinates && sessionStorage.setItem('coordinates', JSON.stringify(coordinates));
    navigate('/search');
  }

  // Далее работа с геокодером и запросы к API DADATA =>
  useEffect(() => {
    if (coordinates) {
      getReverseGeocod(coordinates)
        .then((res) => {
          setCurrentLocation(res.suggestions[0].value);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [coordinates]);
  // Ранее работа с геокодером и запросы к API DADATA <=

  useEffect(() => {
    if (sessionStorage.getItem('selectedAuto')) {
      setCurrentAuto(sessionStorage.getItem('selectedAuto'));
    }
    sessionStorage.getItem('selectedLocation') &&
      setCurrentLocation(sessionStorage.getItem('selectedLocation'));
    if (sessionStorage.getItem('coordinates') && !firstSearch) {
      dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchAutoServiceByCoord(JSON.parse(sessionStorage.getItem('coordinates')))
      );
    }
    dispatch(fetchCars());
  }, [coordinates, dispatch, firstSearch]);

  return (
    <section className={style.section}>
      <form
        id="search_form"
        onSubmit={handleSubmit}
        className={style.form}
        action="submit"
      >
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
          className={`select ${style.select_position}`}
          noOptionsMessage={() => 'Совпадений не найдено'}
        />
        <div className={style.inputWrapper}>
          <input
            name="inputLocation"
            minLength={5}
            maxLength={45}
            disabled
            className={style.formInput}
            type="text"
            placeholder="Определить местоположение"
            onChange={onChangeInput}
            value={currentLocation || ''}
          />
          <button
            onClick={handleFindlonLat}
            className={
              isRotation
                ? `${style.inputButton} ${style.rotation}`
                : `${style.inputButton}`
            }
            type="button"
          />
        </div>
        <button type="submit" className={style.formButton}>
          Найти
        </button>
      </form>
    </section>
  );
}

export default Search;
