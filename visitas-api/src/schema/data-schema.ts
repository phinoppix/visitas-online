import { gql } from 'apollo-server';

export const dataSchema = gql`
  type Stamp {
    by: String
    date: String
  }
  
  type GeoCoordinates {
    latitude: Float
    longitude: Float
  }
  
  type CongregationAggregates {
    countTerritories: Int
  }
  
  type Congregation {
    code: String!
    name: String!
    created: Stamp
    updated: Stamp
    territories: [Territory]
    aggregates: CongregationAggregates
  }
  
  type Contact {
    name: String!
    full_address: String
    location_data: String
    status: String!
    remarks: String
    created: Stamp
    updated: Stamp
    territory: Territory
    congregation: Congregation
  }
  
  type CheckoutEntry {
    userId: String!
    checkOut: String!
    checkIn: String
    created: Stamp
    updated: Stamp
  }
  
  type TerritoryAggregates {
    countContacts: Int
  }
  
  type Territory {
    code: String!
    name: String
    boundaries: [GeoCoordinates]
    congregation: Congregation!
    created: Stamp
    updated: Stamp
    contacts: [Contact]
    checkouts: [CheckoutEntry]
    aggregates: TerritoryAggregates
  }
`;
