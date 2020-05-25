import {gql} from 'apollo-boost';

export const MUTATION_UPSERT_CONTACT = gql`
    mutation UpsertContact($contact: InputUpsertContact) {
        upsertContact(contact: $contact) {
            id
            name
            address_migration
            contact_info {
                phoneNumber
                email
            }
            tags
            remarks
            territory {
                id
                code
                name
            }
            division {
                id
            }
            address {
                st_number
                st_name
                cityTown
                stateProvince
                country
                postalCode
                jsonData
                jsonDataProvider
								place_name
            }
        }
    }
`;

export const QUERY_CONTACTS = gql`
    query FindContacts($filter: ContactsFilter) {
        contactsPerDivision(filter: $filter) {
            id
            name
            address_migration
            contact_info {
                phoneNumber
                email
            }
            tags
            remarks
            territory {
                id
                code
                name
            }
            division {
                id
            }
            address {
                st_number
                st_name
                cityTown
                stateProvince
                country
                postalCode
                jsonData
                jsonDataProvider
                place_name
            }
        }
    }
`;

export const MUTATION_REMOVE_CONTACT = gql`
    mutation RemoveContact($contactId: String) {
        removeContact(contactId: $contactId) {
            status
            error
        }
    }
`;

export const MUTATION_CONTACT_ASSIGN_TERRITORY = gql`
    mutation AssignTerritory($contactId: String, $territoryId: String) {
        contactAssignTerritory(contactId: $contactId, territoryId: $territoryId) {
            id
            name
            address_migration
            contact_info {
                phoneNumber
                email
            }
            tags
            remarks
            territory {
                id
                code
                name
            }
            division {
                id
            }
            address {
                st_number
                st_name
                cityTown
                stateProvince
                country
                postalCode
                jsonData
                jsonDataProvider
                place_name
            }
        }
    }
`;

export const MUTATION_CONTACT_UNASSIGN_TERRITORY = gql`
    mutation Unassign($contactId: String){
        contactUnassignTerritory(contactId: $contactId) {
            id
            name
            address_migration
            contact_info {
                phoneNumber
                email
            }
            tags
            remarks
            territory {
                id
                code
                name
            }
            division {
                id
            }
            address {
                st_number
                st_name
                cityTown
                stateProvince
                country
                postalCode
                jsonData
                jsonDataProvider
                place_name
            }
        }
    }
`;