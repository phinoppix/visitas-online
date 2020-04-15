import { TYPES } from 'tedious';

import { Territory, GeoCoordinates } from '../schema/data-types';
import { SqlCommand } from '../utils/sqlClient';
import { rowDataToKeyValue } from '../utils/misc';
import { CommandType } from '../utils/sqlClient/types';
import { createConnection } from '../data-mutators/common';

export async function upsertTerritory(territory: Territory): Promise<Territory | undefined> {
  const con = await createConnection();

  const cmd = new SqlCommand({
    connection: con,
    commandText: 'vis.usp_UpsertTerritory',
    commandType: CommandType.StoredProcedure,
    parameters: [{
      name: 'division_id',
      type: TYPES.UniqueIdentifier,
      value: territory.division.id
    }, {
      name: 'territory_id',
      type: TYPES.UniqueIdentifier,
      value: territory.id
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
    return rows.length > 0 ? rows.map(rowDataToKeyValue)[0] as Territory : undefined;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function removeTerritory(divisionCode: string, territoryCode: string) {
  const con = await createConnection();

  const cmd = new SqlCommand({
    connection: con,
    commandText: 'vis.uspRemoveTerritory',
    commandType: CommandType.StoredProcedure,
    parameters: [{
      name: 'divisionCode',
      value: divisionCode
    }, {
      name: 'territoryCode',
      value: territoryCode
    }]
  });

  try {
    await cmd.executeNonQuery();
  } catch(e) {
    console.error(e);
    throw e;
  }
}