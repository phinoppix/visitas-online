import { Territory } from '../schema/data-types';
import * as svc from '../services/territory';

export const territoryLoader = {
  get: async (divisionId: string, territoryId: string): Promise<Territory | undefined> =>
    await svc.getTerritory(divisionId, territoryId),
  getAllByDivision: async (divisionId: string): Promise<Territory[]> =>
    await svc.getTerritoriesByDivision(divisionId)
}