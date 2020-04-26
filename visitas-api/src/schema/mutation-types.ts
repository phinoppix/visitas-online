import { GeoCoordinates, Stamp, Tag } from './data-types';

export type MutationResolver<R, A, O> = (root: R, args: A) => O;

export interface MutationResponse {
  status: string;
  error?: string;
}

export interface InputAddDivision {
  code: string;
  name: string;
}

export interface InputUpsertTerritory {
  id: string;
  code: string;
  name: string;
  boundaries: GeoCoordinates[]
  updated: Stamp
}

export interface InputUpsertContact {
  id?: string;
  name: string;
  full_address?: string;
  location_data?: string;
  phoneNumber?: string;
	email?: string;
  remarks?: string;
  tags?: string[];
}
