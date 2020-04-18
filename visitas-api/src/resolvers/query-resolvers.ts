import { QueryArgsWithCongCode, QueryArgsContactsPerTerritory } from '../schema/query-schema';
import { divisionLoader } from '../data-loaders/division-loader';
import { territoryLoader } from '../data-loaders/territory-loader';
import { contactLoader } from '../data-loaders/contact-loader';
import { Territory, Contact } from '../schema/data-types';
import { IServerContext } from '../IServerContext';

export const queryResolvers = {
  Query: {
    division: async (_: any, {id}: {id: string}) =>
      await divisionLoader.get(id),
    territoriesPerDivision: (_1: any, _2: any, context: IServerContext) =>
      territoryLoader.getAllByDivision(context.divisionId),
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
    division: (root: Territory) => divisionLoader.get(root.division!.id),
    aggregates: () => ({
      countContacts:  (_: any, {divisionCode}: QueryArgsWithCongCode) => {
        console.log('Territory.aggregates resolver', divisionCode);
        return 15;
      }
    })
  },
  Contact: {
    territory: (root: Contact, _: any, context: IServerContext) => territoryLoader.get(context.divisionId, root.territory!.code!),
    division: (root: Contact) => divisionLoader.get(root.division!.code)
  },
};
