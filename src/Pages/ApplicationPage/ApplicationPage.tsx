/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ApplicationAccept from '../../components/ApplicationAccept/ApplicationAccept';
import BestServiceCard from '../../components/BestServiceCard/BestServiceCard';
import Checkbox from '../../components/Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import { allCheckboxes } from '../../utils/constants';
import styles from './styles/styles.module.css';

function ApplicationPage() {
  const dispatch = useAppDispatch();
  const location = useParams();
  const services = useAppSelector((store) => store.mainAutoServices.data);
  const serviceToRender = services.find((service) => service.id === Number(location.id));
  const [isApplicationAcceptOpen, setIsApplicationAcceptOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [applicationService, setApplicationService] = useState(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  function onHandleChange(index: number) {
    setCheckboxes(
      checkboxes.map((checkbox, currentIndex) => {
        return currentIndex === index
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    );
  }

  function handleClick() {
    setIsApplicationAcceptOpen(true);
  }

  function handleOverlayClick(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (evt.target === evt.currentTarget) {
      setIsApplicationAcceptOpen(false);
    }
  }

  function handleEscapeClick(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      setIsApplicationAcceptOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
    };
  });

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
            onSubmit={(e) => e.preventDefault()}
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
            <button className={styles.submitButton} type="button" onClick={handleClick}>
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
      <ApplicationAccept
        isOpen={isApplicationAcceptOpen}
        onClose={() => {
          setIsApplicationAcceptOpen(false);
        }}
        onOverlayClick={(evt) => handleOverlayClick(evt)}
      />
    </div>
  );
}

export default ApplicationPage;
