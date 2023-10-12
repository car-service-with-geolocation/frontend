import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles/styles.module.css';

type TPropsModal = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
};

function Modal({ isOpen, onClose, children }: TPropsModal) {
  const location = useLocation();
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlay_isOpened : ''}`}
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
