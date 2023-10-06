import { MouseEventHandler } from 'react';

import styles from './styles/styles.module.css';

type TPropsApplicationAccept = {
  isOpen: boolean;
  onClose: () => void;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
};

function ApplicationAccept({ isOpen, onClose, onOverlayClick }: TPropsApplicationAccept) {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlay_isOpened : ''}`}
      onClick={onOverlayClick}
      role="presentation"
    >
      <div className={styles.modal}>
        <button className={styles.modalCloseButton} type="button" onClick={onClose} />
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Заявка отправлена</h2>
          {/* <img src={success} alt/> */}
          <h3 className={styles.modalSubtitle}>
            В течении 5 минут менеджер свяжется с&nbsp;вами, чтобы уточнить детали заявки
          </h3>
          <button title="button" className={styles.modalButton} onClick={onClose}>
            Отлично
          </button>
        </div>
        <div className={styles.ellipse} />
      </div>
    </div>
  );
}
export default ApplicationAccept;
