import { QueryArgsWithCongCode, QueryArgsContactsPerTerritory } from '../schema/query-schema';
import { divisionLoader } from '../data-loaders/division-loader';
import { territoryLoader } from '../data-loaders';
import { contactLoader } from '../data-loaders/contact-loader';
import { Territory, Contact } from '../schema/data-types';

export const queryResolvers = {
  Query: {
    division: async (_: any, {divisionCode}: QueryArgsWithCongCode) =>
      await divisionLoader.get(divisionCode),
    territoriesPerDivision: (_: any, {divisionCode}: QueryArgsWithCongCode) =>
      territoryLoader.getTerritoriesByCong(divisionCode),
    contactsPerTerritory: (_: any, {divisionCode, territoryCode}: QueryArgsContactsPerTerritory) =>
      contactLoader.getList(divisionCode, territoryCode)
  },

  IStampableEntity: {
    __resolveType: (root: any) => {
      if (root.name && root.status) return 'Contact';
      if (root.code && root.division) return 'Territory';
      if (root.name) return 'Division';

      return null;
    }
  },
  Division: {
    aggregates: () => ({
      countTerritories:  (_: any, {divisionCode}: QueryArgsWithCongCode) => {
        console.log('Division resolver', divisionCode);
        return 14;
      }
    })
  },

  Territory: {
    division: (root: Territory) => divisionLoader.get(root.division!.code),
    aggregates: () => ({
      countContacts:  (_: any, {divisionCode}: QueryArgsWithCongCode) => {
        console.log('Territory.aggregates resolver', divisionCode);
        return 15;
      }
    })
  },
  Contact: {
    territory: (root: Contact) => territoryLoader.get('CA-HEARTLAKE', root.territory!.code),
    division: (root: Contact) => divisionLoader.get(root.division!.code)
  },
};
