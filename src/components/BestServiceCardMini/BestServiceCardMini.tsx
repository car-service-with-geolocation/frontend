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

function BestServiceCardMini({
  image,
  id,
  title,
  rating,
  votes,
  address,
  openfrom,
  openuntil,
}: TPropsBestServiceCard) {
  return (
    <Link className={styles.link} to={`/service/${id}`}>
      <article className={styles.card}>
        <figcaption className={styles.cardInfoblock}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardRating}>
            <img className={styles.cardRatingIcon} src={star} alt="иконка Звезда" />
            <p className={styles.cardRatingNumbers}>{`${rating} (${votes})`}</p>
          </div>
          <ul className={styles.cardInfoList}>
            <li>
              <p className={styles.cardInfoText}>{address}</p>
            </li>
            <li>
              <p className={styles.cardInfoText}>
                Открыто с {`${openfrom}`} до {`${openuntil}`}
              </p>
            </li>
          </ul>
        </figcaption>
        <img
          className={styles.cardImg}
          src={image || defaultImage}
          alt="процесс работы в автосервисе"
        />
      </article>
    </Link>
  );
}

export default BestServiceCardMini;
