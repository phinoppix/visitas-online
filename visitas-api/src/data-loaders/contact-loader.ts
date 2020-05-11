import { Contact } from '../schema/data-types';
import * as svc from '../services/contact';
import { jsonStreamAsJson, tagsColumnPredicate } from '../utils/misc';

export const contactLoader = {
	getContactsPerDivision: async (divisionId: string): Promise<Contact[]> => {
		const rows = await svc.getContactsPerDivision(divisionId);
		const output = jsonStreamAsJson<Contact>(rows, tagsColumnPredicate);
		return output;
	}
};