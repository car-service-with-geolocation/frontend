/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/require-default-props */
import { useState } from 'react';

import styles from './ServiceFeedBack.module.css';

declare module 'react' {
  interface CSSProperties {
    '--rating'?: string | number;
  }
}

type tPhoto = {
  image: string;
  id: number;
  alt: string;
};

type TServiceFeedBack = {
  name: string;
  date: string;
  rating: number;
  feedBack: string;
  photos: tPhoto[];
};

function ServiceFeedBack({ name, date, rating, feedBack, photos }: TServiceFeedBack) {
  const [imageOnPage, setImageonPage] = useState(4);
  const addImageOnPage = 6;

  function handleMoreImage() {
    setImageonPage(imageOnPage + addImageOnPage);
  }
  return (
    <article className={styles.feedBackWrapper}>
      <div style={{ '--rating': rating }} className={styles.feedBackRating} />
      <div className={styles.aboutUser}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.date}>{date}</p>
      </div>
      <p className={styles.feedBack}>{feedBack}</p>
      <div className={styles.imageWrapper}>
        {photos.slice(0, imageOnPage).map((photo, i, a) => {
          return (
            <div className={styles.imageButtonWrapper} key={photo.id}>
              <img className={styles.image} src={photo.image} alt={photo.alt} />
              {i === 3 && photos.length > 4 && a.length !== photos.length ? (
                <button onClick={handleMoreImage} className={styles.span}>{`+ ${
                  photos.length - 4
                }`}</button>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default ServiceFeedBack;
