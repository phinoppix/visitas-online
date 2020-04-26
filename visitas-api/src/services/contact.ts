import { Contact } from '../schema/data-types';
import { createConnection } from '../data-mutators/common';
import { DataRow, SqlCommand } from '../utils/sqlClient';
import { CommandType } from '../utils/sqlClient/types';
import { TYPES } from 'tedious';
import { rowDataToKeyValue } from '../utils/misc';
import { InputUpsertContact } from '../schema/mutation-types';

export async function upsertContact(divisionId: string, contact: InputUpsertContact): Promise<DataRow | undefined> {
	console.log('service/contact@upsertContact', contact);
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
		const normalized = rows.map(rowDataToKeyValue).map(t => ({
			...t,
			tags: JSON.parse(t.tags)
		}));
		return normalized.length > 0 ? normalized[0] : undefined;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getContactsPerDivision(divisionId: string): Promise<DataRow[]> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: `
    select c.* from vis.contact c
    inner join vis.divisionContact dc on dc.division_id = @divisionId and dc.contact_id = c.id`,
		parameters: [{name: 'divisionId', value: divisionId}]
	});

	try {
		const result = await cmd.executeReader(true);
		const rows = result.map(rowDataToKeyValue).map(r => {
			r.tags = JSON.parse(r.tags);
			return r;
		});
		console.log('services/contacts@getContactsPerDivision', {result, rows});
		return rows;
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