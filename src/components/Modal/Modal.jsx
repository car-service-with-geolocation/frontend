import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import styles from './styles/styles.module.css';

function Modal({ isOpen, onClose, onOverlayClick, children }) {
  const location = useLocation();
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlay_isOpened : ''}`}
      onClick={onOverlayClick}
      role="presentation"
    >
      <div className={styles.modal}>
        <button
          className={`${
            location.pathname !== '/'
              ? styles.modalCloseButton
              : styles.modalCloseButton_none
          }`}
          type="button"
          onClick={onClose}
        />
        {children}
        <div className={styles.ellipse} />
      </div>
    </div>
  );
}
export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.element,
};
