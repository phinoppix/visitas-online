import { InputUpsertTerritory, MutationResponse } from '../schema/mutation-types';
import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';
import { voidMutationHandler } from './common';

export const territoryMutator = {
  upsertTerritory: async (divisionId: string, territory: InputUpsertTerritory): Promise<Territory | undefined> => {
    console.log('upsertTerritory', territory);
    let target: Territory | undefined = {
      id: territory.id,
      code: territory.code,
      name: territory.name,
      boundaries: territory.boundaries,
      created: territory.updated,
      division: {id: divisionId, code: ''},
      valid: true
    };
    return await svc.upsertTerritory(target);
  },
  removeTerritory: async (divisionId: string, territoryId: string): Promise<MutationResponse> =>
    await voidMutationHandler(async () => {
      await svc.removeTerritory(divisionId, territoryId);
    })
}