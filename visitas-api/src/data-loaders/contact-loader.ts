import { Contact } from '../schema/types';

const fixtures: Contact[] = [
  {
    name: 'Aris Tiru',
    status: 'new',
    full_address: '89 Kenpark Avenue',
    territory: {
      code: '1001',
    },
    congregation: {
      code: 'CA-HEARTLAKE'
    }
  }
];

export const contactLoader = {
  getList: (congregationCode: string, territoryCode: string) => fixtures
};