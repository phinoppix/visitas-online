import { Contact } from '../schema/data-types';
import fixtures from '../assets/fixtures';

export const contactLoader = {
  getList: (divisionCode: string, territoryCode: string) => fixtures.contacts
};