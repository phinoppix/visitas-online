import * as svc from '../services/division';

export const divisionLoader = {
  // TODO: Pull division data from cache
  get: async (id: string) => await svc.getDivision(id)
};