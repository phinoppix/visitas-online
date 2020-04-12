import { TediousType } from 'tedious';

export enum RequestParameterDirection {
  Input,
  Output
}

export interface RowData {
  [key: string]: {
    value: any,
    metadata: any
  }
}

export interface RequestParameter {
  name: string;
  value: any;
  type?: TediousType;
  direction?: RequestParameterDirection;
}

export const rowDataToKeyValue = (row: RowData) => Object.keys(row)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: row[cur].value
  }), {});

// export const isNil = (value: any): boolean => value === null || value === undefined;

// export const isString = (value: any): boolean => value &&
//   (typeof value === "string" || value.toLowerCase);

export const isInteger = (value: any): boolean => Number.isInteger(value);

export const isFloat = (value: any): boolean => (typeof value === "number") && !Number.isInteger(value);

export const isBool = (value: any): boolean => value === true || value === false;