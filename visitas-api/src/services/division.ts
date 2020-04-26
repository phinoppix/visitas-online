import { Division } from '../schema/data-types';
import { SqlCommand } from '../utils/sqlClient';
import { rowDataToKeyValue } from '../utils/misc';
import { createConnection } from '../data-mutators/common';

export async function getDivision(id: string): Promise<Division | undefined> {
  const con = await createConnection();

  try {
    const cmd = new SqlCommand({
      connection: con,
      commandText: 'select * from vis.division where id=@id',
      parameters: [{name: 'id', value: id}]
    });
    const rows = await cmd.executeReader(true);
    return rows.length > 0 ? rows.map(rowDataToKeyValue)[0] as Division : undefined;
  } catch (e) {
    console.error(e);
  }
}