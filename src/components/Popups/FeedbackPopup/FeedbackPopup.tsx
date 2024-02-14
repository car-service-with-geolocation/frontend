import { SyntheticEvent } from 'react';

import Modal from '../../Modal/Modal';
import StarRating from '../../StarRating/StarRating';
import ServiceThanksPopup from '../ServiceThanksPopup/ServiceThanksPopup';
import styles from './styles/styles.module.css';

type TPropsFeedbackPopup = {
  isOpen: boolean;
  onClose: () => void;
  handleFeedbackSubmit: (evt: SyntheticEvent) => void;
  isServiceThanksOpen: boolean;
};

function FeedbackPopup({
  isOpen,
  onClose,
  handleFeedbackSubmit,
  isServiceThanksOpen,
}: TPropsFeedbackPopup) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Написать отзыв</h2>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleFeedbackSubmit} action="submit">
              <div className={styles.infoblock}>
                <p className={`${styles.subtitle} ${styles.subtitle_name}`}>
                  Как вас зовут?
                </p>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Петр"
                  required
                />
              </div>
              <div className={`${styles.infoblock} ${styles.infoblock_rating}`}>
                <h3 className={styles.subtitle}>Оцените ваши впечатления</h3>
                <StarRating />
              </div>
              <div className={styles.infoblock}>
                <p className={styles.subtitle}>Ваш отзыв</p>
                <textarea
                  className={styles.input}
                  wrap="soft"
                  name="feedback"
                  id="feedback"
                  placeholder="Напишите здесь ваши впечатления: что вам понравилось, а что нет... Как вам специалист и автосервис в целом?"
                  required
                />
              </div>
              <div className={styles.infoblock}>
                <p className={styles.subtitle}>Загрузить фотографию</p>
                <input
                  className={styles.imageInput}
                  type="file"
                  name="image"
                  id="image"
                  placeholder=""
                />
              </div>
            </form>
          </div>
          <button
            className={styles.modalButton}
            type="submit"
            onClick={handleFeedbackSubmit}
          >
            Оставить отзыв
          </button>
        </div>
      </Modal>
      <ServiceThanksPopup isOpen={isServiceThanksOpen} onClose={onClose} />
    </>
  );
}
export default FeedbackPopup;
