import { Congregation, Territory, Contact } from '../schema/data-types';

const congs: Congregation[] = [
  {
    code: 'CA-HEARTLAKE',
    name: 'Heartlake Tagalog',
  }
];

const territories: Territory[] = [
  {
    code: '1001',
    name: 'Sandalwood-Mayfield-Kennedy-MainSt',
    boundaries: [{latitude: 1.1, longitude: 0.18273}, {latitude: 1.2817721, longitude: 0.8739011233}],
    congregation: congs[0],
    valid: true
  },
  {
    code: '1002',
    name: 'Mississauga-Mayfield-McLaughlin-Wanless',
    boundaries: [{latitude: 1.1, longitude: 0.18273}, {latitude: 1.2817721, longitude: 0.8739011233}],
    created: {
      by: 'aristiru',
      date: new Date()
    },
    congregation: congs[0],
    valid: true
  }
];

const contacts: Contact[] = [
  {
    name: 'Aris Tiru',
    status: 'new',
    full_address: '89 Kenpark Avenue',
    territory: territories[0],
    congregation: congs[0]
  }
];

export default {
  congs,
  territories,
  contacts
};
