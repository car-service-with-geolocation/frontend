// import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  REGEXP_PHONE_NUMBER,
} from '../../utils/constants';
import FieldsetAutoserviceAdress from '../FieldsetAutoserviceAdress/FieldsetAutoserviceAdress';
// import { useAppDispatch, useAppSelector } from '../../store';
import FieldsetAutoserviceCTAbtn from '../FieldsetAutoserviceCTAbtn/FieldsetAutoserviceCTAbtn';
import FieldsetAutoserviceData from '../FieldsetAutoserviceData/FieldsetAutoserviceData';
import FieldsetAutoserviceDescript from '../FieldsetAutoserviceDescript/FieldsetAutoserviceDescript';
import FieldsetAutoserviceImgUpload from '../FieldsetAutoserviceImgUpload/FieldsetAutoserviceImgUpload';
import styles from './styles/styles.module.css';

const fileSchema = z
  .custom<File>()
  .refine((file: File) => file instanceof File, 'Файл должен быть картинкой')
  .refine((file: File) => file?.size <= MAX_FILE_SIZE.value, MAX_FILE_SIZE.message)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.types.includes(file.type),
    ACCEPTED_IMAGE_TYPES.message
  );

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
  autoservice_img: z.array(fileSchema).max(10, 'Возможное колличество фото не больше 10'),
  autoservice_phone_cta: z
    .string()
    .regex(REGEXP_PHONE_NUMBER, { message: 'Телефон указан не корректно' }),
  autoservice_telegram: z.string().url({ message: 'Не верный формат ссылки' }),
  autoservice_whatsapp: z.string().url({ message: 'Не верный формат ссылки' }),
  autoservice_viber: z.string().url({ message: 'Не верный формат ссылки' }),
  autoservice_geoloc: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
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
      autoservice_img: [],
    },
    mode: 'onChange',
  });

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
          <FieldsetAutoserviceCTAbtn />
          <FieldsetAutoserviceDescript />
          <FieldsetAutoserviceAdress />
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
