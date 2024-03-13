import { ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './styles/styles.module.css';

function FieldsetAutoserviceCTAbtn() {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  function handleChange(): void {
    setIsSwitchOn((prev) => !prev);
  }

  return (
    <fieldset className={styles.fieldset}>
      <h2 className={styles.title}>СТА-кнопка</h2>
      <p className={styles.fieldset__note}>
        Это кнопка, которая направляет пользователя позвонить, написать, оставить заявку.
        Вы можете привязать Телефон, Telegram, WhatsApp и Viber.
      </p>
      <p className={`${styles.fieldset__note} ${styles.note_position}`}>
        У вас есть кнопка “Оставить заявку” на нашем сайте, заявки будут поступать на этот
        профиль и уведомления к вам на почту. Вы можете ее выключать временно, но это не
        желательно.
      </p>
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.buttonView} ${isSwitchOn && styles.buttonView_disabled}`}
        >
          Оставить заявку
        </div>
        <div>
          <input
            {...register('spa_btn_switcher', {
              onChange: handleChange,
            })}
            id="spa_btn_switcher"
            type="checkbox"
            checked={isSwitchOn}
            className={styles.checkbox_hide}
          />
          <label htmlFor="spa_btn_switcher" className={styles.buttonSwitcher}>
            {isSwitchOn ? 'ON' : 'OFF'}
          </label>
        </div>
      </div>
      <h3 className={styles.title__extraBtns}>Также добавить в виде кнопки</h3>
      <div className={styles.contactsContainer}>
        <label htmlFor="autoservice_phone_cta" className={styles.form__label}>
          Телефон
          <input
            {...register('autoservice_phone_cta')}
            placeholder="+7(900)261-00-16"
            type="tel"
            id="autoservice_phone_cta"
            className={`${styles.form__input} ${
              !errors.autoservice_phone_cta ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.autoservice_phone_cta?.message as ReactNode}
          </span>
        </label>
        <label htmlFor="autoservice_telegram" className={styles.form__label}>
          Telegram
          <input
            {...register('autoservice_telegram')}
            placeholder="https://t.me/Ваш ник"
            type="text"
            id="autoservice_telegram"
            className={`${styles.form__input} ${
              !errors.autoservice_telegram ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.autoservice_telegram?.message as ReactNode}
          </span>
        </label>
        <label htmlFor="autoservice_whatsapp" className={styles.form__label}>
          WhatsApp
          <input
            {...register('autoservice_whatsapp')}
            placeholder="URL"
            type="text"
            id="autoservice_whatsapp"
            className={`${styles.form__input} ${
              !errors.autoservice_whatsapp ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.autoservice_whatsapp?.message as ReactNode}
          </span>
        </label>
        <label htmlFor="autoservice_viber" className={styles.form__label}>
          Viber
          <input
            {...register('autoservice_viber')}
            placeholder="URL"
            type="text"
            name="autoservice_viber"
            id="autoservice_viber"
            className={`${styles.form__input} ${
              !errors.autoservice_viber ? '' : styles.form__input_error
            }`}
          />
          <span className={styles.input__error}>
            {errors.autoservice_viber?.message as ReactNode}
          </span>
        </label>
      </div>
    </fieldset>
  );
}

export default FieldsetAutoserviceCTAbtn;
