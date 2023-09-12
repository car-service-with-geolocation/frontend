const options = [
  { value: 'Audi', label: 'Audi' },
  { value: 'Bmw', label: 'Bmw' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Nissan', label: 'Nissan' },
  { value: 'Skoda', label: 'Skoda' },
  { value: 'Volkswagen', label: 'Volkswagen' },
  { value: 'Kia', label: 'Kia' },
];

// Где это хранить будем? env?
const DADATA_API_KEY = '0325ce9d087935d231fdbc114c0d0d7f01a91a55';
const DADATA_SECRET_KEY = 'b11745967cf24fc3ace726d8e8b590f8084cc548';
const DADATA_API =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

const navigatorOptions = {
  enableHighAcuracy: true,
  maximumAge: 1000,
  timeout: 3600,
};

export { DADATA_API, DADATA_API_KEY, DADATA_SECRET_KEY, navigatorOptions, options };
