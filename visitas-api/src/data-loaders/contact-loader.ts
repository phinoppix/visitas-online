import {pipe, map} from 'ramda';

import { Contact } from '../schema/data-types';
import * as svc from '../services/contact';
import { tagsColumnPredicate, toContact } from '../utils/contact-utils';
import { rowDataToColumnValuePair } from '../utils/misc';

export const contactLoader = {
	getContactsPerDivision: async (divisionId: string): Promise<Contact[]> => {
		const rows = await svc.getContactsPerDivision(divisionId);
		const output = pipe(
			map(rowDataToColumnValuePair(tagsColumnPredicate)),
			map(r => toContact(r, undefined, divisionId))
		)(rows);
		console.log('contactLoader@getContactsPerDivision', {rows, output});
		return output;
	}
};