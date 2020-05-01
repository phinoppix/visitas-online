import {getClient, mutate, query} from 'svelte-apollo';
import {get} from 'svelte/store';

import {upsertObject} from '../util';
import * as store from '../store';

import {
	QUERY_GET_TERRITORIES,
	QUERY_REMOVE_TERRITORY,
	QUERY_UPSERT_TERRITORY
} from './territory-gql';


export async function getTerritories() {
	const client = getClient();
	const qry = await query(client, {
		query: QUERY_GET_TERRITORIES
	});
	return qry.result();
}

export async function upsertTerritory(inputId, inputCode, inputName) {
	const client = getClient();
	const updatedObj = await mutate(client, {
		mutation: QUERY_UPSERT_TERRITORY,
		variables: {
			territory: {
				id: inputId,
				code: inputCode,
				name: inputName,
				boundaries: [],
				updated: {
					by: 'aris',
					date: new Date()
				}
			}
		}
	});
	store.territories$.update(list => upsertObject(list, updatedObj.data.upsertTerritory));
	return updatedObj;
}

export function getTerritory(id) {
	const list = get(store.territories$);
	return list.find(t => t.id === id);
}

export async function removeTerritory(id) {
	const client = getClient();
	const response = await mutate(client, {
			mutation: QUERY_REMOVE_TERRITORY,
			variables: {
				territoryId: id
			}
		});
	const responseData = response.data.removeTerritory;
	if (responseData.error === 'KO') {
		throw responseData.message;
	}
	store.territories$.update(list => removeElementByPredicate(list, t => t.id === id));
}

export async function rehydrateTerritories(forceHydrate) {
	if (!forceHydrate && get(store.territoriesLoaded$)) {
		return;
	}
	const result = await getTerritories();
	store.territories$.set(result.data.territoriesPerDivision);
}