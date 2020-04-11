import { GeoCoordinates, Stamp } from './data-types';

export type MutationResolver<R, A, O> = (root: R, args: A) => O;

export interface MutationResponse {
  status: string;
  error?: string;
}

export interface InputAddCongregation {
  code: string;
  name: string;
}

export interface InputUpsertTerritory {
  code: string;
  name: string;
  boundaries: GeoCoordinates[]
  updated: Stamp
}

export interface InputUpsertContact {
  name: string;
  full_address?: string;
  location_data?: string;
  status: string;
  remarks?: string;
  congregation?: {
    code: string;
  };
  updated: Stamp
}
