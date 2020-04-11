export interface Stamp {
  by: string;
  date: Date;
}

export interface IStampableEntity {
  created?: Stamp;
  updated?: Stamp;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Congregation extends IStampableEntity {
  code: string;
  name?: string;
  territories?: Territory[];
  aggregates?: {
    countTerritories: number;
  }
}

export interface Contact extends IStampableEntity {
  name: string;
  full_address?: string;
  location_data?: string;
  status: string;
  remarks?: string;
  territory?: Territory;
  congregation?: Congregation;
}

export interface CheckoutEntry extends IStampableEntity {
  userId: string
  checkOut?: string
  checkIn?: string
}

export interface Territory extends IStampableEntity {
  code: string;
  name?: string;
  boundaries: GeoCoordinates[];
  congregation: Congregation;
  contacts?: Contact[];
  checkouts?: CheckoutEntry[];
  aggregates?: {
    countContacts: number;
    checkedOut: string;
  }
  campaign?: {
    name: string;
    starts: string;
    ends: string;
  };
  valid: boolean;
}
