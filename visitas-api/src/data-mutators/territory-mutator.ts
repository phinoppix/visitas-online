import { InputUpsertTerritory, MutationResponse } from '../schema/mutation-types';
import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';
import { voidMutationHandler } from './common';

export const territoryMutator = {
	upsertTerritory: async (divisionId: string, territory: InputUpsertTerritory): Promise<Territory | undefined> => {
		let target: Territory | undefined = {
			id: territory.id,
			code: territory.code,
			name: territory.name,
			boundaries: territory.boundaries,
			created: territory.updated,
			division: { id: divisionId, code: '' },
			valid: true
		};
		const output = await svc.upsertTerritory(target);
		return output ? {
			...output,
			division: {
				id: divisionId,
				code: ''
			},
		} : undefined;
	},
	removeTerritory: async (divisionId: string, territoryId: string): Promise<MutationResponse> =>
		await voidMutationHandler(async () => await svc.removeTerritory(divisionId, territoryId))
}