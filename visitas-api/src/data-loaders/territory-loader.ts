import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';
import { rowDataToColumnValuePair } from '../utils/misc';

export const get = async (divisionId: string, territoryId: string | undefined): Promise<Territory | undefined> =>
	await svc.getTerritory(divisionId, territoryId);

export const getAllByDivision = async (divisionId: string): Promise<Territory[]> => {
	const rows = await svc.getTerritoriesByDivision(divisionId);
	return rows.map(rowDataToColumnValuePair()) as Territory[];
};