import { Division, Territory } from '../schema/data-types';
import fixtures from '../assets/fixtures';
import { InputAddDivision, InputUpsertTerritory } from '../schema/mutation-types';

export const divisionMutator = {
  add: (division: InputAddDivision): Division => {
    const div = {
      id: 0,
      name: division.name,
      code: division.code
    };
    fixtures.divisions.push(div);
    return div;
  },
};