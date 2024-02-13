import { Link } from 'react-router-dom';

import defaultImage from '../../images/tools.svg';
import star from '../../images/YmapStarIcon.svg';
import styles from './styles/styles.module.css';

type TPropsServiceCard = {
  image: string;
  id: number;
  title: string;
  rating: number;
  votes: number;
  address: string;
  workingTime: string;
};

function ServiceCard({
  image,
  id,
  title,
  rating,
  votes,
  address,
  workingTime,
}: TPropsServiceCard) {
  return (
    <Link className={styles.link} to={`/service/${id}`}>
      <article className={styles.card}>
        <div
          className={`${styles.cardImg} ${image ? '' : styles.cardImg_default}`}
          style={{ backgroundImage: `url(${image || defaultImage})` }}
        />
        <div className={styles.cardInfoblock}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <div className={styles.cardRating}>
            <img className={styles.cardRatingIcon} src={star} alt="иконка Звезда" />
            <p className={styles.cardRatingNumbers}>{`${Number(rating)} (${votes})`}</p>
          </div>
          <p className={styles.cardInfoText}>{workingTime}</p>
          <p className={styles.cardInfoText}>{address}</p>
        </div>
      </article>
    </Link>
  );
}

export default ServiceCard;
