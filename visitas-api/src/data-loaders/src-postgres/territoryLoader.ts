import { ITerritoryLoader } from "../ITerritoryLoader";

const dsrc: ITerritoryLoader = {
  getTerritoriesByCong: (divisionCode: string) => {
    throw new Error("Method not implemented.");
  },
  get: (divisionCode: string, territoryCode: string) => {
    throw new Error("Method not implemented.");
  }
}

export default dsrc;