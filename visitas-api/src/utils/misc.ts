import * as R from 'ramda';

import { ColumnValuePair, RowData } from './sqlClient';

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

const customFromPairs = (columnPredicates?: ColumnPredicates) => (acc: any, cur: any[]) => {
	let [key, value] = cur;
	const v1 = (columnPredicates && columnPredicates[key]) ? columnPredicates[key](value) : value;
	if (key.indexOf(':') > -1) {
		const [k1, k2] = key.split(':');
		return {
			...acc,
			[k1]: {
				...acc[k1],
				[k2]: v1
			}
		}
	}
	return {
		...acc,
		[key]: v1
	};
}
export const sqlStreamAsJson = <T extends ColumnValuePair>(rows: RowData[], columnPredicates?: ColumnPredicates) => {
	const input = JSON.parse(
		''.concat(
			...(R.map(
				R.pipe(
					R.values,
					R.head,
					R.prop('value')
				), rows) as string[]))
	) as T[];

	return R.map(
		R.pipe(
			R.toPairs,
			R.reduce(customFromPairs(columnPredicates), {}),
		),
		input
	);
}

export const tagsColumnPredicate = {
	'tags': jsonColumnPredicate
};