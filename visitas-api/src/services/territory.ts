import { TYPES } from 'tedious';

import { Territory } from '../schema/data-types';
import { RowData, SqlCommand } from '../utils/sqlClient';
import { CommandType } from '../utils/sqlClient';
import { createConnection } from './common';
import { head } from 'ramda';

export async function getTerritory(divisionId: string, territoryId: string | undefined): Promise<Territory | undefined> {
  // const con = await createConnection();
  return undefined;
}

export async function getTerritoriesByDivision(divisionId: string): Promise<RowData[]> {
  const con = await createConnection();
  const cmd = new SqlCommand({
    connection: con,
    commandText: `
    select t.* from vis.territory t
    inner join vis.divisionTerritory dt on dt.division_id = @divisionId and dt.territory_id = t.id`,
    parameters: [{name: 'divisionId', value: divisionId}]
  });

  try {
    return await cmd.executeReader(true);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function upsertTerritory(territory: Territory): Promise<RowData | undefined> {
  const con = await createConnection();
  const cmd = new SqlCommand({
    connection: con,
    commandText: 'vis.usp_UpsertTerritory',
    commandType: CommandType.StoredProcedure,
    parameters: [{
      name: 'divisionId',
      type: TYPES.UniqueIdentifier,
      value: territory.division!.id
    }, {
      name: 'territoryId',
      type: TYPES.UniqueIdentifier,
      value: territory.id === '' ? null : territory.id
    }, {
      name: 'code',
      value: territory.code
    }, {
      name: 'name',
      value: territory.name
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

export async function removeTerritory(divisionId: string, territoryId: string) {
  const con = await createConnection();

  const cmd = new SqlCommand({
    connection: con,
    commandText: 'vis.usp_RemoveTerritory',
    commandType: CommandType.StoredProcedure,
    parameters: [{
      name: 'divisionId',
      value: divisionId
    }, {
      name: 'territoryId',
      value: territoryId
    }]
  });

  try {
    await cmd.executeNonQuery();
  } catch(e) {
    console.error(e);
    throw e;
  }
}