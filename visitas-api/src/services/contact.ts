import { TYPES } from 'tedious';
import { head } from 'ramda';

import { RowData, SqlCommand } from '../utils/sqlClient';
import { CommandType } from '../utils/sqlClient';
import { InputUpsertContact } from '../schema/mutation-types';
import { createConnection } from './common';

export async function upsertContact(divisionId: string, contact: InputUpsertContact): Promise<RowData | undefined> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: 'vis.usp_UpsertContact',
		commandType: CommandType.StoredProcedure,
		parameters: [{
			name: 'divisionId',
			type: TYPES.UniqueIdentifier,
			value: divisionId
		}, {
			name: 'contactId',
			type: TYPES.UniqueIdentifier,
			value: contact.id === '' ? null : contact.id
		}, {
			name: 'name',
			value: contact.name
		}, {
			name: 'full_address',
			value: contact.full_address
		}, {
			name: 'location_data',
			value: contact.location_data
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
		}]
	});

	try {
		const rows = await cmd.executeReader(true);
		return head(rows);
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getContactsPerDivision(divisionId: string): Promise<RowData[]> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: `
    select c.*, tc.territory_id, t.code territory_code, t.name territory_name from vis.contact c
    inner join vis.divisionContact dc on dc.division_id = @divisionId and dc.contact_id = c.id
    left join vis.territoryContact tc on tc.division_id = @divisionId and tc.contact_id = c.id
    left join vis.territory t on t.id = tc.territory_id`,
		parameters: [{name: 'divisionId', value: divisionId}]
	});

	try {
		return await cmd.executeReader(true);
		// return result.map(rowDataToColumnValuePair(tagsColumnPredicate));
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
	} catch(e) {
		console.error(e);
		throw e;
	}
}

export async function contactAssignTerritory(divisionId: string, contactId: string, territoryId: string): Promise<RowData | undefined> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: 'vis.usp_contactAssignTerritory',
		commandType: CommandType.StoredProcedure,
		parameters: [{
			name: 'divisionId',
			value: divisionId
		}, {
			name: 'territoryId',
			value: territoryId
		}, {
			name: 'contactId',
			value: contactId
		}]
	});

	try {
		const result = await cmd.executeReader(true);
		return head(result);
	} catch (e) {
		if (e.number === 2601)
			return undefined;
		console.error(e);
		throw e;
	}
}

export async function contactUnassignTerritory(divisionId: string, contactId: string): Promise<RowData | undefined> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: 'vis.usp_contactUnassignTerritory',
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
		const result = await cmd.executeReader(true);
		return head(result);
	} catch (e) {
		console.error(e);
		throw e;
	}
}