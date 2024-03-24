import { ChangeEvent, FocusEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { YMAP_API_KEY } from '../../utils/constants';
import { Geolocation } from '../../utils/types';
import Ymap from '../Ymap/Ymap';
import styles from './styles/styles.module.css';

function FieldsetAutoserviceAdress() {
  const [coord, setCoord] = useState<Geolocation>({
    latitude: 55.757449,
    longitude: 37.600217,
  });
  const [adress, setAdress] = useState('');
  const [error, setError] = useState('');
  const { register, setValue } = useFormContext();

  async function getCoord(formatStr: string): Promise<string> {
    const pointPosition = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${YMAP_API_KEY}&geocode=${formatStr}&format=json`
    )
      .then((res) => {
        if (!res.ok) {
          Error('Ошибка при запросе данных');
        }
        return res.json();
      })
      .then(
        (data) => data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
      );

    return pointPosition;
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>): void {
    setAdress(evt.target.value);
  }

  async function handleBlur(evt: FocusEvent<HTMLInputElement>): Promise<void> {
    const { value } = evt.target;
    if (!value) setError('Введите адрес автосервиса');
    if (value) {
      const formatStr = value.split(' ').join('+');
      const point = getCoord(formatStr);
      const coordinate: Geolocation = {
        latitude: Number((await point).split(' ')[1]),
        longitude: Number((await point).split(' ')[0]),
      };

      setCoord(coordinate);
      setValue('autoservice_geoloc', point);
      setError('');
    }
  }

  return (
    <fieldset className={styles.fieldset}>
      <h2 className={styles.title}>Адрес</h2>
      <input type="hidden" {...register('autoservice_geoloc')} />
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Адрес автосервиса
        <input
          placeholder="Москва, Красный Октябрь м-н, Киржач, Владимирская область, Пушкина ул. 27А"
          type="text"
          className={`${styles.form__input} ${!error ? '' : styles.form__input_error}`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={adress}
        />
        <span className={styles.input__error}>{error}</span>
      </label>
      <p className={styles.mapText}>Точный адрес на карте</p>
      <div className={styles.mapWrapper}>
        <Ymap singleGeo={coord} />
      </div>
    </fieldset>
  );
}

export default FieldsetAutoserviceAdress;
