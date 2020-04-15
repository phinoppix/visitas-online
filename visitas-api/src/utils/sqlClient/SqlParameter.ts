import { TediousType } from 'tedious';

export enum ParameterDirection {
  Input,
  Output
}

export default interface SqlParameter {
  name: string;
  value: any;
  type?: TediousType;
  direction?: ParameterDirection;
}