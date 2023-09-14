import PropTypes from 'prop-types';

import star from '../../images/bestService-Star.svg';
import styles from './styles/styles.module.css';

function BestServiceCard({ image, title, rating, votes, address, openfrom, openuntil }) {
  return (
    <article className={styles.card}>
      <img className={styles.cardImg} src={image} alt="процесс работы в автосервисе" />
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
    </article>
  );
}

export default BestServiceCard;

BestServiceCard.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.oneOf(['img', 'svg']),
  }).isRequired,
  // image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  openfrom: PropTypes.string.isRequired,
  openuntil: PropTypes.string.isRequired,
};
