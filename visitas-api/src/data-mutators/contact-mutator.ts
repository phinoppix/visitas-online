import { InputUpsertContact, MutationResponse } from '../schema/mutation-types';
import { Contact } from '../schema/data-types';
import * as svc from '../services/contact';
import { voidMutationHandler } from './common';
import { tagsColumnPredicate, toContact } from '../utils/contact-utils';
import { rowDataToColumnValuePair } from '../utils/misc';

export const contactMutator = {

	upsertContact: async (divisionId: string, contact: InputUpsertContact): Promise<Contact | undefined> => {
		const result = await svc.upsertContact(divisionId, contact);
		const row = rowDataToColumnValuePair(tagsColumnPredicate)(result);
		return toContact(row, undefined, divisionId);
	},

	removeContact: async (divisionId: string, contactId: string): Promise<MutationResponse> =>
		await voidMutationHandler(async () => await svc.removeContact(divisionId, contactId)),

	contactAssignTerritory: async (divisionId: string, contactId: string, territoryId: string): Promise<Contact | undefined> => {
		const result = await svc.contactAssignTerritory(divisionId, contactId, territoryId);
		const row = rowDataToColumnValuePair(tagsColumnPredicate)(result);
		return toContact(row, territoryId, divisionId)
	},

	contactUnassignTerritory: async (divisionId: string, contactId: string): Promise<Contact | undefined> => {
		const result = await svc.contactUnassignTerritory(divisionId, contactId);
		const row = rowDataToColumnValuePair(tagsColumnPredicate)(result);
		return toContact(row, undefined, divisionId);
	}
};
