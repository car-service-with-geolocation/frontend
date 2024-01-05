import image02 from '../images/bestService-card10.jpg';
import image03 from '../images/bestService-card11.jpg';
import image04 from '../images/bestService-card12.jpg';
import image05 from '../images/bestService-card13.jpg';
import image06 from '../images/bestService-card14.jpg';
import image01 from '../images/bestService-card15.jpg';
import image07 from '../images/bestService-card16.jpg';
import image08 from '../images/bestService-card17.jpg';
import { TImidiatevalue } from './types';

const immediateOptions: TImidiatevalue[] = [
  { value: 'Сначала ближайшие', label: 'Сначала ближайшие' },
  { value: 'По рейтингу', label: 'По рейтингу' },
];

const reviewOptions: TImidiatevalue[] = [
  { value: 'Сначала положительные', label: 'Сначала положительные' },
  { value: 'Сначала отрицательные', label: 'Сначала отрицательные' },
];

// Где это хранить будем? env?
const YMAP_API_KEY = '4280dfdd-134d-4d56-8683-e770e6093797&lang=ru_RU';
const YMAP_VERSION = '2.1.79';
const DADATA_API_KEY = '0325ce9d087935d231fdbc114c0d0d7f01a91a55';
const DADATA_SECRET_KEY = 'b11745967cf24fc3ace726d8e8b590f8084cc548';
const DADATA_API =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

const navigatorOptions = {
  enableHighAcuracy: true,
  maximumAge: 1000,
  timeout: 3600,
};

const baseUrl = 'https://find-car-service.ru/api/v1/';

const servicesPerPage = 6;
const userRequestPerPage = 5;

const allCheckboxes = [
  { name: 'Даю согласие на обработку персональных данных', checked: true },
];

const initialFeedBack = [
  {
    name: 'Михаил',
    id: 1,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 1, alt: 'alt' },
      { image: image02, id: 2, alt: 'alt' },
      { image: image03, id: 3, alt: 'alt' },
      { image: image04, id: 4, alt: 'alt' },
      { image: image05, id: 12, alt: 'alt' },
      { image: image06, id: 13, alt: 'alt' },
      { image: image07, id: 121, alt: 'alt' },
      { image: image08, id: 133, alt: 'alt' },
    ],
  },
  {
    name: 'Виталий',
    id: 2,
    date: '13.10.2022',
    rating: 2.2,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 5, alt: 'alt' },
      { image: image02, id: 6, alt: 'alt' },
      { image: image06, id: 13, alt: 'alt' },
      { image: image07, id: 121, alt: 'alt' },
    ],
  },
  {
    name: 'Евгений',
    date: '13.10.2022',
    id: 3,
    rating: 0,
    feedBack:
      'Этот сервис стал моим надежным партнером в обслуживании моего Mercedes-Benz. Они всегда выполняют работу вовремя и держат меня в курсе. Особенно удобно, что я могу записаться онлайн и выбрать удобное время.',
    photos: [],
  },
  {
    name: 'Дмитрий',
    date: '13.10.2022',
    id: 4,
    rating: 5,
    feedBack:
      'Цены адекватные, не завышенные. Я оцениваю их прозрачность в финансовых вопросах.',
    photos: [{ image: image01, id: 7, alt: 'alt' }],
  },
  {
    name: 'Кирилл',
    date: '23.07.2023',
    id: 5,
    rating: 1.3,
    feedBack:
      'Замечательный сервис! Давно искал надежное место для обслуживания моего BMW.',
    photos: [
      { image: image01, id: 8, alt: 'alt' },
      { image: image02, id: 9, alt: 'alt' },
      { image: image03, id: 10, alt: 'alt' },
      { image: image04, id: 11, alt: 'alt' },
      { image: image05, id: 12, alt: 'alt' },
      { image: image06, id: 13, alt: 'alt' },
      { image: image07, id: 121, alt: 'alt' },
      { image: image08, id: 133, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 6,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 14, alt: 'alt' },
      { image: image02, id: 15, alt: 'alt' },
      { image: image03, id: 16, alt: 'alt' },
      { image: image04, id: 17, alt: 'alt' },
      { image: image05, id: 12, alt: 'alt' },
      { image: image06, id: 13, alt: 'alt' },
      { image: image07, id: 121, alt: 'alt' },
      { image: image08, id: 133, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 7,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 18, alt: 'alt' },
      { image: image02, id: 19, alt: 'alt' },
      { image: image03, id: 20, alt: 'alt' },
      { image: image04, id: 21, alt: 'alt' },
      { image: image05, id: 12, alt: 'alt' },
      { image: image06, id: 13, alt: 'alt' },
      { image: image07, id: 121, alt: 'alt' },
      { image: image08, id: 133, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 8,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 22, alt: 'alt' },
      { image: image02, id: 23, alt: 'alt' },
      { image: image03, id: 24, alt: 'alt' },
      { image: image04, id: 25, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 9,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 26, alt: 'alt' },
      { image: image02, id: 27, alt: 'alt' },
      { image: image03, id: 28, alt: 'alt' },
      { image: image04, id: 29, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 10,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 30, alt: 'alt' },
      { image: image02, id: 31, alt: 'alt' },
      { image: image03, id: 32, alt: 'alt' },
      { image: image04, id: 33, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 11,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 34, alt: 'alt' },
      { image: image02, id: 35, alt: 'alt' },
      { image: image03, id: 36, alt: 'alt' },
      { image: image04, id: 37, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 12,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 38, alt: 'alt' },
      { image: image02, id: 39, alt: 'alt' },
      { image: image03, id: 40, alt: 'alt' },
      { image: image04, id: 41, alt: 'alt' },
    ],
  },
  {
    name: 'Михаил',
    id: 13,
    date: '13.10.2022',
    rating: 4.4,
    feedBack:
      'Отличный сервис! Я обращался с проблемой в трансмиссии моего Audi A6, и они справились с этим оперативно и профессионально. Персонал был очень вежливым и объяснил мне, что было сделано. Автомобиль теперь ездит как новый!',
    photos: [
      { image: image01, id: 42, alt: 'alt' },
      { image: image02, id: 43, alt: 'alt' },
      { image: image03, id: 44, alt: 'alt' },
      { image: image04, id: 45, alt: 'alt' },
    ],
  },
];

const REGEXP_EMAIL =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const REGEXP_PHONE_NUMBER = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

export {
  allCheckboxes,
  baseUrl,
  DADATA_API,
  DADATA_API_KEY,
  DADATA_SECRET_KEY,
  immediateOptions,
  initialFeedBack,
  navigatorOptions,
  REGEXP_EMAIL,
  REGEXP_PHONE_NUMBER,
  reviewOptions,
  servicesPerPage,
  userRequestPerPage,
  YMAP_API_KEY,
  YMAP_VERSION,
};
