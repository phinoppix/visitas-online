import { InputUpsertTerritory } from '../schema/mutation-types';
import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';

export const territoryMutator = {
  upsertTerritory: async (territory: InputUpsertTerritory) => {
    const newTerritory: Territory = {
      id: territory.id,
      code: territory.code,
      name: territory.name,
      boundaries: territory.boundaries,
      created: territory.updated,
      division: {id: 0, code: 'CA-HEARTLAKE'},
      valid: true
    };

    await svc.upsertTerritory(newTerritory);
    return newTerritory;
  }
}