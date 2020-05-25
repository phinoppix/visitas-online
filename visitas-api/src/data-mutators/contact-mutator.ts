import * as R from 'ramda';

import { InputUpsertContact, MutationResponse } from '../schema/mutation-types';
import { Contact } from '../schema/data-types';
import * as svc from '../services/contact';
import { voidMutationHandler } from './common';
import { sqlStreamAsJson, tagsColumnPredicate } from '../utils/misc';

export const contactMutator = {

	upsertContact: async (divisionId: string, contact: InputUpsertContact): Promise<Contact | undefined> => {
		const result = await svc.upsertContact(divisionId, contact);
		const rows = sqlStreamAsJson<Contact>(result, tagsColumnPredicate);
		return R.head(rows);
	},

	removeContact: async (divisionId: string, contactId: string): Promise<MutationResponse> =>
		await voidMutationHandler(async () => await svc.removeContact(divisionId, contactId)),

	contactAssignTerritory: async (divisionId: string, contactId: string, territoryId: string): Promise<Contact | undefined> => {
		const result = await svc.contactAssignTerritory(divisionId, contactId, territoryId);
		const rows = sqlStreamAsJson<Contact>(result, tagsColumnPredicate);
		return R.head(rows);
	},

	contactUnassignTerritory: async (divisionId: string, contactId: string): Promise<Contact | undefined> => {
		const result = await svc.contactUnassignTerritory(divisionId, contactId);
		const rows = sqlStreamAsJson<Contact>(result, tagsColumnPredicate);
		return R.head(rows);
	}
};
