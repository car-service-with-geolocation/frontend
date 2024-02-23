import styles from './styles.module.css';

function ProgressbarPreloader() {
  return (
    <div className={styles.preloaderContainer}>
      <span className={styles.preloaderLabel}>Загрузка...</span>
      <div className={styles.preloader}>
        <span className={styles.loader} />
      </div>
    </div>
  );
}

export default ProgressbarPreloader;
