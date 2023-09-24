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

const baseUrl = 'https://car-service.hopto.org/api/v1/';

const servicesPerPage = 6;

export {
  DADATA_API,
  DADATA_API_KEY,
  DADATA_SECRET_KEY,
  immediateOptions,
  navigatorOptions,
  options,
  YMAP_API_KEY,
  YMAP_VERSION,
  servicesPerPage,
  baseUrl,
};
