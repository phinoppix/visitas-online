const fixtures = [
  {
    code: '1001',
    name: 'Sandalwood-Mayfield-Kennedy-MainSt',
    boundaries: [{latitude: 1.1, longitude: 0.18273}, {latitude: 1.2817721, longitude: 0.8739011233}],
    checkedOut: {
      by: 'aristiru',
      date: new Date()
    },
    congregation: {
      code: 'CA-HEARTLAKE'
    }
  },
  {
    code: '1002',
    name: 'Mississauga-Mayfield-McLaughlin-Wanless',
    boundaries: [{latitude: 1.1, longitude: 0.18273}, {latitude: 1.2817721, longitude: 0.8739011233}],
    checkedOut: {
      by: 'aristiru',
      date: new Date()
    },
    congregation: {
      code: 'CA-HEARTLAKE'
    }
  }
];

export const territoryLoader = {
  getTerritoriesByCong: (congregationCode: string) => fixtures,
  get: (code: string) => fixtures.find(territory => territory.code === code)
};
