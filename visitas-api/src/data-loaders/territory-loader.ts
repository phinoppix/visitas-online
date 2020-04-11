import fixtures from '../assets/fixtures';

export const territoryLoader = {
  getTerritoriesByCong: (congregationCode: string) => fixtures.territories,
  get: (code: string) => fixtures.territories.find(territory => territory.code === code)
};
