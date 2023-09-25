/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BestServiceCard from '../../components/BestServiceCard/BestServiceCard';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
// import { services } from '../../utils/constants';
import styles from './styles/styles.module.css';

function ApplicationPage() {
  const dispatch = useDispatch();
  const location = useParams();
  const services = useSelector((store) => store.mainAutoServices.data);
  // console.log(services);
  const serviceToRender = services.find((service) => service.id === Number(location.id));
  console.log(serviceToRender);
  useEffect(() => {
    dispatch(fetchAutoServiceId(location.id));
  }, [dispatch, location.id]);
  return (
    <div className={styles.applicationContainer}>
      <section className={styles.wrapper}>
        <p
          className={styles.way}
        >{`Главная\u00A0\u00A0 / \u00A0\u00A0Поиск автосервисов\u00A0\u00A0 / \u00A0\u00A0${serviceToRender.company.title}\u00A0\u00A0 / \u00A0\u00A0Создание заявки`}</p>
        <div className={`${styles.ellipse} ${styles.ellipse1}`} />
        <div className={`${styles.ellipse} ${styles.ellipse2}`} />
        <div className={`${styles.ellipse} ${styles.ellipse3}`} />
        <h2 className={styles.title}>Создание заявки</h2>
        <div className={styles.applicationWrapper}>
          <form
            className={styles.applicationForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            action="submit"
          >
            <h3 className={styles.subtitle}>Об автомобиле</h3>
            <label className={styles.textAreaTitle} htmlFor="carModel">
              Марка и модель
            </label>
            <input
              className={styles.formText}
              type="text"
              name="carModel"
              id="carModel"
              placeholder="BMW i5 M60 xDrive"
              required
            />
            <label className={styles.textAreaTitle} htmlFor="carInfo">
              Еще важная инфа
            </label>
            <input
              className={styles.formText}
              type="text"
              name="carInfo"
              id="carInfo"
              placeholder="Инфа"
            />
            <h3 className={styles.subtitle}>О вас</h3>
            <fieldset className={styles.aboutUserSection}>
              <div className={styles.phoneInfo}>
                <label className={styles.textAreaTitle} htmlFor="tel">
                  Номер телефона
                </label>
                <input
                  className={styles.formText}
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="+7 900 000 00 00"
                  required
                />
              </div>
              <div className={styles.mailInfo}>
                <label className={styles.textAreaTitle} htmlFor="email">
                  Почта
                </label>
                <input
                  className={styles.formText}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="mekhri1999@gmail.com"
                  required
                />
              </div>
            </fieldset>
            <h3 className={styles.subtitle}>Опишите, что случилось</h3>
            <textarea
              className={styles.formText}
              wrap="soft"
              type="textarea"
              name=""
              id=""
              placeholder="Что-то стучит, когда еду..."
            />
            <fieldset className={styles.aboutUserSection}>
              <div className={styles.phoneInfo}>
                <label
                  className={`${styles.textAreaTitle} ${styles.checkboxLabel}`}
                  htmlFor="repairs"
                >
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="checkbox"
                    id="repairs"
                    value="repairs"
                  />
                  {/* <span className={styles.visibleCheckbox} /> */}
                  Срочный ремонт
                </label>
              </div>
              <div>
                <label
                  className={`${styles.textAreaTitle} ${styles.checkboxLabel}`}
                  htmlFor="towtruck"
                >
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="checkbox"
                    id="towtruck"
                    value="towtruck"
                  />
                  {/* <span className={styles.visibleCheckbox} /> */}
                  Нужен эвакуатор
                </label>
              </div>
            </fieldset>
            <h3 className={styles.subtitle}>Прикрепите фотографии поломки</h3>
            <h4 className={styles.textRemark}>(по возможности)</h4>
            <div className={styles.imageInputsContainer}>
              <input
                className={styles.imageInput}
                type="file"
                name="imageFile"
                id="imageFile"
                placeholder=""
              />
              <div className={styles.inputPreloader}>
                <label className={styles.preloaderLabel}>Загрузка...</label>
                <input
                  className={`${styles.imageInput} ${styles.imageInput2}`}
                  type="file"
                  name="imageFile"
                  id="imageFile"
                  placeholder=""
                />
              </div>
              <input
                className={`${styles.imageInput} ${styles.imageInput3}`}
                type="file"
                name="imageFile"
                id="imageFile"
                placeholder=""
              />
            </div>
            <button className={styles.submitButton} type="submit">
              Отправить заявку
            </button>
          </form>
          <article className={styles.card}>
            <h3 className={styles.subtitle}>Автосервис</h3>
            <BestServiceCard
              image={serviceToRender.company.logo}
              id={serviceToRender.company.id}
              title={serviceToRender.company.title}
              rating={serviceToRender.rating}
              votes={serviceToRender.votes}
              address={serviceToRender.address}
              openfrom={serviceToRender.openfrom}
              openuntil={serviceToRender.openuntil}
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default ApplicationPage;
