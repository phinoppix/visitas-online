import { gql } from 'apollo-server';

export const dataSchema = gql`
  type Stamp {
    by: String
    date: String
  }
  
  interface IStampableEntity {
    created: Stamp
    updated: Stamp
  }
  
  type GeoCoordinates {
    latitude: Float
    longitude: Float
  }
  
  type DivisionAggregates {
    countTerritories: Int
  }
  
  type Division implements IStampableEntity {
    id: String!
    code: String!
    name: String
    territories: [Territory]
    aggregates: DivisionAggregates
    
    created: Stamp
    updated: Stamp
  }
  
  type Contact implements IStampableEntity {
    id: String!
    name: String!
    full_address: String
    location_data: String
    status: String!
    remarks: String
    territory: Territory
    division: Division
    
    created: Stamp
    updated: Stamp
  }
  
  type CheckoutEntry implements IStampableEntity {
    userId: String!
    checkOut: String
    checkIn: String
    
    created: Stamp
    updated: Stamp
  }
  
  type TerritoryAggregates {
    countContacts: Int
    checkedOut: String
  }
  
  type CampaignMetadata {
    name: String
    starts: String
    ends: String
  }
  
  type Territory implements IStampableEntity {
    id: String!
    code: String!
    name: String
    boundaries: [GeoCoordinates]
    division: Division!
    contacts: [Contact]
    checkouts: [CheckoutEntry]
    aggregates: TerritoryAggregates
    campaign: CampaignMetadata
    valid: Boolean!
    
    created: Stamp
    updated: Stamp
  }
`;
