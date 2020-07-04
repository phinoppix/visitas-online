import { TYPES } from 'tedious';
import * as R from 'ramda';

import { CommandType, RowData, SqlCommand } from '../utils/sqlClient';
import { InputUpsertContact } from '../schema/mutation-types';
import { createConnection } from './common';
import { ContactsFilter } from '../schema/data-types';

export async function upsertContact(divisionId: string, contact: InputUpsertContact): Promise<RowData[]> {
	const hasGeo = !(R.isNil(contact.st_name) || R.isNil(contact.cityTown) || R.isNil(contact.jsonData));

	const parameters = [{
		name: 'divisionId',
		type: TYPES.NVarChar,
		value: divisionId
	}, {
		name: 'contactId',
		type: TYPES.VarChar,
		value: contact.id === '' ? null : contact.id
	}, {
		name: 'name',
		value: contact.name
	}, {
		name: 'phoneNumber',
		value: contact.phoneNumber
	}, {
		name: 'email',
		value: contact.email
	}, {
		name: 'remarks',
		value: contact.remarks
	}, {
		name: 'tags',
		value: JSON.stringify(contact.tags)
	}].concat(hasGeo ? [
		{
			name: 'st_number',
			value: contact.st_number
		},
		{
			name: 'st_name',
			value: contact.st_name
		},
		{
			name: 'cityTown',
			value: contact.cityTown
		},
		{
			name: 'stateProvince',
			value: contact.stateProvince
		},
		{
			name: 'country',
			value: contact.country
		},
		{
			name: 'postalCode',
			value: contact.postalCode
		},
		{
			name: 'jsonData',
			value: contact.jsonData
		},
		{
			name: 'jsonDataProvider',
			value: contact.jsonDataProvider
		},
		{
			name: 'place_name',
			value: contact.place_name
		}
	] : [{
		name: 'address_migration',
		value: contact.address_migration
	}]);

	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: hasGeo ? 'vis.usp_UpsertContact2' : 'vis.usp_UpsertContact',
		commandType: CommandType.StoredProcedure,
		parameters
	});

	try {
		return await cmd.executeReader(true);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getContactsPerDivision(divisionId: string, filter: ContactsFilter): Promise<RowData[]> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: `select * from vis.viewContactsWithPhoneNumber 
		where [division:id]=@divisionId and 
		([territory:id]=@territoryId or (@territoryId is null and [territory:id] is null)) for json path;`,
		parameters: [
			{ name: 'divisionId', value: divisionId },
			{ name: 'territoryId', value: filter.territoryId }
		]
	});

	try {
		return await cmd.executeReader(true);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function removeContact(divisionId: string, contactId: string) {
	const con = await createConnection();

	const cmd = new SqlCommand({
		connection: con,
		commandText: 'vis.usp_RemoveContact',
		commandType: CommandType.StoredProcedure,
		parameters: [{
			name: 'divisionId',
			value: divisionId
		}, {
			name: 'contactId',
			value: contactId
		}]
	});

	try {
		await cmd.executeNonQuery();
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function contactAssignTerritory(divisionId: string, contactId: string, territoryId: string): Promise<RowData[]> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: 'vis.usp_contactAssignTerritory',
		commandType: CommandType.StoredProcedure,
		parameters: [{
			name: 'division_id',
			value: divisionId
		}, {
			name: 'territory_id',
			value: territoryId
		}, {
			name: 'contact_id',
			value: contactId
		}]
	});

	try {
		return await cmd.executeReader(true);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function contactUnassignTerritory(divisionId: string, contactId: string): Promise<RowData[]> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: 'vis.usp_contactUnassignTerritory',
		commandType: CommandType.StoredProcedure,
		parameters: [{
			name: 'division_id',
			value: divisionId
		}, {
			name: 'contact_id',
			value: contactId
		}]
	});

	try {
		return await cmd.executeReader(true);
	} catch (e) {
		console.error(e);
		throw e;
	}
}