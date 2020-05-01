import { InputUpsertTerritory, MutationResponse } from '../schema/mutation-types';
import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';
import { voidMutationHandler } from './common';
import { rowDataToColumnValuePair } from '../utils/misc';

export const territoryMutator = {
	upsertTerritory: async (divisionId: string, territory: InputUpsertTerritory): Promise<Territory | undefined> => {
		const target: Territory | undefined = {
			id: territory.id,
			code: territory.code,
			name: territory.name,
			boundaries: territory.boundaries,
			created: territory.updated,
			division: { id: divisionId, code: '' },
			valid: true
		};
		const output = await svc.upsertTerritory(target);
		const row = rowDataToColumnValuePair()(output) as Territory;
		return row && {
			...row,
			division: {
				id: divisionId
			}
		};
	},
	removeTerritory: async (divisionId: string, territoryId: string): Promise<MutationResponse> =>
		await voidMutationHandler(async () => await svc.removeTerritory(divisionId, territoryId))
}