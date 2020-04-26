import { omit } from 'ramda';

import { Contact } from '../schema/data-types';
import * as svc from '../services/contact';

const OMIT_COLS = ['phoneNumber', 'email'];

export const contactLoader = {
	getContactsPerDivision: async (divisionId: string): Promise<Contact[]> => {
		const rows = await svc.getContactsPerDivision(divisionId);
		const list = rows.map((c: any) => omit(OMIT_COLS, {
			...c,
			contact_info: {
				phoneNumber: c.phoneNumber,
				email: c.email
			}
		}));
		console.log('contact-loader/contactLoader@getContactsPerDivision', {
			divisionId,
			list
		});
		return list as Contact[];
	}
};