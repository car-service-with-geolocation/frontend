import success from '../../images/ThanksLogo.svg';
import Modal from '../Modal/Modal';
import styles from './styles/styles.module.css';

type TPropsServiceThanksPopup = {
  isOpen: boolean;
  onClose: () => void;
};

function ServiceThanksPopup({ isOpen, onClose }: TPropsServiceThanksPopup) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Спасибо!</h2>
          <img className={styles.modalImage} src={success} alt="логотип сообщения" />
          <h3 className={styles.modalSubtitle}>
            Ваш отзыв сохранен! Мы опубликуем его сразу после проверки
          </h3>
          <button className={styles.modalButton} onClick={onClose}>
            Отлично
          </button>
        </div>
        <div className={styles.ellipse} />
      </>
    </Modal>
  );
}
export default ServiceThanksPopup;
