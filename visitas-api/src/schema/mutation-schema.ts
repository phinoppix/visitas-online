import { gql } from 'apollo-server';

export const mutationSchema = gql`
	type Mutation {
			addDivision(division: InputAddDivision): Division

			# Territory mutations
			upsertTerritory(territory: InputUpsertTerritory): Territory
			removeTerritory(territoryId: String): MutationResponse
			#    voidTerritory(territoryCode: String): MutationResponse
			#    checkoutTerritory(territoryCode: String, publisher: InputStamp): Territory
			#    setTerritoryBounds(territoryCode: String, boundaries: [InputGeoCoordinates]): Territory

			# Contact mutations
			upsertContact(contact: InputUpsertContact): Contact
			removeContact(contactId: String): MutationResponse
			contactAssignTerritory(contactId: String, territoryId: String): Contact
			contactUnassignTerritory(contactId: String): Contact
			#    assignTerritoryForContact(contactId: String, territoryCode: String): Contact
			#    setStatusForContact(contactCode: String, status: String): MutationResponse
	}

  type MutationResponse {
    status: String!
    error: String
  }
  
  input InputStamp {
    by: String
    date: String
  }
  
  input InputCode {
    code: String
  }
  
  input InputGeoCoordinates {
    latitude: Float
    longitude: Float
  }
  
  input InputAddDivision {
    code: String
    name: String
  }

  input InputUpsertTerritory {
    id: String
    code: String
    name: String
    boundaries: [InputGeoCoordinates]
    updated: InputStamp
  }

	input InputTags {
		tag: String
	}

  input InputUpsertContact {
		id: String
    name: String!
    full_address: String
    location_data: String
		phoneNumber: String
		email: String
    remarks: String
		tags: [String]
  }
`;