/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import Checkbox from '../../components/Checkbox/Checkbox';
import { DragAndDrop, TImgFile } from '../../components/DragAndDrop/DragAndDrop';
import ApplicationAcceptPopup from '../../components/Popups/ApplicationAcceptPopup/ApplicationAcceptPopup';
import Preloader from '../../components/Preloader/Preloader';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import submitFormData from '../../utils/applicationApiUtils';
import { allCheckboxes, REGEXP_PHONE_NUMBER } from '../../utils/constants';
import useWindowWidth from '../../utils/windowWidth';
import styles from './styles/styles.module.css';

export type TApplicationPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
};

function ApplicationPage({ isOpen, onClose, onClick }: TApplicationPageProps) {
  const dispatch = useAppDispatch();
  const location = useParams();
  const serviceToRender = useAppSelector((store) => store.autoServiceById.data);
  const { status } = useAppSelector((store) => store.autoServiceById);
  const applicationService =
    serviceToRender || JSON.parse(sessionStorage.getItem('applicationService') ?? '{}');
  const [checkboxes, setCheckboxes] = useState(allCheckboxes);
  const [files, setFiles] = useState<TImgFile[]>([]);
  const { width } = useWindowWidth();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  interface IApplicationData {
    carModel: string;
    tel: string;
    problemDescription: string;
    images: File[];
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IApplicationData>({
    defaultValues: {
      carModel: '',
      tel: '',
      problemDescription: '',
      images: [],
    },
    mode: 'onChange',
  });

  const handleFilesDrop = (droppedFiles: TImgFile[]) => {
    setFiles(droppedFiles);
  };

  function onHandleChange(index: number) {
    setCheckboxes(
      checkboxes.map((checkbox, currentIndex) => {
        return currentIndex === index
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox;
      })
    );
  }

  async function handleOnSubmit(data: IApplicationData) {
    try {
      const id = location?.id;
      const formData = new FormData();
      formData.append('car', data.carModel);
      formData.append('phone_number', data.tel);
      formData.append('task', data.problemDescription);
      if (typeof id === 'string') {
        formData.append('autoservice', id);
      }
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const isSuccessful = await submitFormData(formData);
      if (isSuccessful) {
        setIsSubmitSuccessful(true); // Display the Successful-Popup
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<IApplicationData> = (data) => {
    handleOnSubmit(data);
  };

  useEffect(() => {
    dispatch(fetchAutoServiceId(location.id));
  }, [dispatch, location.id]);

  useEffect(() => {
    if (serviceToRender) {
      sessionStorage.setItem('applicationService', JSON.stringify(serviceToRender));
    }
  });

  return (
    <div className={styles.applicationContainer}>
      {status !== 'resolved' ? (
        <Preloader />
      ) : (
        <section className={styles.wrapper}>
          {width >= 900 ? (
            <ul className={styles.menu__list}>
              <li className={`${styles.menu__item} ${styles.link}`}>
                <Link to="/" className={styles.link}>
                  Главная
                </Link>
                /
              </li>
              <li className={`${styles.menu__item} ${styles.link}`}>
                <Link to="/search" className={styles.link}>
                  Поиск автосервисов
                </Link>
                /
              </li>
              <li className={`${styles.menu__item} ${styles.link}`}>
                <Link to={`/service/${location.id}`} className={styles.link}>
                  {applicationService.company.title}
                </Link>
                /
              </li>
              <li className={`${styles.menu__item} ${styles.link}`}>
                <Link to={`/service/${location.id}/application`} className={styles.link}>
                  Создание заявки
                </Link>
              </li>
            </ul>
          ) : (
            <ServiceCard
              image={applicationService.company.logo}
              id={applicationService.company.id}
              title={applicationService.company.title}
              rating={applicationService.rating}
              votes={applicationService.votes}
              address={applicationService.address}
              workingTime={applicationService.working_time_today}
            />
          )}

          <h2 className={styles.title}>Создание заявки</h2>
          <div className={styles.applicationWrapper}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.applicationForm}
              action="submit"
              noValidate
              encType="multipart/form-data"
            >
              <div className={styles.infoblock}>
                <div className={styles.info}>
                  <h3 className={styles.subtitle}>Об автомобиле</h3>
                  <label className={styles.textAreaTitle} htmlFor="carModel">
                    Марка и модель
                  </label>
                  <input
                    {...register('carModel', {
                      required: 'Это поле обязательно для заполнения',
                      maxLength: {
                        value: 50,
                        message: 'Текст должен быть не длиннее 50 символов',
                      },
                    })}
                    className={
                      errors.carModel
                        ? `${styles.formText} ${styles.formTextActive}`
                        : styles.formText
                    }
                    type="text"
                    name="carModel"
                    id="carModel"
                    placeholder="BMW i5 M60 xDrive"
                  />
                  <span className={styles.error}>
                    {errors?.carModel && errors.carModel.message}
                  </span>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.subtitle}>О вас</h3>
                  <label className={styles.textAreaTitle} htmlFor="tel">
                    Номер телефона
                  </label>
                  <input
                    {...register('tel', {
                      required: 'Это поле обязательно для заполнения',
                      pattern: {
                        value: REGEXP_PHONE_NUMBER,
                        message: 'Телефон не соответствует требуемому формату',
                      },
                    })}
                    className={
                      errors.tel
                        ? `${styles.formText} ${styles.formTextActive}`
                        : styles.formText
                    }
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="+7 900 000 00 00"
                    required
                  />
                  <span className={styles.error}>
                    {errors?.tel && errors.tel.message}
                  </span>
                </div>
              </div>
              <h3 className={styles.subtitle}>Опишите, что случилось</h3>
              <div className={styles.textareaWrapper}>
                <textarea
                  {...register('problemDescription', {
                    required: 'Это поле обязательно для заполнения',
                    maxLength: {
                      value: 220,
                      message: 'Текст должен быть не длиннее 220 символов',
                    },
                  })}
                  className={
                    errors.problemDescription
                      ? `${styles.formText} ${styles.formTextActive}`
                      : styles.formText
                  }
                  wrap="soft"
                  name="problemDescription"
                  id="problemDescription"
                  placeholder="Что-то стучит, когда еду..."
                />
                <span className={`${styles.error} ${styles.errorTextarea}`}>
                  {errors?.problemDescription && errors.problemDescription.message}
                </span>
              </div>
              <h3 className={styles.subtitle}>Прикрепите фотографии поломки</h3>
              <h4 className={styles.textRemark}>(по возможности)</h4>
              <DragAndDrop onFilesChanged={handleFilesDrop} />
              <fieldset className={styles.personalData}>
                {checkboxes.map((checkbox, index) => {
                  return (
                    <Checkbox
                      key={checkbox.name}
                      isChecked={checkbox.checked}
                      label={checkbox.name}
                      checkHandler={() => onHandleChange(index)}
                      index={index}
                    />
                  );
                })}
              </fieldset>
              <button
                className={
                  !isValid || checkboxes.some((checkbox) => !checkbox.checked)
                    ? `${styles.submitButton} ${styles.submitButtonDisable}`
                    : styles.submitButton
                }
                type="submit"
                disabled={!isValid}
                onClick={onClick}
              >
                Отправить заявку
              </button>
            </form>
            {width >= 900 ? (
              <article className={styles.card}>
                <h3 className={styles.subtitle}>Автосервис</h3>
                <ServiceCard
                  image={applicationService.company.logo}
                  id={applicationService.company.id}
                  title={applicationService.company.title}
                  rating={applicationService.rating}
                  votes={applicationService.votes}
                  address={applicationService.address}
                  workingTime={applicationService.working_time_today}
                />
              </article>
            ) : (
              <span />
            )}
          </div>
        </section>
      )}
      {isSubmitSuccessful && <ApplicationAcceptPopup isOpen={isOpen} onClose={onClose} />}
    </div>
  );
}

export default ApplicationPage;
