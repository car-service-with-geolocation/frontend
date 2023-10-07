/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BestServiceCard from '../../components/BestServiceCard/BestServiceCard';
import Checkbox from '../../components/Checkbox/Checkbox';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import { allCheckboxes } from '../../utils/constants';
import styles from './styles/styles.module.css';

function ApplicationPage() {
  const dispatch = useDispatch();
  const location = useParams();
  const services = useSelector((store) => store.mainAutoServices.data);
  const serviceToRender = services.find((service) => service.id === Number(location.id));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [applicationService, setApplicationService] = useState(
    serviceToRender || JSON.parse(sessionStorage.getItem('applicationService'))
  );
  const [checkboxes, setCheckboxes] = useState(allCheckboxes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    dispatch(fetchAutoServiceId(location.id));
  }, [dispatch, location.id]);

  useEffect(() => {
    if (serviceToRender) {
      sessionStorage.setItem('applicationService', JSON.stringify(serviceToRender));
    }
  });

  function formSubmitHandler(e) {
    e.preventDefault();
  }

  function onHandleChange(index) {
    setCheckboxes(
      checkboxes.map((checkbox, currentIndex) => {
        return currentIndex === index
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    );
  }

  return (
    <div className={styles.applicationContainer}>
      <section className={styles.wrapper}>
        <p
          className={styles.way}
        >{`Главная\u00A0\u00A0 / \u00A0\u00A0Поиск автосервисов\u00A0\u00A0 / \u00A0\u00A0${applicationService.company.title}\u00A0\u00A0 / \u00A0\u00A0Создание заявки`}</p>
        <div className={`${styles.ellipse} ${styles.ellipse1}`} />
        <div className={`${styles.ellipse} ${styles.ellipse2}`} />
        <div className={`${styles.ellipse} ${styles.ellipse3}`} />
        <h2 className={styles.title}>Создание заявки</h2>
        <div className={styles.applicationWrapper}>
          <form
            className={styles.applicationForm}
            onSubmit={formSubmitHandler}
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
              {checkboxes.map((checkbox, index) => {
                return (
                  <Checkbox
                    key={checkbox.name}
                    isChecked={checkbox.checked}
                    label={checkbox.name}
                    checkHandler={() => onHandleChange(index)}
                    index={index}
                  />
                );
              })}
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
            <button
              className={`${styles.submitButton} ${
                !isValid ? styles.submitButton_disable : ''
              }`}
              type="submit"
              disabled={!isValid}
            >
              Отправить заявку
            </button>
          </form>
          <article className={styles.card}>
            <h3 className={styles.subtitle}>Автосервис</h3>
            <BestServiceCard
              image={applicationService.company.logo}
              id={applicationService.company.id}
              title={applicationService.company.title}
              rating={applicationService.rating}
              votes={applicationService.votes}
              address={applicationService.address}
              openfrom={applicationService.openfrom}
              openuntil={applicationService.openuntil}
            />
          </article>
        </div>
      </section>
    </div>
  );
}

export default ApplicationPage;
