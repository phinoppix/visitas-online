import {getClient, mutate, query} from 'svelte-apollo';
import {get} from 'svelte/store';

import * as store from '../store';
import {upsertObject} from '../util';

import {
	QUERY_CONTACTS,
	QUERY_UPSERT_CONTACT,
	QUERY_REMOVE_CONTACT
} from './contact-gql';

export async function upsertContact(contact) {
	const client = getClient();
	const updatedObj = await mutate(client, {
		mutation: QUERY_UPSERT_CONTACT,
		variables: {contact}
	});
	store.contacts$.update(list => upsertObject(list, updatedObj.data.upsertContact));
	return updatedObj;
}

export async function getContacts() {
	const client = getClient();
	const qry = await query(client, {
		query: QUERY_CONTACTS
	});
	return qry.result();
}

export async function removeContact(contactId) {
	const client = getClient();
	const response = await mutate(client, {
		mutation: QUERY_REMOVE_CONTACT,
		variables: {contactId}
	});
	const responseData = response.data.removeContact;
	if (responseData.error === 'KO') {
		throw responseData.message;
	}
	store.contacts$.update(list => {
		const idx = list.findIndex(t => t.id === contactId);
		return [].concat(...list.slice(0, idx), ...list.slice(idx + 1))
	});
}

export async function rehydrateContacts(forceHydrate) {
	if (!forceHydrate && get(store.contactsLoaded$)) {
		return;
	}
	const result = await getContacts();
	store.contacts$.set(result.data.contactsPerDivision);
}