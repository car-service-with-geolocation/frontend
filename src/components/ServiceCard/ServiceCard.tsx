import { Link } from 'react-router-dom';

import defaultImage from '../../images/tools.svg';
import star from '../../images/YmapStarIcon.svg';
import styles from './styles/styles.module.css';

type TPropsBestServiceCard = {
  image: string;
  id: number;
  title: string;
  rating: number;
  votes: number;
  address: string;
  openfrom: string;
  openuntil: string;
};
let isOpenInfo = false;

function BestServiceCard({
  image,
  id,
  title,
  rating,
  votes,
  address,
  openfrom,
  openuntil,
}: TPropsBestServiceCard) {
  if (openfrom && openuntil) {
    isOpenInfo = true;
  }
  return (
    <Link className={styles.link} to={`/service/${id}`}>
      <article className={styles.card}>
        <div
          className={`${styles.cardImg} ${image ? '' : styles.cardImg_default}`}
          // className={`${styles.cardImg} ${styles.cardImg_default}`}
          style={{ backgroundImage: `url(${image || defaultImage})` }}
          // style={{ backgroundImage: `url(${defaultImage || image})` }}
        />
        <div className={styles.cardInfoblock}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <div className={styles.cardRating}>
            <img className={styles.cardRatingIcon} src={star} alt="иконка Звезда" />
            <p className={styles.cardRatingNumbers}>{`${Number(rating)} (${votes})`}</p>
          </div>
          <p className={styles.cardInfoText}>{address}</p>
          <p className={styles.cardInfoText}>
            {isOpenInfo
              ? `Открыто с ${Number(openfrom)} до ${Number(openuntil)}`
              : 'Время работы: нет данных'}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default BestServiceCard;
