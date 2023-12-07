// import { number } from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { TUserRequestData } from '../../utils/types';
import styles from './styles/styles.module.css';

interface IUserRequestCard {
  requestData: TUserRequestData;
}

// id: null,
// car: '',
// info: '',
// task: '',
// image: '',
// pub_date: '',
// owner: null,
// jobs: [],

function UserRequestCard({ requestData }: IUserRequestCard) {
  const overflowingRef = useRef<null | HTMLParagraphElement>(null);
  const clampHeight = useRef<number>(0);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = overflowingRef?.current;
    if (element && element.scrollHeight > element.clientHeight) {
      setIsOverflowing(true);
      clampHeight.current = element.clientHeight;
    } else {
      setIsOverflowing(false);
    }
  }, []);

  useEffect(() => {
    const element = overflowingRef?.current;
    if (element) {
      if (isVisible) {
        element?.classList.remove(styles.clampText);
        window.requestAnimationFrame(() => {
          if (element) {
            element.style.maxHeight = `${element.scrollHeight}px`;
          }
        });
      } else {
        element.style.maxHeight = `${clampHeight.current}px`;
        setTimeout(() => {
          element?.classList.add(styles.clampText);
        }, 1000);
      }
    }
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible((state) => !state);
  };

  return (
    <article className={styles.requestCard}>
      <div className={styles.requestCard__title}>
        <p className={styles.requestCard__text}>{requestData.status}</p>
        <p className={styles.requestCard__text}>{requestData.date}</p>
      </div>
      <div className={styles.requestCard__about}>
        <p className={styles.requestCard__text}>
          Автосервис:
          <span className={styles.requestCard__text_decor}>
            {requestData.autoservice}
          </span>
        </p>
        <p className={styles.requestCard__text}>
          Данные авто:
          <span className={styles.requestCard__text_decor}>{requestData.carmodel}</span>
        </p>
      </div>
      <div className={styles.requestCard__about}>
        <p className={styles.requestCard__text}>Описание проблемы</p>
        <p
          ref={overflowingRef}
          className={`${styles.requestCard__problemText} ${styles.clampText}`}
        >
          {requestData.problem}
        </p>
      </div>
      <div className={styles.requestCard__arrowContainer}>
        {isOverflowing ? (
          <button
            className={`${styles.requestCard__arrow} ${
              isVisible && styles.requestCard__arrow_active
            }`}
            onClick={() => handleClick()}
          />
        ) : null}
      </div>
    </article>
  );
}

export default UserRequestCard;
