<script>
  import {navigate} from 'svelte-routing';

  import TerritoryField from './TerritoryField.svelte';
  import * as svcContacts from '../../data-services/contact';
  import {Button} from '../../design-system';

  export let contacts = [];
  export let loading = false;

  const editContact = id => {
    navigate(`/contacts/edit/${encodeURIComponent(id)}?fr=${encodeURIComponent('/contacts')}`);
  };

  const assignTerritory = e => {
    const {contactId, territoryId} = e.detail;
    svcContacts.assignTerritory(contactId, territoryId);
  }

  const unAssignTerritory = e => {
    svcContacts.unassignTerritory(e.detail.contactId);
  }
</script>

<table>
  <thead>
  <tr>
    <th>Address</th>
    <th>Name</th>
    <th>Phone Number</th>
    <th>Tags</th>
    <th>Territory</th>
    <th>&nbsp;</th>
  </tr>
  </thead>
  <tbody>
  {#if loading}
    <p>Loading...</p>
  {/if}
  {#each contacts as contact (contact.id)}
    <tr>
      <td>{(contact.address && contact.address.place_name) || contact.address_migration}</td>
      <td>{contact.name}</td>
      <td>{contact.contact_info && contact.contact_info.phoneNumber}</td>
      <td>{contact.tags}</td>
      <td>
        <TerritoryField
          contactId={contact.id}
          territoryId={contact.territory && contact.territory.id}
          territoryName={contact.territory && `${contact.territory.code} - ${contact.territory.name}`}
          on:assigning={assignTerritory}
          on:unAssigning={unAssignTerritory}
        />
      </td>
      <td>
        <Button on:click={() => editContact(contact.id)}>edit</Button>
      </td>
    </tr>
  {/each}
  </tbody>
    {#if contacts.length === 0}
      <tfoot>No records found</tfoot>
    {/if}
</table>

<style>
  table {
    width: 100%;
  }

  th {
    text-align: left;
    padding: 8px 16px;
  }

  td {
    padding: 0px 16px;
  }
</style>