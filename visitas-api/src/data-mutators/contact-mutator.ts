import { InputUpsertContact, MutationResponse } from '../schema/mutation-types';
import { Contact } from '../schema/data-types';
import * as svc  from '../services/contact';
import {omit} from 'ramda';
import { voidMutationHandler } from './common';

const OMIT_COLS = ['phoneNumber', 'email'];

export const contactMutator = {
	upsertContact: async (divisionId: string, contact: InputUpsertContact): Promise<Contact | undefined> => {
		console.log('contact-mutator/contactMutator@upsertContact', {
			divisionId,
			inputContact: contact
		});
		const result = await svc.upsertContact(divisionId, contact);
		const updatedContact = {
			...result,
			contact_info: {
				phoneNumber: result!.phoneNumber,
				email: result!.email
			}
		};
		return omit(OMIT_COLS, updatedContact) as Contact;
	},
	removeContact: async (divisionId: string, contactId: string): Promise<MutationResponse> =>
		await voidMutationHandler(async () => await svc.removeContact(divisionId, contactId))
};
