import { SqlConnection } from '../utils/sqlClient';
import { connectionConfig } from '../settings';

export const createConnection = async () => {
	const con = new SqlConnection(connectionConfig);
	try {
		await con.open();
		return con;
	} catch (e) {
		throw e;
	}
}