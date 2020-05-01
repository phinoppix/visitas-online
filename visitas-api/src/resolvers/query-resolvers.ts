import { QueryArgsWithCongCode, QueryArgsContactsPerTerritory } from '../schema/query-schema';
import { divisionLoader } from '../data-loaders/division-loader';
import * as territoryLoader from '../data-loaders/territory-loader';
import { contactLoader } from '../data-loaders/contact-loader';
import { Territory, Contact } from '../schema/data-types';
import { IServerContext } from '../IServerContext';
import { tagsLoader } from '../data-loaders/tags-loader';

export const queryResolvers = {
  Query: {
    division: async (_: any, {id}: {id: string}) =>
      await divisionLoader.get(id),
    territoriesPerDivision: (_1: any, _2: any, context: IServerContext) =>
      territoryLoader.getAllByDivision(context.divisionId),
		contactsPerDivision: async (_: any, _2: any, context: IServerContext) =>
      await contactLoader.getContactsPerDivision(context.divisionId),
		tags: (_1: any, _2: any, context: IServerContext) =>
			tagsLoader.get(context.divisionId)
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
    territory: (root: Contact, _: any, context: IServerContext) =>
			root.territory || territoryLoader.get(context.divisionId, root.territory && root.territory!.id!),
    division: (root: Contact) => {
    	console.log('queryResolver.root@Contact.division', {root});
    	return root.division || divisionLoader.get(root.division!.code);
		}
  },
};
