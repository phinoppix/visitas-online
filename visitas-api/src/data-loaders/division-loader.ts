import * as svc from '../services/division';
import { rowDataToColumnValuePair } from '../utils/misc';

export const divisionLoader = {
  // TODO: Pull division data from cache
  get: async (id: string | undefined) => {
  	if (!id) return undefined;
  	const row = await svc.getDivision(id);
  	return rowDataToColumnValuePair()(row);
	}
};