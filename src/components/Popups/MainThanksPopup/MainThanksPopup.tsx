import Modal from '../../Modal/Modal';
import styles from './styles/styles.module.css';

type TPropsMainThanksPopup = {
  isOpen: boolean;
  onClose: () => void;
};

function MainThanksPopup({ isOpen, onClose }: TPropsMainThanksPopup) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Спасибо!</h2>
        <h3 className={styles.modalSubtitle}>Мы учтем ваши пожелания и предложения</h3>
        <button className={styles.modalButton} onClick={onClose}>
          Отлично
        </button>
      </div>
    </Modal>
  );
}
export default MainThanksPopup;
