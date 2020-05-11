import { ColumnValuePair } from './sqlClient';
import { Contact } from '../schema/data-types';

export const toContact = (data: ColumnValuePair): Contact =>
	Object.keys(data).reduce((acc: any, cur: string) => {
		if (!data[cur]) return acc;
		if (cur.indexOf(':') > -1) {
			const [x, y] = cur.split(':');
			return {
				...acc,
				[x]: {
					...acc[x],
					[y]: data[cur]
				}
			};
		} else {
			return {
				...acc,
				[cur]: data[cur]
			};
		}
	}, {}) as Contact;