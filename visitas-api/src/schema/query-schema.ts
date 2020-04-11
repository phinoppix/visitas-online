import { gql } from 'apollo-server';

export interface QueryArgsContactsPerTerritory {
  congregationCode: string;
  territoryCode: string;
}

export interface QueryArgsWithCongCode {
  congCode: string;
}

export const querySchema = gql`
  type Query {
    congregation(congCode: String): Congregation
    territoriesPerCong(congregationCode: String): [Territory]
    contactsPerTerritory(congregationCode: String, territoryCode: String): [Contact]
  }
`;
