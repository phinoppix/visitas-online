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

export interface Division extends IStampableEntity {
  id: string;
  code?: string;
  name?: string;
  territories?: Territory[];
  aggregates?: {
    countTerritories: number;
  }
}

export interface Contact extends IStampableEntity {
	id?: string;
  name: string;
  full_address?: string;
  contact_info?: ContactInfo;
  location_data?: string;
  remarks?: string;
  territory?: Territory;
  division?: Division;
  tags?: string[];
}

export interface ContactInfo {
  phoneNumber?: string;
  email?: string;
}

export interface CheckoutEntry extends IStampableEntity {
  userId: string
  checkOut?: string
  checkIn?: string
}

export interface Territory extends IStampableEntity {
  id: string;
  code?: string;
  name?: string;
  boundaries?: GeoCoordinates[];
  division?: Division;
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
  valid?: boolean;
}

export interface Tag {
	tag: string;
}