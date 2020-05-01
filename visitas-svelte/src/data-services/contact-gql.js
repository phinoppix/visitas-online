import {gql} from 'apollo-boost';

export const MUTATION_UPSERT_CONTACT = gql`
    mutation UpsertContact($contact: InputUpsertContact) {
        upsertContact(contact: $contact) {
            id
            name
            full_address
            contact_info {
                phoneNumber
                email
            }
            remarks
            tags
        }
    }
`;

export const QUERY_CONTACTS = gql`
    {
        contactsPerDivision {
            id
            name
            full_address
            contact_info {
                phoneNumber
                email
            }
            remarks
            tags
            territory {
                id
								code
                name
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
            full_address
            contact_info {
                phoneNumber
            }
            remarks
            territory {
                id
                code
                name
            }
            division {
                id
                name
            }
            tags
        }
    }
`;

export const MUTATION_CONTACT_UNASSIGN_TERRITORY = gql`
    mutation Unassign($contactId: String){
        contactUnassignTerritory(contactId: $contactId) {
            id
            name
            full_address
            contact_info {
                phoneNumber
            }
            remarks
            territory {
                id
                code
                name
            }
            division {
                id
                name
            }
            tags
        }
    }
`;