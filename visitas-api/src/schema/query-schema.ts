import { gql } from 'apollo-server';

export interface QueryArgsContactsPerTerritory {
  divisionCode: string;
  territoryCode: string;
}

export interface QueryArgsWithCongCode {
  divisionCode: string;
}

export const querySchema = gql`
  type Query {
    division(id: String): Division
    territoriesPerDivision: [Territory]
    contactsPerTerritory(territoryId: String): [Contact]
  }
`;
