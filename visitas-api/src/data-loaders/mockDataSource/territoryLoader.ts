import { ITerritoryLoader } from '../ITerritoryLoader';
import fixtures from '../../assets/fixtures';
import { Territory } from '../../schema/data-types';

const dsrc: ITerritoryLoader = {
  getTerritoriesByCong: (divisionCode: string): Territory[] => {
    return fixtures.territories;
  },
  get: (divisionCode: string, territoryCode: string): Territory => {
    return fixtures.territories.find(territory => territory.code === territoryCode)!;
  }
};

export default dsrc;