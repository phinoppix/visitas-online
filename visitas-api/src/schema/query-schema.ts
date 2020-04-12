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
    division(divisionCode: String): Division
    territoriesPerDivision(divisionCode: String): [Territory]
    contactsPerTerritory(divisionCode: String, territoryCode: String): [Contact]
  }
`;
