export interface Stamp {
  by: string;
  date: string;
}

export interface Congregation {
  code: string;
  name?: string;
}

export interface Territory {
  code: string;
  name?: string;
  congregation?: Congregation;
}

export interface Contact {
  name: string;
  full_address?: string;
  location_data?: string;
  status: string;
  remarks?: string;
  created?: Stamp;
  updated?: Stamp;
  territory?: Territory;
  congregation?: Congregation;
}