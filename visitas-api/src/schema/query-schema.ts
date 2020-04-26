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
    contactsPerDivision: [Contact]
		tags: [Tag]
  }
`;

export const queryOutputSchema = gql`
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
        contact_info: ContactInfo
        location_data: String
        remarks: String
        territory: Territory
        division: Division
        tags: [String]

        created: Stamp
        updated: Stamp
    }

    type ContactInfo {
        phoneNumber: String
        email: String
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

    type Tag {
        tag: String
    }
`;