import card1 from '../images/bestService-card1.png';
import card2 from '../images/bestService-card2.png';
import card3 from '../images/bestService-card3.png';
import card4 from '../images/bestService-card4.png';
import card5 from '../images/bestService-card5.png';
import card6 from '../images/bestService-card6.png';
import card7 from '../images/bestService-card7.jpg';
import card8 from '../images/bestService-card8.jpg';
import card9 from '../images/bestService-card9.jpg';
import card10 from '../images/bestService-card10.jpg';
import card11 from '../images/bestService-card11.jpg';
import card12 from '../images/bestService-card12.jpg';
import card13 from '../images/bestService-card13.jpg';
import card14 from '../images/bestService-card14.jpg';
import card15 from '../images/bestService-card15.jpg';
import card16 from '../images/bestService-card16.jpg';
import card17 from '../images/bestService-card17.jpg';
import card18 from '../images/bestService-card18.jpg';
import card19 from '../images/bestService-card19.jpg';
import card20 from '../images/bestService-card20.jpg';
import card21 from '../images/bestService-card21.jpg';
import card22 from '../images/bestService-card22.jpg';
import card23 from '../images/bestService-card23.jpg';
import card24 from '../images/bestService-card24.jpg';

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

const services = [
  {
    id: 1,
    image: card1,
    title: 'LR Premium',
    rating: '5.0',
    votes: 156,
    address: 'Пушкина ул. 27А',
    openfrom: '9',
    openuntil: '00',
    coords: [55.800584, 37.675638],
  },
  {
    id: 2,
    image: card2,
    title: 'Cool service',
    rating: '5.0',
    votes: 99,
    address: 'Киевская ул.14, подъезд 2',
    openfrom: '10',
    openuntil: '20',
    coords: [55.716733, 37.589988],
  },
  {
    id: 3,
    image: card3,
    title: 'Билпрайм',
    rating: '4.9',
    votes: 65,
    address: 'Садовая кудринская пер. 2',
    openfrom: '10',
    openuntil: '21',
    coords: [55.793559, 37.435983],
  },
  {
    id: 4,
    image: card4,
    title: 'Win-СТО',
    rating: '4.9',
    votes: 50,
    address: 'Московский проспект, 7А',
    openfrom: '10',
    openuntil: '22',
    coords: [55.780898, 37.642889],
  },
  {
    id: 5,
    image: card5,
    title: 'Авто ВСВ',
    rating: '5.0',
    votes: 60,
    address: 'Ул. Главная, 99',
    openfrom: '10',
    openuntil: '23',
    coords: [55.744522, 37.616378],
  },
  {
    id: 6,
    image: card6,
    title: 'Auto car',
    rating: '4.9',
    votes: 105,
    address: 'Ул. Центральная, 23',
    openfrom: '10',
    openuntil: '21',
    coords: [55.763338, 37.565467],
  },
  {
    id: 7,
    image: card7,
    title: 'LR Premium',
    rating: '5.0',
    votes: 156,
    address: 'Пушкина ул. 27А',
    openfrom: '9',
    openuntil: '00',
    coords: [55.763338, 37.565466],
  },
  {
    id: 8,
    image: card8,
    title: 'Cool service',
    rating: '5.0',
    votes: 99,
    address: 'Киевская ул.14, подъезд 2',
    openfrom: '10',
    openuntil: '20',
    coords: [55.831903, 37.411961],
  },
  {
    id: 9,
    image: card9,
    title: 'Билпрайм',
    rating: '4.9',
    votes: 65,
    address: 'Садовая кудринская пер. 2',
    openfrom: '10',
    openuntil: '21',
    coords: [55.631903, 37.511961],
  },
  {
    id: 10,
    image: card10,
    title: 'Win-СТО',
    rating: '4.9',
    votes: 50,
    address: 'Московский проспект, 7А',
    openfrom: '10',
    openuntil: '22',
    coords: [55.891903, 37.451961],
  },
  {
    id: 11,
    image: card11,
    title: 'Авто ВСВ',
    rating: '5.0',
    votes: 60,
    address: 'Ул. Главная, 99',
    openfrom: '10',
    openuntil: '23',
    coords: [55.839903, 37.419961],
  },
  {
    id: 12,
    image: card12,
    title: 'Auto car',
    rating: '4.9',
    votes: 105,
    address: 'Ул. Центральная, 23',
    openfrom: '10',
    openuntil: '21',
    coords: [55.331903, 37.211961],
  },
  {
    id: 13,
    image: card13,
    title: 'LR Premium',
    rating: '5.0',
    votes: 156,
    address: 'Пушкина ул. 27А',
    openfrom: '9',
    openuntil: '00',
    coords: [55.231903, 37.111961],
  },
  {
    id: 14,
    image: card14,
    title: 'Cool service',
    rating: '5.0',
    votes: 99,
    address: 'Киевская ул.14, подъезд 2',
    openfrom: '10',
    openuntil: '20',
    coords: [56.831903, 38.411961],
  },
  {
    id: 15,
    image: card15,
    title: 'Билпрайм',
    rating: '4.9',
    votes: 65,
    address: 'Садовая кудринская пер. 2',
    openfrom: '10',
    openuntil: '21',
    coords: [55.898903, 37.445961],
  },
  {
    id: 16,
    image: card16,
    title: 'Win-СТО',
    rating: '4.9',
    votes: 50,
    address: 'Московский проспект, 7А',
    openfrom: '10',
    openuntil: '22',
    coords: [55.831903, 37.411961],
  },
  {
    id: 17,
    image: card17,
    title: 'Авто ВСВ',
    rating: '5.0',
    votes: 60,
    address: 'Ул. Главная, 99',
    openfrom: '10',
    openuntil: '23',
    coords: [55.831903, 37.411961],
  },
  {
    id: 18,
    image: card18,
    title: 'Auto car',
    rating: '4.9',
    votes: 105,
    address: 'Ул. Центральная, 23',
    openfrom: '10',
    openuntil: '21',
    coords: [55.831903, 37.411961],
  },
  {
    id: 19,
    image: card19,
    title: 'LR Premium',
    rating: '5.0',
    votes: 156,
    address: 'Пушкина ул. 27А',
    openfrom: '9',
    openuntil: '00',
    coords: [55.793559, 37.435983],
  },
  {
    id: 20,
    image: card20,
    title: 'Cool service',
    rating: '5.0',
    votes: 99,
    address: 'Киевская ул.14, подъезд 2',
    openfrom: '10',
    openuntil: '20',
    coords: [55.793559, 37.435983],
  },
  {
    id: 21,
    image: card21,
    title: 'Билпрайм',
    rating: '4.9',
    votes: 65,
    address: 'Садовая кудринская пер. 2',
    openfrom: '10',
    openuntil: '21',
    coords: [55.793559, 37.435983],
  },
  {
    id: 22,
    image: card22,
    title: 'Win-СТО',
    rating: '4.9',
    votes: 50,
    address: 'Московский проспект, 7А',
    openfrom: '10',
    openuntil: '22',
    coords: [55.793559, 37.435983],
  },
  {
    id: 23,
    image: card23,
    title: 'Авто ВСВ',
    rating: '5.0',
    votes: 60,
    address: 'Ул. Главная, 99',
    openfrom: '10',
    openuntil: '23',
    coords: [55.793559, 37.435983],
  },
  {
    id: 24,
    image: card24,
    title: 'Auto car',
    rating: '4.9',
    votes: 105,
    address: 'Ул. Центральная, 23',
    openfrom: '10',
    openuntil: '21',
    coords: [55.793559, 37.435983],
  },
];

export {
  DADATA_API,
  DADATA_API_KEY,
  DADATA_SECRET_KEY,
  immediateOptions,
  navigatorOptions,
  options,
  services,
  YMAP_API_KEY,
  YMAP_VERSION,
};
