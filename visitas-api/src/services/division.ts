import { RowData, SqlCommand } from '../utils/sqlClient';
import { head } from 'ramda';
import { createConnection } from './common';

export async function getDivision(id: string): Promise<RowData | undefined> {
	const con = await createConnection();

	try {
		const cmd = new SqlCommand({
			connection: con,
			commandText: 'select * from vis.division where id=@id',
			parameters: [{ name: 'id', value: id }]
		});
		const rows = await cmd.executeReader(true);
		return head(rows);
	} catch (e) {
		console.error(e);
	}
}