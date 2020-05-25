import { Contact, ContactsFilter } from '../schema/data-types';
import * as svc from '../services/contact';
import { sqlStreamAsJson, tagsColumnPredicate } from '../utils/misc';

export const contactLoader = {
	getContactsPerDivision: async (divisionId: string, filter: ContactsFilter): Promise<Contact[]> => {
		const rows = await svc.getContactsPerDivision(divisionId, filter);
		return rows.length === 0 ? [] : sqlStreamAsJson<Contact>(rows, tagsColumnPredicate);
	}
};