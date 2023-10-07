import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import StarRating from '../StarRating/StarRating';
import styles from './styles/styles.module.css';

function FeedbackPopup({ isOpen, onClose, onOverlayClick }) {
  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={onOverlayClick}>
      <>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Написать отзыв</h2>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit} action="submit">
              <div className={styles.infoblock}>
                <div className={styles.subtitle} htmlFor="userName">
                  Как вас зовут?
                </div>
                <input
                  className={styles.input}
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Петр"
                  required
                />
              </div>
              <div className={styles.infoblock}>
                <h3 className={styles.subtitle}>Оцените ваши впечатления</h3>
                <StarRating />
              </div>
              <div className={styles.infoblock}>
                <div className={styles.subtitle} htmlFor="userName">
                  Ваш отзыв
                </div>
                <textarea
                  className={styles.input}
                  wrap="soft"
                  type="textarea"
                  name=""
                  id=""
                  placeholder="Напишите здесь ваши впечатления: что вам понравилось, а что нет... Как вам специалист и автосервис в целом?"
                  required
                />
              </div>
              <div className={styles.infoblock}>
                <div className={styles.subtitle} htmlFor="userName">
                  Загрузить фотографию
                </div>
                <input
                  className={styles.imageInput}
                  type="file"
                  name="imageFile"
                  id="imageFile"
                  placeholder=""
                />
              </div>
            </form>
          </div>
          <button className={styles.modalButton} type="submit" onClick={() => {}}>
            Оставить отзыв
          </button>
        </div>
        <div className={styles.ellipse} />
      </>
    </Modal>
  );
}
export default FeedbackPopup;

FeedbackPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
};
