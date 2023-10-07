import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import styles from './styles/styles.module.css';

function MainThanksPopup({ isOpen, onClose, onOverlayClick }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={onOverlayClick}>
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

MainThanksPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
};
