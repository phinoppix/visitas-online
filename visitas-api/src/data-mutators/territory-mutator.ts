import { InputUpsertTerritory, MutationResponse } from '../schema/mutation-types';
import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';
import { voidMutationHandler } from './common';

export const territoryMutator = {
  upsertTerritory: async (divisionCode: string, territory: InputUpsertTerritory): Promise<Territory | undefined> => {
    console.log('upsertTerritory', territory);
    let target: Territory | undefined = {
      id: territory.id,
      code: territory.code,
      name: territory.name,
      boundaries: territory.boundaries,
      created: territory.updated,
      division: {id: '1D0F433E-F36B-1410-8B80-00A4D18A1143', code: ''},
      valid: true
    };
    return await svc.upsertTerritory(target);
  },
  removeTerritory: async (divisionCode: string, territoryCode: string): Promise<MutationResponse> =>
    await voidMutationHandler(async () => {
      await svc.removeTerritory(divisionCode, territoryCode);
    })
}