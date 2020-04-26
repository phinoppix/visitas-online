import { Division, Territory } from '../schema/data-types';
import { InputAddDivision, InputUpsertTerritory } from '../schema/mutation-types';

export const divisionMutator = {
  add: (division: InputAddDivision): Division | undefined => {
    return undefined;
  },
};