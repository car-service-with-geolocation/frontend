import cancel from '../../../images/cancel.png';
import Modal from '../../Modal/Modal';
import styles from './styles/styles.module.css';

type TPropsErrorPopup = {
  isOpen: boolean;
  onClose: () => void;
};

function ErrorPopup({ isOpen, onClose }: TPropsErrorPopup) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Что-то пошло не так!</h2>
        <img className={styles.modalImage} src={cancel} alt="логотип сообщения" />
        {/* <button className={styles.modalButton} onClick={onClose}>
          Отлично
        </button> */}
      </div>
    </Modal>
  );
}
export default ErrorPopup;
