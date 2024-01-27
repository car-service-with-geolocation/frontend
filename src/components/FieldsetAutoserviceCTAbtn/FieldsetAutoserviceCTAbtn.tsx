import styles from './styles/styles.module.css';

function FieldsetAutoserviceCTAbtn() {
  return (
    <fieldset>
      <h2>СТА-кнопка</h2>
      <p>
        Это кнопка, которая направляет пользователя позвонить, написать, оставить заявку.
        Вы можете привязать Телефон, Telegram, WhatsApp и Viber. У вас есть кнопка
        “Оставить заявку” на нашем сайте, заявки будут поступать на этот профиль и
        уведомления к вам на почту. Вы можете ее выключать временно, но это не желательно.
      </p>
      <button>Оставить заявку</button>
      <input type="checkbox" />
      <label htmlFor="autoservice_tel" className={styles.form__label}>
        Телефон
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          placeholder="+7(900)261-00-16"
          type="tel"
          name="autoservice_tel"
          id="autoservice_tel"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
      <label htmlFor="autoservice_telegram" className={styles.form__label}>
        Telegram
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          placeholder="https://t.me/Ваш ник"
          type="text"
          name="autoservice_telegram"
          id="autoservice_telegram"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
      <label htmlFor="autoservice_whatsapp" className={styles.form__label}>
        WhatsApp
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          placeholder="URL"
          type="text"
          name="autoservice_whatsapp"
          id="autoservice_whatsapp"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
      <label htmlFor="autoservice_viber" className={styles.form__label}>
        Viber
        <input
          // {...register('autoservice_inn', {
          //   required: 'Обязательное поле для заполнения',
          //   pattern: {
          //     value: REGEXP_INN,
          //     message: 'ИНН не соответствует требуемому формату',
          //   },
          // })}
          placeholder="URL"
          type="text"
          name="autoservice_viber"
          id="autoservice_viber"
          className={`${styles.form__input}`}
        />
        <span className={styles.input__error}>errors</span>
      </label>
    </fieldset>
  );
}

export default FieldsetAutoserviceCTAbtn;
