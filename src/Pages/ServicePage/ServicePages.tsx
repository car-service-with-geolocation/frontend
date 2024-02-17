/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import '../MapPage/immediate.css';

import { SyntheticEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';

import FeedbackPopup from '../../components/Popups/FeedbackPopup/FeedbackPopup';
import Preloader from '../../components/Preloader/Preloader';
import Ymap from '../../components/Ymap/Ymap';
import star from '../../images/YmapStarIcon.svg';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import { initialFeedBack, reviewOptions } from '../../utils/constants';
import sortedSchedule from '../../utils/sortedSchedule';
import { TImidiatevalue } from '../../utils/types';
import ServiceFeedBack from './ServiceFeedBack/ServiceFeedBack';
import ServiceOverallRating from './ServiceOverallRating/ServiceOverallRating';
import styles from './styles/styles.module.css';

export type TServicePageProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  handleFeedbackSubmit: (evt: SyntheticEvent) => void;
  isServiceThanksOpen: boolean;
};

function ServicePage({
  isOpen,
  onClose,
  onClick,
  handleFeedbackSubmit,
  isServiceThanksOpen,
}: TServicePageProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const serviceToRender = useAppSelector((store) => store.autoServiceById.data);
  const sortedWorkingTime = sortedSchedule(serviceToRender?.working_time);

  const [currentRevueSorting, setCurrentRevueSorting] = useState(reviewOptions[0].value);
  const [feedBackOnPage, setFeedBackonPage] = useState(4);
  const addFeedBackOnPage = 2;

  function getValue() {
    return currentRevueSorting
      ? reviewOptions.find((SearchType) => SearchType.value === currentRevueSorting)
      : '';
  }
  function onChangeSelect(newValue: SingleValue<TImidiatevalue | string>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCurrentRevueSorting(newValue.value);
  }

  function handleMoreFeedBack() {
    setFeedBackonPage(feedBackOnPage + addFeedBackOnPage);
  }
  useEffect(() => {
    dispatch(fetchAutoServiceId(id));
  }, [dispatch, id]);
  return (
    <section className={styles.wrapper}>
      {serviceToRender ? (
        <>
          <Helmet>
            <title>{serviceToRender.company.title}</title>
            <meta property="og:title" content={serviceToRender.company.title} />
          </Helmet>
          <p
            className={styles.way}
          >{`Главная / Поиск автосервисов / ${serviceToRender.company.title}`}</p>
          <div className={styles.serviceWrapper}>
            <div className={styles.service}>
              <h1 className={styles.serviceName}>{serviceToRender.company.title}</h1>
              <div className={styles.raitingWrappper}>
                <img className={styles.starImg} src={star} alt="star" />
                <p
                  className={styles.rating}
                >{`${serviceToRender.rating} (${serviceToRender.votes})`}</p>
              </div>
              <h2 className={styles.aboutHeader}>Об автосервисе</h2>
              <div className={styles.serviceInfo}>
                <ul className={styles.workInfo}>
                  {sortedWorkingTime?.map((working) => (
                    <li key={working.id}>{`${working.day} - ${working.time}`}</li>
                  ))}
                </ul>
                <ul className={styles.workInfo}>
                  <li>+7 900-200-20-20</li>
                  <li>p.c.ser@gmail.com</li>
                </ul>
              </div>
              <div className={styles.buttonsWrapper}>
                <button
                  className={styles.application}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/service/${serviceToRender.id}/application`);
                  }}
                >
                  Оставить заявку
                </button>
                <button className={styles.address}>Сайт</button>
              </div>
            </div>
            <img
              className={styles.servicePhoto}
              src={serviceToRender.company.logo}
              alt="autoservice"
            />
          </div>
          <article className={styles.serviceJobWrapper}>
            <div className={styles.serviceWorksWrapper}>
              <h3 className={styles.serviceJobHeader}>Основые услуги</h3>
              <ul className={styles.jobsWrapper}>
                {/* Посмотрим как тут будут бэки отдавать. Может сделаем через map */}
                <li>Регулярное техобслуживание</li>
                <li>Шиномонтаж и балансировка шин</li>
                <li>Диагностика и ремонт двигателя</li>
                <li>Высококачественная покраска и ремонт кузова</li>
                <li>Настройка климатического контроля</li>
                <li>Установка дополнительного оборудования</li>
              </ul>
            </div>
            <div className={styles.serviceCarsWrapper}>
              <h3 className={styles.serviceJobHeader}>
                Марки обслуживаемых автомобилей:
              </h3>
              <ul className={styles.carsWrapper}>
                {/* Посмотрим как тут будут бэки отдавать. Может сделаем через map */}
                <li className={styles.carsItem}>BMW</li>
                <li className={styles.carsItem}>Land Rover</li>
                <li className={styles.carsItem}>Audi</li>
                <li className={styles.carsItem}>Volvo</li>
                <li className={styles.carsItem}>Lexus</li>
                <li className={styles.carsItem}>Mercedes</li>
              </ul>
            </div>
          </article>
          <div className={styles.addressWrapper}>
            <div className={styles.addressWithMap}>
              <h3 className={styles.addressHEader}>Адрес</h3>
              <p className={styles.addressText}>{`${serviceToRender.address}`}</p>
            </div>
            <div className={styles.mapWrapper}>
              <Ymap singleGeo={serviceToRender?.geolocation} />
            </div>
          </div>
          <h3 className={styles.reviewHeader}>Отзывы</h3>
          <div className={styles.reviewWrapper}>
            <div className={styles.singleReviewWrapper}>
              <Select
                options={reviewOptions}
                classNamePrefix="immediate-select"
                className="select"
                isSearchable={false}
                onChange={onChangeSelect}
                value={getValue()}
              />
              {initialFeedBack.slice(0, feedBackOnPage).map((feedBack) => {
                return (
                  <ServiceFeedBack
                    key={feedBack.id}
                    name={feedBack.name}
                    date={feedBack.date}
                    rating={feedBack.rating}
                    feedBack={feedBack.feedBack}
                    photos={feedBack.photos}
                  />
                );
              })}
              {initialFeedBack.length > feedBackOnPage && (
                <button
                  onClick={handleMoreFeedBack}
                  className={styles.moreReviewswButton}
                >
                  Показать больше отзывов
                </button>
              )}
            </div>
            <div className={styles.allReviewswWrapper}>
              <div className={styles.allreviewsratingWrapper}>
                <p className={styles.rating}>{`${serviceToRender.rating},0`}</p>

                <div
                  style={{ '--rating': serviceToRender.rating }}
                  className={styles.feedBackRating}
                />
              </div>
              <p
                className={styles.allReviews}
              >{`Всего отзывов: ${serviceToRender.votes}`}</p>
              <ServiceOverallRating />
              <button className={styles.allReviewswButton} onClick={onClick}>
                Написать отзыв
              </button>
            </div>
          </div>
        </>
      ) : (
        <Preloader />
      )}
      <FeedbackPopup
        isOpen={isOpen}
        onClose={onClose}
        handleFeedbackSubmit={handleFeedbackSubmit}
        isServiceThanksOpen={isServiceThanksOpen}
      />
    </section>
  );
}

export default ServicePage;
