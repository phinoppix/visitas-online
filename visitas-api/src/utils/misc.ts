import { slice } from 'ramda';

import { RowData } from './sqlClient';

// export const isNil = (value: any): boolean => value === null || value === undefined;

// export const isString = (value: any): boolean => value &&
//   (typeof value === "string" || value.toLowerCase);


export const isInteger = (value: any): boolean => Number.isInteger(value);

export const isFloat = (value: any): boolean => (typeof value === "number") && !Number.isInteger(value);

export const isBool = (value: any): boolean => value === true || value === false;

export interface ColumnPredicates {
	[key: string]: (value: any) => any
}

export const jsonColumnPredicate = (value: any) => JSON.parse(value);

export const rowDataToColumnValuePair = (columnPredicates?: ColumnPredicates) => (row: RowData | undefined) => row && Object.keys(row)
	.reduce((acc, cur) => ({
		...acc,
		[cur]: columnPredicates && columnPredicates[cur] ? columnPredicates[cur](row[cur].value) : row[cur].value
	}), {}) as { [key: string]: any };

export const firstSlice = slice(0, 1);
