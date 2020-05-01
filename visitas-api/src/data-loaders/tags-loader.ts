import { getTags } from '../services/tags';
import { rowDataToColumnValuePair } from '../utils/misc';
import { Tag } from '../schema/data-types';

export const tagsLoader = {
	get: async (divisionId: string): Promise<Tag[]> => {
		const rows = await getTags(divisionId);
		return rows.map(rowDataToColumnValuePair()) as Tag[];
	}
}