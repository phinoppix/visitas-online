import { Division, Territory, Contact } from '../schema/data-types';

const divisions: Division[] = [
  {
    id: '1001',
    code: 'CA-HEARTLAKE',
    name: 'Heartlake Tagalog',
  }
];

const territories: Territory[] = [
  {
    id: '1001',
    code: '1001',
    name: 'Sandalwood-Mayfield-Kennedy-MainSt',
    boundaries: [{latitude: 1.1, longitude: 0.18273}, {latitude: 1.2817721, longitude: 0.8739011233}],
    division: divisions[0],
    valid: true
  },
  {
    id: '1002',
    code: '1002',
    name: 'Mississauga-Mayfield-McLaughlin-Wanless',
    boundaries: [{latitude: 1.1, longitude: 0.18273}, {latitude: 1.2817721, longitude: 0.8739011233}],
    created: {
      by: 'aristiru',
      date: new Date()
    },
    division: divisions[0],
    valid: true
  }
];

const contacts: Contact[] = [
  {
    name: 'Aris Tiru',
    status: 'new',
    full_address: '89 Kenpark Avenue',
    territory: territories[0],
    division: divisions[0]
  }
];

export default {
  divisions,
  territories,
  contacts
};
