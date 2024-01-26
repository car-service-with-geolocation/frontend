import styles from './styles/styles.module.css';

function FieldsetImgUpload() {
  return (
    <fieldset>
      <h2>Фотографии автосервиса</h2>
      <p>Можно добавить до 10 фотографий</p>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Основные услуги:
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          type="file"
          name="autoservice_upload_img"
          id="autoservice_upload_img"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
    </fieldset>
  );
}

export default FieldsetImgUpload;
