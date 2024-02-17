// import { BaseSyntheticEvent, useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { REGEXP_PHONE_NUMBER } from '../../utils/constants';
import FieldsetAutoserviceData from '../FieldsetAutoserviceData/FieldsetAutoserviceData';
// import { useAppDispatch, useAppSelector } from '../../store';
// import FieldsetAutoserviceCTAbtn from '../FieldsetAutoserviceCTAbtn/FieldsetAutoserviceCTAbtn';
import FieldsetAutoserviceImgUpload from '../FieldsetAutoserviceImgUpload/FieldsetAutoserviceImgUpload';
// import FieldsetAutoserviceAdress from '../FieldsetAutoserviceAdress/FieldsetAutoserviceAdress';
// import FieldsetAutoserviceDescript from '../FieldsetAutoserviceDescript/FieldsetAutoserviceDescript';
import styles from './styles/styles.module.css';

// interface IAutoserviceInfoData {
//   autoservice_name: string;
//   autoservice_email: string;
//   autoservice_phone_number: string;
//   autoservice_work_time: string;
//   autoservice_site_url: string;
// }

// type TAutoserviceImgUpload {
//   autoservice_img: File[];
// }

// interface IAutoserviceInfoData {
//   autoservice_name: string;
//   autoservice_email: string;
//   autoservice_phone_number: string;
//   autoservice_work_time: string;
//   autoservice_site_url: string;
// }

const autoserviceSchema = z.object({
  autoservice_name: z
    .string()
    .min(3, { message: 'Имя должно быть не короче 3 символов' })
    .max(30, { message: 'Имя должно быть не длинее 30 символов' })
    .trim(),
  autoservice_email: z.string().email({ message: 'Email указан не корректно' }),
  autoservice_phone: z
    .string()
    .regex(REGEXP_PHONE_NUMBER, { message: 'Телефон указан не корректно' }),
  autoservice_work_time: z
    .object({
      day: z.union([
        z.literal('Понедельник'),
        z.literal('Вторник'),
        z.literal('Среда'),
        z.literal('Четверг'),
        z.literal('Пятница'),
        z.literal('Суббота'),
        z.literal('Воскресенье'),
      ]),
      time: z.string(),
    })
    .array()
    .max(6)
    .optional(),
  autoservice_site: z.string().url({ message: 'Адрес сайта указан не корректно' }),
  autoservice_img: z.any().optional(),
});

type TAutoserviceSchema = z.infer<typeof autoserviceSchema>;

function AutoserviceInfoData() {
  const methods = useForm<TAutoserviceSchema>({
    resolver: zodResolver(autoserviceSchema),
    defaultValues: {
      autoservice_name: 'Автосервис номер 1',
      autoservice_email: 'ayautoservice1@mail.ru',
      autoservice_phone: '+7 (969) 121-57-13',
      autoservice_work_time: [],
      autoservice_site: 'https://find-car-service.ru/',
    },
    mode: 'onChange',
  });
  //   const currentAutoserviceName = 'Автосервис номер 1';
  //   const currentAutoserviceEmail = 'ayautoservice1@mail.ru';
  //   const currentAutoservicePhone = '+7 (952) 210 49 96';
  //   const currentAutoserviceWorkTime = '+7 (952) 210 49 96';
  //   const currentAutoserviceSiteURL = '7736340111';
  // const currentImages: File[] = [];

  // const {
  // handleSubmit,
  // formState: { isValid, isDirty },
  // } = useForm<TFormValue>({
  // defaultValues: {
  //   autoservice_name: currentAutoserviceName,
  //   autoservice_email: currentAutoserviceEmail,
  //   autoservice_phone_number: currentAutoservicePhone,
  //   autoservice_work_time: currentAutoserviceWorkTime,
  //   autoservice_site_url: currentAutoserviceSiteURL,
  // },
  //   mode: 'onChange',
  // });

  const onSubmit: SubmitHandler<TAutoserviceSchema> = (data) => console.log(data);

  return (
    <div className={styles.autoservice__wrapper}>
      <FormProvider {...methods}>
        <form
          id="autoservice-profile-data-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          className={styles.form}
          action="submit"
          noValidate
        >
          <h1 className={styles.form__title}>Мой автосервис</h1>
          <FieldsetAutoserviceData />
          <FieldsetAutoserviceImgUpload />
          {/* <FieldsetAutoserviceCTAbtn /> */}
          {/* <FieldsetAutoserviceDescript /> */}
          {/* <FieldsetAutoserviceAdress /> */}
          <button
            // className={`${styles.btn} ${styles.btn_grid} ${
            //   isValid && isDirty ? '' : styles.btn_disabled
            // }`}
            className={styles.btn}
            type="submit"
            // disabled={!isValid || !isDirty}
          >
            Сохранить
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default AutoserviceInfoData;
