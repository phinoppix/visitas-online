// export const isNil = (value: any): boolean => value === null || value === undefined;

// export const isString = (value: any): boolean => value &&
//   (typeof value === "string" || value.toLowerCase);

import { RowData } from './sqlClient/types';

export const isInteger = (value: any): boolean => Number.isInteger(value);

export const isFloat = (value: any): boolean => (typeof value === "number") && !Number.isInteger(value);

export const isBool = (value: any): boolean => value === true || value === false;

export const rowDataToKeyValue = (row: RowData) => Object.keys(row)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: row[cur].value
  }), {});