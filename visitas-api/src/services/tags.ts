import { SqlCommand } from '../utils/sqlClient';
import { RowData } from '../utils/sqlClient';
import { createConnection } from './common';

export async function getTags(divisionId: string): Promise<RowData[]> {
	const con = await createConnection();
	const cmd = new SqlCommand({
		connection: con,
		commandText: `
    select tag from vis.divisionTag dt inner join vis.division d on dt.divisionId = d.id
		where divisionId = @divisionId`,
		parameters: [{name: 'divisionId', value: divisionId}]
	});

	try {
		return await cmd.executeReader(true);
	} catch (e) {
		console.error(e);
		throw e;
	}
}