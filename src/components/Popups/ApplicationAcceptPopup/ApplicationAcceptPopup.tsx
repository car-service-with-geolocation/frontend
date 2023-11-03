// import { MouseEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import success from '../../../images/success.svg';
import Modal from '../../Modal/Modal';
import styles from './styles/styles.module.css';

type TPropsApplicationAcceptPopup = {
  isOpen: boolean;
  onClose: () => void;
  // onOverlayClick: MouseEventHandler<HTMLDivElement>;
};

function ApplicationAcceptPopup({ isOpen, onClose }: TPropsApplicationAcceptPopup) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick() {
    onClose();
    navigate('/');
  }

  function showMessage() {
    if (location.pathname === '/registration') {
      return 'Вы успешно зарегистрировались';
    }
    if (location.pathname === '/reset-password') {
      return 'Вы успешно изменили свой пароль';
    }
    return 'Заявка отправлена';
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>{showMessage()}</h2>
          <img className={styles.modalImage} src={success} alt="логотип сообщения" />
          {location.pathname !== '/registration' &&
          location.pathname !== '/reset-password' ? (
            <h3 className={styles.modalSubtitle}>
              В течение 5 минут менеджер свяжется с&nbsp;вами, чтобы уточнить детали
              заявки
            </h3>
          ) : (
            <div />
          )}
          <button
            className={styles.modalButton}
            onClick={
              location.pathname === '/registration' ||
              location.pathname === '/reset-password'
                ? handleClick
                : onClose
            }
          >
            Отлично
          </button>
        </div>
        <div className={styles.ellipse} />
      </>
    </Modal>
  );
}
export default ApplicationAcceptPopup;
