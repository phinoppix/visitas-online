import { gql } from 'apollo-boost';

export const QUERY_GET_TERRITORIES = gql`
query GetTerritories($divisionCode: String!) {
  territoriesPerDivision(divisionCode: $divisionCode) {
    code
    name
  }
}
`;

export const QUERY_UPSERT_TERRITORY = gql`
mutation UpsertTerritory($territory: InputUpsertTerritory!) {
  upsertTerritory(territory: $territory) {
    code
    name
    boundaries {
      latitude
      longitude
    }
    division {
      code
      name
    }
    aggregates {
      countContacts
      checkedOut
    }
    campaign {
      name
      starts
      ends
    }
    valid
    created {
      by
      date
    }
    updated {
      by
      date
    }
  }
}
`;

export const QUERY_REMOVE_TERRITORY = gql`
mutation RemoveTerritory($territoryCode: String) {
  removeTerritory(territoryCode: $territoryCode) {
    status
    error
  }
}
`;