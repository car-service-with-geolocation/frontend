import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import DragAndDrop from '../../DragAndDrop/DragAndDrop';
import Modal from '../../Modal/Modal';
import StarRating from '../../StarRating/StarRating';
import ServiceThanksPopup from '../ServiceThanksPopup/ServiceThanksPopup';
import styles from './styles/styles.module.css';

type TPropsFeedbackPopup = {
  isOpen: boolean;
  onClose: () => void;
  handleFeedbackSubmit: () => void;
  isServiceThanksOpen: boolean;
};

interface IFeedBackData {
  name: string;
  feedBack: string;
  rating: number;
}

function FeedbackPopup({
  isOpen,
  onClose,
  handleFeedbackSubmit,
  isServiceThanksOpen,
}: TPropsFeedbackPopup) {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<IFeedBackData>({
    defaultValues: {
      name: '',
      feedBack: '',
      rating: 0,
    },
    mode: 'onChange',
  });

  const handleFilesDrop = (droppedFiles: (File & { preview: string })[]) => {
    setFiles(droppedFiles);
  };

  const onSubmit: SubmitHandler<IFeedBackData> = (data) => {
    console.log(data, files, rating);
    handleFeedbackSubmit();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '', feedBack: '' });
      setRating(0);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (rating === 0) {
      setError('rating', {
        type: 'manual',
        message: 'Не забудьте дать оценку сервису',
      });
    } else {
      clearErrors('rating');
    }
  }, [clearErrors, rating, setError]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Написать отзыв</h2>
          <div className={styles.formContainer}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              action="submit"
              id="feedBack_form"
              noValidate
            >
              <div className={styles.infoblock}>
                <p className={`${styles.subtitle} ${styles.subtitle_name}`}>
                  Как вас зовут?
                </p>
                <input
                  {...register('name', {
                    required: 'Обязательное поле для заполнения',
                    minLength: {
                      value: 2,
                      message: 'Минимальное количество символов в поле 2',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Максимальное количество символов в поле 20',
                    },
                  })}
                  className={
                    errors.name ? `${styles.input} ${styles.input__active}` : styles.input
                  }
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Имя"
                  required
                />
                <span className={styles.input__error}>
                  {errors.name && errors.name?.message}
                </span>
              </div>
              <div className={`${styles.infoblock} ${styles.infoblock_rating}`}>
                <h3 className={styles.subtitle}>Оцените ваши впечатления</h3>
                <StarRating rating={rating} setRating={setRating} />
                <span className={styles.input__error}>
                  {errors.rating && errors.rating?.message}
                </span>
              </div>
              <div className={styles.infoblock}>
                <p className={styles.subtitle}>Ваш отзыв</p>
                <textarea
                  className={
                    errors.feedBack
                      ? `${styles.input} ${styles.input__active}`
                      : styles.input
                  }
                  wrap="soft"
                  id="feedback"
                  placeholder="Напишите здесь ваши впечатления: что вам понравилось, а что нет... Как вам специалист и автосервис в целом?"
                  {...register('feedBack', {
                    required: 'Обязательное поле для заполнения',
                    minLength: {
                      value: 3,
                      message: 'Минимальное количество символов в поле 3',
                    },
                    maxLength: {
                      value: 200,
                      message: 'Максимальное количество символов в поле 200',
                    },
                  })}
                />
                <span className={styles.input__error}>
                  {errors.feedBack && errors.feedBack?.message}
                </span>
              </div>
              <div className={styles.infoblock}>
                <DragAndDrop onFilesDrop={handleFilesDrop} />
              </div>
            </form>
          </div>
          <button
            form="feedBack_form"
            type="submit"
            className={`${styles.modalButton} ${
              rating > 0 && isValid ? '' : styles.modalButton__disabled
            }`}
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
