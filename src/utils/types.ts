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

// AUTH
export type TInitialState = {
  email?: null | string;
  id?: null | number;
  status: null | string;
  error: undefined | string | null;
  isLoggedIn: boolean;
  first_name: string | null;
  date_joined: string | null;
  phone_number: null | string;
};

export type TresLogin = {
  token: string;
};

export type TpropsLogin = {
  email: string;
  password: string;
};

export type TpropsRegistration = {
  email: string;
  password: string;
  first_name: string;
};

export type TresRegistration = {
  id: number;
  email: string;
  first_name: string;
  phone_number: string | null;
  date_joined: string;
};

// AUTH
