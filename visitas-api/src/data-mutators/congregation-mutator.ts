import { Congregation, Territory } from '../schema/data-types';
import fixtures from '../assets/fixtures';
import { InputAddCongregation, InputUpsertTerritory } from '../schema/mutation-types';

export const congregationMutator = {
  add: (congregation: InputAddCongregation): Congregation => {
    const cong = {
      name: congregation.name,
      code: congregation.code
    };
    fixtures.congs.push(cong);
    return cong;
  },
};