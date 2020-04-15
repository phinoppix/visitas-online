import { InputUpsertContact } from '../schema/mutation-types';
import fixtures from '../assets/fixtures';
import { Contact } from '../schema/data-types';

export const contactMutator = {
  upsertContact: (contact: InputUpsertContact) => {
    const newContact: Contact = {
      name: contact.name,
      full_address: contact.full_address,
      location_data: contact.location_data,
      division: {
        id: '',
        code: contact.division?.code!
      },
      remarks: contact.remarks,
      status: contact.status,
      created: contact.updated // created, only if contact doesn't exist yet
    };
    fixtures.contacts.push(newContact);
    return newContact;
  }
};