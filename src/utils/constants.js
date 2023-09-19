const options = [
  { value: 'Audi', label: 'Audi' },
  { value: 'Bmw', label: 'Bmw' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Nissan', label: 'Nissan' },
  { value: 'Skoda', label: 'Skoda' },
  { value: 'Volkswagen', label: 'Volkswagen' },
  { value: 'Kia', label: 'Kia' },
];

const immediateOptions = [
  { value: 'Сначала ближайшие', label: 'Сначала ближайшие' },
  { value: 'По рейтингу', label: 'По рейтингу' },
];

const clusterPoints = [
  {
    title: 'Placemark 1',
    descr: 'Some description',
    coords: [55.831903, 37.411961],
    id: '1',
  },
  {
    title: 'Placemark 2',
    descr: 'Some description',
    coords: [55.763338, 37.565466],
    id: '2',
  },
  {
    title: 'Placemark 3',
    descr: 'Some description',
    coords: [55.763338, 37.565467],
    id: '3',
  },
  {
    title: 'Placemark 4',
    descr: 'Some description',
    coords: [55.744522, 37.616378],
    id: '4',
  },
  {
    title: 'Placemark 5',
    descr: 'Some description',
    coords: [55.780898, 37.642889],
    id: '5',
  },
  {
    title: 'Placemark 6',
    descr: 'Some description',
    coords: [55.793559, 37.435983],
    id: '6',
  },
  {
    title: 'Placemark 7',
    descr: 'Some description',
    coords: [55.800584, 37.675638],
    id: '7',
  },
  {
    title: 'Placemark 8',
    descr: 'Some description',
    coords: [55.716733, 37.589988],
    id: '8',
  },
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

export {
  clusterPoints,
  DADATA_API,
  DADATA_API_KEY,
  DADATA_SECRET_KEY,
  immediateOptions,
  navigatorOptions,
  options,
  YMAP_API_KEY,
  YMAP_VERSION,
};
