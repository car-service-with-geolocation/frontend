/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import BestServiceCard from '../../components/BestServiceCard/BestServiceCard';
import BestServiceCardMini from '../../components/BestServiceCardMini/BestServiceCardMini';
import Checkbox from '../../components/Checkbox/Checkbox';
import ApplicationAcceptPopup from '../../components/Popups/ApplicationAcceptPopup/ApplicationAcceptPopup';
import Preloader from '../../components/Preloader/Preloader';
import ProgressbarPreloader from '../../components/Preloader/ProgressbarPreloader/ProgressbarPreloader';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAutoServiceId } from '../../store/autoServiceIdSlice';
import { allCheckboxes, baseUrl, REGEXP_PHONE_NUMBER } from '../../utils/constants';
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
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { width } = useWindowWidth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false); // когда handleOnSubmit переместим в store, переделаю логику появления попапа в зависимости от статуса ответа сервера

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

  const setImagePreloader = () => {
    setIsLoading(true);
    setIsImageLoaded(false);
  };
  const removeImagePreloader = () => {
    setIsLoading(false);
    setIsImageLoaded(true);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setImagePreloader();
    if (files && acceptedFiles) {
      const alreadyAddedFiles = acceptedFiles.filter((file) =>
        files.find((f) => f.name === file.name)
      );

      if (alreadyAddedFiles.length > 0) {
        removeImagePreloader();
        setErrorMsg('Вы уже добавили такой файл');
      } else {
        const newFiles = [
          ...files,
          ...acceptedFiles.slice(0, 5 - files.length).map((file) => {
            const fileWithPreview = Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
            return fileWithPreview;
          }),
        ];
        if (files.length + acceptedFiles.length > 5) {
          removeImagePreloader();
          setErrorMsg('Вы можете загрузить только 5 фотографий');
        } else {
          setFiles(newFiles);
          removeImagePreloader();
          setErrorMsg('');
        }
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const thumbs = files.map((file, index) => (
    <div className={styles.imagePreviewContainer} key={file.name}>
      {isLoading || !isImageLoaded ? (
        <ProgressbarPreloader />
      ) : (
        <>
          <img
            src={file.preview}
            className={styles.imagePreview}
            alt="фотография поломки"
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className={styles.deleteButtonContainer}>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setFiles((files) => files.filter((_, i) => i !== index));
                setErrorMsg('');
              }}
            />
          </div>
        </>
      )}
    </div>
  ));

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
      const token = localStorage.getItem('JWT');
      // const formData = new FormData();
      // formData.append('carModel', data.carModel);
      // formData.append('tel', data.tel);
      // formData.append('problemDescription', data.problemDescription);

      files.forEach((file) => {
        // formData.append(`images[${index}]`, file);
        // formData.append('images', file);
        data.images.push(file);
      });

      const response = await fetch(`${baseUrl}orders/`, {
        method: 'POST',
        // body: formData,
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          authorization: `Token ${token}`,
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (response.ok) {
        setIsSubmitSuccessful(true); // Display the Successful-Popup
      } else {
        throw new Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<IApplicationData> = (data) => {
    handleOnSubmit(data);
  };

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview)); // To revoke the Object URL to avoid memory leaks
      setIsLoading(false);
      setIsImageLoaded(true);
    },
    [files]
  );

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
            <BestServiceCardMini
              image={applicationService.company.logo}
              id={applicationService.company.id}
              title={applicationService.company.title}
              rating={applicationService.rating}
              votes={applicationService.votes}
              address={applicationService.address}
              openfrom={applicationService.openfrom}
              openuntil={applicationService.openuntil}
            />
          )}

          <div className={`${styles.ellipse} ${styles.ellipse1}`} />
          <div className={`${styles.ellipse} ${styles.ellipse2}`} />
          <div className={`${styles.ellipse} ${styles.ellipse3}`} />

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
              <div className={styles.imageInputsContainer}>
                <div
                  {...getRootProps()}
                  className={
                    isDragActive
                      ? `${styles.dragAndDropInput} ${styles.dragAndDropInputActive}`
                      : styles.dragAndDropInput
                  }
                >
                  <input {...getInputProps()} type="file" name="images" multiple />
                  <p className={`${styles.textRemark} ${styles.textRemarkInput}`}>
                    Добавить фото
                  </p>
                  {width >= 600 ? (
                    <p className={styles.textRemark}>Можно перетащить его в эту рамку</p>
                  ) : (
                    <span />
                  )}
                </div>
                <aside className={styles.imageInputsContainer}>{thumbs}</aside>
                <span className={styles.errorImage}>{errorMsg}</span>
              </div>
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
                <BestServiceCard
                  image={applicationService.company.logo}
                  id={applicationService.company.id}
                  title={applicationService.company.title}
                  rating={applicationService.rating}
                  votes={applicationService.votes}
                  address={applicationService.address}
                  openfrom={applicationService.openfrom}
                  openuntil={applicationService.openuntil}
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
