import styles from './styles/styles.module.css';

function FieldsetServiceDescript() {
  return (
    <fieldset>
      <h2>Описание автосервиса</h2>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Основные услуги:
        <input
          // {...register('autoservice_name', {
          //   required: 'Обязательное поле для заполнения',
          //   minLength: {
          //     value: 3,
          //     message: 'Минимальное количество символов в поле 3',
          //   },
          //   maxLength: {
          //     value: 30,
          //     message: 'Максимальное количество символов в поле 30',
          //   },
          // })}
          placeholder="Автосервис СССР"
          type="text"
          name="autoservice_name"
          id="autoservice_name"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Марки обслуживаемых автомобилей:
        <input
          // {...register('autoservice_name', {
          //   required: 'Обязательное поле для заполнения',
          //   minLength: {
          //     value: 3,
          //     message: 'Минимальное количество символов в поле 3',
          //   },
          //   maxLength: {
          //     value: 30,
          //     message: 'Максимальное количество символов в поле 30',
          //   },
          // })}
          placeholder="Автосервис СССР"
          type="text"
          name="autoservice_name"
          id="autoservice_name"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
    </fieldset>
  );
}

export default FieldsetServiceDescript;
