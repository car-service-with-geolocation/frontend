import PropTypes from 'prop-types';

import success from '../../images/success.svg';
import Modal from '../Modal/Modal';
import styles from './styles/styles.module.css';

function ApplicationAccept({ isOpen, onClose, onOverlayClick }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={onOverlayClick}>
      <>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Заявка отправлена</h2>
          <img className={styles.modalImage} src={success} alt="логотип сообщения" />
          <h3 className={styles.modalSubtitle}>
            В течение 5 минут менеджер свяжется с&nbsp;вами, чтобы уточнить детали заявки
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
export default ApplicationAccept;

ApplicationAccept.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
};
