/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef */
import './reactSelect.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Select from 'react-select';

import { fetchAutoServiceByCoord } from '../../store/autoServiceByCoordSlice';
import { navigatorOptions, options } from '../../utils/constants';
import { getReverseGeocod } from '../../utils/dadataApi';
import style from './Search.module.css';

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentAuto, setCurrentAuto] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [coordinates, setcoordinates] = useState({});
  const [isRotation, setIsRotation] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);

  // Далее работа с поиском геолокации юзера =>
  function success(position) {
    // если всё хорошо, собираем ссылку
    setcoordinates({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
    // Убрать после =>
    setTimeout(() => {
      setIsRotation(false);
    }, '2000');
  }
  function error() {
    // Убрать после =>
    setTimeout(() => {
      setIsRotation(false);
    }, '2000');
    // если всё плохо, просто напишем об этом
    console.log('Не получается определить вашу геолокацию'); // Обработать ошибку тут!! + тот-же попап?
  }

  function handleFindlonLat() {
    // eslint-disable-next-line no-undef
    if (!navigator.geolocation) {
      console.log('Ваш браузер не дружит с геолокацией...'); // попап с ошибкой сюда!!
    } else {
      setIsRotation(true);
      // eslint-disable-next-line no-undef
      navigator.geolocation.getCurrentPosition(success, error, navigatorOptions);
    }
  }

  // Ранее работа с поиском геолокации юзера <=

  function getValue() {
    return currentAuto ? options.find((auto) => auto.value === currentAuto) : '';
  }

  function onChangeSelect(newValue) {
    setCurrentAuto(newValue.value);
  }

  function onChangeInput(e) {
    setCurrentLocation(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    firstSearch ? '' : setFirstSearch(!firstSearch);
    dispatch(fetchAutoServiceByCoord(coordinates));
    currentLocation && sessionStorage.setItem('selectedLocation', currentLocation);
    currentAuto && sessionStorage.setItem('selectedAuto', currentAuto);
    coordinates && sessionStorage.setItem('coordinates', JSON.stringify(coordinates));
    navigate('/search');
  }

  // Далее работа с геокодером и запросы к API DADATA =>
  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
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
    sessionStorage.getItem('selectedAuto') &&
      setCurrentAuto(sessionStorage.getItem('selectedAuto'));
    sessionStorage.getItem('selectedLocation') &&
      setCurrentLocation(sessionStorage.getItem('selectedLocation'));
    if (sessionStorage.getItem('coordinates') && !firstSearch) {
      dispatch(
        fetchAutoServiceByCoord(JSON.parse(sessionStorage.getItem('coordinates')))
      );
    }
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
          options={options}
          isLoading={false} // Небольшая Анимация загрузки данных.
          isSearchable // Возможность вписывать текст в инпут и далее выбирать
          classNamePrefix="react-select"
          className="select"
          noOptionsMessage={() => 'Совпадений не найдено'}
        />
        <div className={style.inputWrapper}>
          <input
            name="inputLocation"
            minLength="5"
            maxLength="45"
            required
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
