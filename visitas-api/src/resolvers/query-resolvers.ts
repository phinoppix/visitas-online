import { QueryArgsWithCongCode, QueryArgsContactsPerTerritory } from '../schema/query-schema';
import { congregationLoader } from '../data-loaders/congregation-loader';
import { territoryLoader } from '../data-loaders/territory-loader';
import { contactLoader } from '../data-loaders/contact-loader';
import { Territory, Contact } from '../schema/data-types';

export const queryResolvers = {
  Query: {
    congregation: (_: any, {congCode}: QueryArgsWithCongCode) =>
      congregationLoader.get(congCode),
    territoriesPerCong: (_: any, {congCode}: QueryArgsWithCongCode) =>
      territoryLoader.getTerritoriesByCong(congCode),
    contactsPerTerritory: (_: any, {congregationCode, territoryCode}: QueryArgsContactsPerTerritory) =>
      contactLoader.getList(congregationCode, territoryCode)
  },
  IStampableEntity: {
    __resolveType: (root: any) => {
      if (root.name && root.status) return 'Contact';
      if (root.code && root.congregation) return 'Territory';
      if (root.name) return 'Congregation';

      return null;
    }
  },
  Congregation: {
    aggregates: () => ({
      countTerritories:  (_: any, {congCode}: QueryArgsWithCongCode) => {
        console.log('Congregation resolver', congCode);
        return 14;
      }
    })
  },
  Territory: {
    congregation: (root: Territory) => congregationLoader.get(root.congregation!.code),
    aggregates: () => ({
      countContacts:  (_: any, {congCode}: QueryArgsWithCongCode) => {
        console.log('Territory.aggregates resolver', congCode);
        return 15;
      }
    })
  },
  Contact: {
    territory: (root: Contact) => territoryLoader.get(root.territory!.code),
    congregation: (root: Contact) => congregationLoader.get(root.congregation!.code)
  },
};
