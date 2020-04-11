import { InputUpsertTerritory } from '../schema/mutation-types';
import { Territory } from '../schema/data-types';
import fixtures from '../assets/fixtures';

export const territoryMutator = {
  upsertTerritory: (territory: InputUpsertTerritory) => {
    const newTerritory: Territory = {
      code: territory.code,
      name: territory.name,
      boundaries: territory.boundaries,
      created: territory.updated,
      congregation: {code: 'CA-HEARTLAKE'},
      valid: true
    };
    fixtures.territories.push(newTerritory);
    return newTerritory;
  }
}