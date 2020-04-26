import { TYPES } from 'tedious';

import { Territory } from '../schema/data-types';
import { SqlCommand } from '../utils/sqlClient';
import { rowDataToKeyValue } from '../utils/misc';
import { CommandType } from '../utils/sqlClient/types';
import { createConnection } from '../data-mutators/common';

export async function getTerritory(divisionId: string, territoryId: string): Promise<Territory | undefined> {
  // const con = await createConnection();
  return undefined;
}

export async function getTerritoriesByDivision(divisionId: string): Promise<Territory[]> {
  const con = await createConnection();
  const cmd = new SqlCommand({
    connection: con,
    commandText: `
    select t.* from vis.territory t
    inner join vis.divisionTerritory dt on dt.division_id = @divisionId and dt.territory_id = t.id`,
    parameters: [{name: 'divisionId', value: divisionId}]
  });

  try {
    const rows = await cmd.executeReader(true);
    console.log('getTerritoriesByDivision', rows);
    return rows.map(rowDataToKeyValue) as Territory[];
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function upsertTerritory(territory: Territory): Promise<Territory | undefined> {
  console.log('upsertTerritory open SqlConnection ');
  const con = await createConnection();
  console.log('upsertTerritory setup SqlCommand ');
  const cmd = new SqlCommand({
    connection: con,
    commandText: 'vis.usp_UpsertTerritory',
    commandType: CommandType.StoredProcedure,
    parameters: [{
      name: 'divisionId',
      type: TYPES.UniqueIdentifier,
      value: territory.division.id
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
    const normalized = rows.map(rowDataToKeyValue);
    console.log('services/territory@upsertTerritory done', normalized);
    return normalized.length > 0 ? normalized[0] as Territory : undefined;
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