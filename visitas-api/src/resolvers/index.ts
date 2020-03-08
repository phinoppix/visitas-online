import { congregationLoader } from '../data-loaders/congregation-loader';
import { QueryArgsWithCongCode, QueryArgsContactsPerTerritory } from '../schema/query-schema';
import { territoryLoader } from '../data-loaders/territory-loader';
import { contactLoader } from '../data-loaders/contact-loader';
import { Territory, Contact } from '../schema/types';

export const resolvers = {
  Query: {
    congregation: (_: any, {congCode}: QueryArgsWithCongCode) => congregationLoader.get(congCode),
    territoriesPerCong: (_: any, {congCode}: QueryArgsWithCongCode) => territoryLoader.getTerritoriesByCong(congCode),
    contactsPerTerritory: (_: any, {congregationCode, territoryCode}: QueryArgsContactsPerTerritory) => contactLoader.getList(congregationCode, territoryCode)
  },
  Congregation: {
    aggregates: () => ({
      countTerritories:  (_: any, {congCode}: QueryArgsWithCongCode) => {
        console.log('Congregation resolver');
        return 14;
      }
    })
  },
  Territory: {
    congregation: (root: Territory, args: any) =>  congregationLoader.get(root.congregation!.code),
    aggregates: () => ({
      countContacts:  (_: any, {congCode}: QueryArgsWithCongCode) => {
        return 15;
      }
    })
  },
  Contact: {
    territory: (root: Contact, args: any) => territoryLoader.get(root.territory!.code),
    congregation: (root: Contact, args: any) => congregationLoader.get(root.congregation!.code)
  }
};
