import { ReactElement, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles/styles.module.css';

type TPropsModal = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
};

function Modal({ isOpen, onClose, children }: TPropsModal) {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  function closePopup(evt: Event) {
    if (evt.target === evt.currentTarget && isOpen) {
      onClose();
    }
  }

  useEffect(() => {
    const el = overlayRef.current;
    if (el) {
      el.addEventListener('click', closePopup);
    }
    return () => {
      if (el) {
        el.removeEventListener('click', closePopup);
      }
    };
  });

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlay_isOpened : ''}`}
      ref={overlayRef}
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
