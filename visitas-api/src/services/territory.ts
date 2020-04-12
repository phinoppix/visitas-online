import { Pool, PoolClient } from 'pg';
import { Territory, GeoCoordinates } from '../schema/data-types';
// const pool = new Pool();

export function upsertTerritory(territory: Territory) {
  // return pool.connect()
  //   .then(client => client.query(`
  //   INSERT INTO territory VALUES($1, $2, $3, $4, ROW($5, $6), $7)
  //   ON CONFLICT(id)
  //   DO UPDATE SET(code, name, updated) = (
  //     excluded.code,
  //     excluded.name
  //     ROW($5, $6)
  //   ) RETURNING *;`, [
  //     territory.id,
  //     territory.code,
  //     territory.name,
  //     null,
  //     territory.created?.by,
  //     territory.created?.date,
  //     null
  //   ]));
}

export function modifyTerritoryBoundaries(territoryCode: string, boundaries: GeoCoordinates[]) {
  // if (boundaries.length < 3) {
  //   throw "Parameter [boundaries] must have at least 3 items.";
  // }
  //
  // const qryPoints = boundaries.map(b => `ST_GeomFromText('POINT(${b.latitude} ${b.longitude})', 4326)`);
  // return pool.connect()
  //   .then(client => client.query(`
  //   UPDATE territory SET (boundaries = ARRAY[${qryPoints.join(',')}])
  //   WHERE code=$1
  //   RETURNING *;
  //   `, [ territoryCode ]));
}