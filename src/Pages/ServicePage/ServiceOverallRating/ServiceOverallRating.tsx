import styles from './ServiceOverallRating.module.css';

function ServiceOverallRating() {
  return (
    <div className={styles.ratingWrapper}>
      <div className={styles.elementWrapper}>
        <p className={styles.ratingNumber}>5</p>
        <div className={styles.singleRating}>
          <svg className={styles.scale} width="100%" />
        </div>
      </div>
      <div className={styles.elementWrapper}>
        <p className={styles.ratingNumber}>4</p>
        <div className={styles.singleRating}>
          <svg className={styles.scale} width="0%" />
        </div>
      </div>
      <div className={styles.elementWrapper}>
        <p className={styles.ratingNumber}>3</p>
        <div className={styles.singleRating}>
          <svg className={styles.scale} width="30%" />
        </div>
      </div>
      <div className={styles.elementWrapper}>
        <p className={styles.ratingNumber}>2</p>
        <div className={styles.singleRating}>
          <svg className={styles.scale} width="70%" />
        </div>
      </div>
      <div className={styles.elementWrapper}>
        <p className={styles.ratingNumber}>1</p>
        <div className={styles.singleRating}>
          <svg className={styles.scale} width="0%" />
        </div>
      </div>
    </div>
  );
}
export default ServiceOverallRating;
