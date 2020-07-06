import {getClient, mutate, query} from 'svelte-apollo';

import {contacts$} from '../store';
import {removeElementByPredicate, upsertObject} from '../util';
import * as queries from './contact-gql';

export async function upsertContact(client, contactData) {
	const contact = {
		...contactData,
		__typename: undefined
	};

	const updatedObj = await mutate(client, {
		mutation: queries.MUTATION_UPSERT_CONTACT,
		variables: {contact}
	});
	contacts$.update(list => upsertObject(list, updatedObj.data.upsertContact));
	return updatedObj;
}

export async function getContacts(client, filter) {
	const qry = await query(client, {
		query: queries.QUERY_CONTACTS,
		variables: {filter}
	});
	return qry.result();
}

export async function removeContact(contactId) {
	const client = getClient();
	const response = await mutate(client, {
		mutation: queries.MUTATION_REMOVE_CONTACT,
		variables: {contactId}
	});
	const responseData = response.data.removeContact;
	if (responseData.error === 'KO') {
		throw responseData.message;
	}
	contacts$.update(list => removeElementByPredicate(list, t => t.id === contactId));
}

export async function assignTerritory(contactId, territoryId) {
	const client = getClient();
	const response = await mutate(client, {
		mutation: queries.MUTATION_CONTACT_ASSIGN_TERRITORY,
		variables: {
			contactId,
			territoryId
		}
	});
	contacts$.update(list => upsertObject(list, response.data.contactAssignTerritory));
}

export async function unassignTerritory(contactId, territoryId) {
	const client = getClient();
	const response = await mutate(client, {
		mutation: queries.MUTATION_CONTACT_UNASSIGN_TERRITORY,
		variables: {contactId}
	});
	contacts$.update(list => upsertObject(list, response.data.contactUnassignTerritory));
}
