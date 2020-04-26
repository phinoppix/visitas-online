import {
  InputAddDivision,
  InputUpsertTerritory,
  MutationResponse,
  InputUpsertContact
} from '../schema/mutation-types';
import { divisionMutator } from '../data-mutators/division-mutator';
import { territoryMutator } from '../data-mutators/territory-mutator';
import { Stamp, GeoCoordinates } from '../schema/data-types';
import { contactMutator } from '../data-mutators/contact-mutator';
import { IServerContext } from '../IServerContext';

export const mutationResolvers = {
  Mutation: {
    addDivision: (_: any, args: { division: InputAddDivision }) => divisionMutator.add(args.division),

    // Territory mutations
    upsertTerritory: async (_: any, args: { territory: InputUpsertTerritory }, context: IServerContext) =>
      await territoryMutator.upsertTerritory(
        context.divisionId,
        args.territory),
    removeTerritory: async (_: any, args: { territoryId: string }, context: IServerContext) =>
      await territoryMutator.removeTerritory(
        context.divisionId,
        args.territoryId),
    // voidTerritory: (_: any, args: { territoryCode: string }): MutationResponse => ({
    //   status: "KO",
    //   error: "Not yet implemented."
    // }),
    // checkoutTerritory: (_: any, args: { territoryCode: string, publisher: Stamp }) => null,
    // setTerritoryBounds: (_: any, args: { territoryCode: string, boundaries: [GeoCoordinates] }) => null,

    // Contact mutations
    upsertContact: async (_: any, args: {contact: InputUpsertContact}, context: IServerContext) =>
			await contactMutator.upsertContact(context.divisionId, args.contact),
		removeContact: async (_: any, args: {contactId: string}, context: IServerContext) =>
			await contactMutator.removeContact(context.divisionId, args.contactId)
    // removeContactFromTerritory: (_: any, args: {contactId: string, territoryCode: string}) => null,
    // assignTerritoryForContact: (_: any, args: {contactId: string, territoryCode: string}) => null,
    // setStatusForContact: (_: any, args: {contactCode: string, status: string}) => null
  }
};
