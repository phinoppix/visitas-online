import {gql} from 'apollo-boost';

export const QUERY_UPSERT_CONTACT = gql`
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
        }
    }
`;

export const QUERY_REMOVE_CONTACT = gql`
    mutation RemoveContact($contactId: String) {
        removeContact(contactId: $contactId) {
            status
            error
        }
    }
`;