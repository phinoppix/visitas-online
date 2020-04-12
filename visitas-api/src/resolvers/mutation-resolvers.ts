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

export const mutationResolvers = {
  Mutation: {
    addDivision: (_: any, args: { division: InputAddDivision }) => divisionMutator.add(args.division),

    // Territory mutations
    upsertTerritory: async (_: any, args: { territory: InputUpsertTerritory }) =>
      await territoryMutator.upsertTerritory(args.territory),
    removeTerritory: (_: any, args: { territoryCode: string }): MutationResponse => ({
      status: "KO",
      error: "Not yet implemented."
    }),
    voidTerritory: (_: any, args: { territoryCode: string }): MutationResponse => ({
      status: "KO",
      error: "Not yet implemented."
    }),
    checkoutTerritory: (_: any, args: { territoryCode: string, publisher: Stamp }) => null,
    setTerritoryBounds: (_: any, args: { territoryCode: string, boundaries: [GeoCoordinates] }) => null,

    // Contact mutations
    upsertContact: (_: any, args: {contact: InputUpsertContact}) => contactMutator.upsertContact(args.contact),
    assignTerritoryForContact: (_: any, args: {contactId: string, territoryCode: string}) => null,
    removeContactFromTerritory: (_: any, args: {contactId: string, territoryCode: string}) => null,
    setStatusForContact: (_: any, args: {contactCode: string, status: string}) => null
  }
};
