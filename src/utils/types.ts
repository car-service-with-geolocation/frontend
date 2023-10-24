export type TService = {
  id: number;
  company: Company;
  geolocation: Geolocation;
  city: string;
  address: string;
  rating: number;
  votes: number;
  openfrom: string;
  openuntil: string;
  holidays: null | string;
  phone_number: null | string;
  email: null | string;
  site: string;
  car_service: string[];
  job: string[];
};

type Company = {
  id: number;
  title: string;
  description: string;
  logo: string;
  legal_address: string;
};

export type Geolocation = {
  latitude: number;
  longitude: number;
};

export type TCar = {
  id: number;
  brand: string;
  slug: string;
};

export type TImidiatevalue = {
  value: string;
  label: string;
};

export type TCoord = {
  lat: number;
  lon: number;
};

export type TUserData = {
  email: string;
  name: string;
  car: TCar;
  password: string;
};
