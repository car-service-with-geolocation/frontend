// import { BaseSyntheticEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FieldsetAutoserviceData from '../FieldsetAutoserviceData/FieldsetAutoserviceData';
// import { useAppDispatch, useAppSelector } from '../../store';
// import FieldsetAutoserviceCTAbtn from '../FieldsetAutoserviceCTAbtn/FieldsetAutoserviceCTAbtn';
// import FieldsetImgUpload from '../FieldsetAutoserviceImgUpload/FieldsetAutoserviceImgUpload';
// import FieldsetAutoserviceAdress from '../FieldsetAutoserviceAdress/FieldsetAutoserviceAdress';
// import FieldsetAutoserviceDescript from '../FieldsetAutoserviceDescript/FieldsetAutoserviceDescript';
import styles from './styles/styles.module.css';

interface IAutoserviceInfoData {
  autoservice_name: string;
  autoservice_email: string;
  autoservice_phone_number: string;
  autoservice_work_time: string;
  autoservice_site_url: string;
}

// type TAutoserviceImgUpload {
//   autoservice_img: File[];
// }

function AutoserviceInfoData() {
  const currentAutoserviceName = 'Автосервис номер 1';
  const currentAutoserviceEmail = 'ayautoservice1@mail.ru';
  const currentAutoservicePhone = '+7 (952) 210 49 96';
  const currentAutoserviceWorkTime = '+7 (952) 210 49 96';
  const currentAutoserviceSiteURL = '7736340111';
  // const currentImages: File[] = [];

  const {
    // register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<IAutoserviceInfoData>({
    defaultValues: {
      autoservice_name: currentAutoserviceName,
      autoservice_email: currentAutoserviceEmail,
      autoservice_phone_number: currentAutoservicePhone,
      autoservice_work_time: currentAutoserviceWorkTime,
      autoservice_site_url: currentAutoserviceSiteURL,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IAutoserviceInfoData> = (data) => console.log(data);

  return (
    <div className={styles.autoservice__wrapper}>
      <form
        id="autoservice-profile-data-form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        action="submit"
        noValidate
      >
        <h1 className={styles.form__title}>Мой автосервис</h1>
        <FieldsetAutoserviceData />
        {/* <FieldsetAutoserviceImgUpload /> */}
        {/* <FieldsetAutoserviceCTAbtn /> */}
        {/* <FieldsetAutoserviceDescript /> */}
        {/* <FieldsetAutoserviceAdress /> */}
        <button
          className={`${styles.btn} ${styles.btn_grid} ${
            isValid && isDirty ? '' : styles.btn_disabled
          }`}
          type="submit"
          // disabled={!isValid || !isDirty}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default AutoserviceInfoData;
