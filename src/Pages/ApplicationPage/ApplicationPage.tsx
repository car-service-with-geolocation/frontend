/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Checkbox from '../../components/Checkbox/Checkbox';
import ApplicationAcceptPopup from '../../components/Popups/ApplicationAcceptPopup/ApplicationAcceptPopup';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import { allCheckboxes } from '../../utils/constants';
import useWindowWidth from '../../utils/windowWidth';
import styles from './styles/styles.module.css';

export type TApplicationPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
};

function ApplicationPage({ isOpen, onClose, onClick }: TApplicationPageProps) {
  const dispatch = useAppDispatch();
  const location = useParams();
  const services = useAppSelector((store) => store.mainAutoServices.data);
  const serviceToRender = services.find((service) => service.id === Number(location.id));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [applicationService, setApplicationService] = useState(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    serviceToRender || JSON.parse(sessionStorage.getItem('applicationService'))
  );
  const [checkboxes, setCheckboxes] = useState(allCheckboxes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isValid, setIsValid] = useState(true);
  const { width } = useWindowWidth();

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

  return (
    <div className={styles.applicationContainer}>
      <section className={styles.wrapper}>
        {width >= 900 ? (
          <ul className={styles.menu__list}>
            <li className={`${styles.menu__item} ${styles.link}`}>
              <Link to="/" className={styles.link}>
                Главная
              </Link>
              /
            </li>
            <li className={`${styles.menu__item} ${styles.link}`}>
              <Link to="/search" className={styles.link}>
                Поиск автосервисов
              </Link>
              /
            </li>
            <li className={`${styles.menu__item} ${styles.link}`}>
              <Link to={`/service/${location.id}`} className={styles.link}>
                {applicationService.company.title}
              </Link>
              /
            </li>
            <li className={`${styles.menu__item} ${styles.link}`}>
              <Link to={`/service/${location.id}/application`} className={styles.link}>
                Создание заявки
              </Link>
            </li>
          </ul>
        ) : (
          <ServiceCard
            image={applicationService.company.logo}
            id={applicationService.company.id}
            title={applicationService.company.title}
            rating={applicationService.rating}
            votes={applicationService.votes}
            address={applicationService.address}
            workingTime={applicationService.working_time_today}
          />
        )}

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
            <div className={styles.infoblock}>
              <div className={styles.info}>
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
              </div>
              <div className={styles.info}>
                <h3 className={styles.subtitle}>О вас</h3>
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
            </div>
            <h3 className={styles.subtitle}>Опишите, что случилось</h3>
            <textarea
              className={styles.formText}
              wrap="soft"
              name=""
              id="problemDescription"
              placeholder="Что-то стучит, когда еду..."
            />
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
            <fieldset className={styles.personalData}>
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

            <button
              className={`${styles.submitButton} ${
                !isValid ? styles.submitButton_disable : ''
              }`}
              type="submit"
              disabled={!isValid}
              onClick={onClick}
            >
              Отправить заявку
            </button>
          </form>
          {width >= 900 ? (
            <article className={styles.card}>
              <h3 className={styles.subtitle}>Автосервис</h3>
              <ServiceCard
                image={applicationService.company.logo}
                id={applicationService.company.id}
                title={applicationService.company.title}
                rating={applicationService.rating}
                votes={applicationService.votes}
                address={applicationService.address}
                workingTime={applicationService.working_time_today}
              />
            </article>
          ) : (
            <span />
          )}
        </div>
      </section>
      <ApplicationAcceptPopup
        isOpen={isOpen}
        onClose={onClose}
        // onOverlayClick={() => {}}
      />
    </div>
  );
}

export default ApplicationPage;
