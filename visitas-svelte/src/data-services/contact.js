import {getClient, mutate, query} from 'svelte-apollo';
import {get} from 'svelte/store';

import * as store from '../store';
import {upsertObject, removeElementByPredicate} from '../util';
import * as queries from './contact-gql';

export async function upsertContact(contact) {
	const client = getClient();
	const updatedObj = await mutate(client, {
		mutation: queries.MUTATION_UPSERT_CONTACT,
		variables: {contact}
	});
	store.contacts$.update(list => upsertObject(list, updatedObj.data.upsertContact));
	return updatedObj;
}

export async function getContacts() {
	const client = getClient();
	const qry = await query(client, {
		query: queries.QUERY_CONTACTS
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
	store.contacts$.update(list => removeElementByPredicate(list, t => t.id === contactId));
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
	store.contacts$.update(list => upsertObject(list, response.data.contactAssignTerritory));
}

export async function unassignTerritory(contactId, territoryId) {
	const client = getClient();
	const response = await mutate(client, {
		mutation: queries.MUTATION_CONTACT_UNASSIGN_TERRITORY,
		variables: {contactId}
	});
	store.contacts$.update(list => upsertObject(list, response.data.contactUnassignTerritory));
}

export async function rehydrateContacts(forceHydrate) {
	if (!forceHydrate && get(store.contactsLoaded$)) {
		return;
	}
	const result = await getContacts();
	const list = result.data.contactsPerDivision.map(c => ({
		...c,
		address: c.address && {
			...c.address,
			place_name: c.address.jsonData && JSON.parse(c.address.jsonData).place_name
		}
	}));
	store.contacts$.set(list);
}