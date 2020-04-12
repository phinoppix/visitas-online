import { Territory } from "../schema/data-types";

export interface ITerritoryLoader {
  getTerritoriesByCong(divisionCode: string): Territory[];
  get(divisionCode: string, territoryCode: string): Territory;
}