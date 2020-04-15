import { Division, Territory } from '../schema/data-types';
import fixtures from '../assets/fixtures';
import { InputAddDivision, InputUpsertTerritory } from '../schema/mutation-types';

export const divisionMutator = {
  add: (division: InputAddDivision): Division => {
    const div = {
      id: '',
      name: division.name,
      code: division.code
    };
    fixtures.divisions.push(div);
    return div;
  },
};