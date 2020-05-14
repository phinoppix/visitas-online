<script>
  import {onMount} from 'svelte';
  import {Link, navigate} from 'svelte-routing';

  import * as svc from '../data-services/contact';
  import {contacts$} from '../store';
  import TagFilters from './TagFilters.svelte';
  import TerritoryField from './TerritoryField.svelte';
  import {InputField, FrameBox, Button} from '../design-system';

  let filterTerritory = '';

  const gotoEditor = () => navigate('/contacts/add?fr=' + encodeURIComponent('/contacts'));

  const editContact = id => {
    navigate(`/contacts/edit/${encodeURIComponent(id)}?fr=${encodeURIComponent('/contacts')}`);
  };

  const assignTerritory = e => {
    const {contactId, territoryId} = e.detail;
    svc.assignTerritory(contactId, territoryId);
  }

  const unAssignTerritory = e => {
    svc.unassignTerritory(e.detail.contactId);
  }

  onMount(async () => {
    await svc.rehydrateContacts(true);
  });
</script>

<main>
  <p>
    <Link to="/">&lt;&nbsp;Dashboard</Link>
  </p>
  <section>
    <InputField text="Territory" bind:value={filterTerritory}/>
    <TagFilters/>
    <p>
      <Button on:click={gotoEditor}>New contact</Button>
    </p>
  </section>
  <FrameBox title="Contacts">
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
      {#each $contacts$ as contact (contact.id)}
        <tr>
          <td>{contact.address_migration}</td>
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
    </table>
  </FrameBox>
</main>

<style>
  main {
    padding: 12px;
  }

  label {
    display: flex;
    flex-direction: row;
  }

  input {
    max-width: 400px;
  }

  :global(.tag-filters-box) {
    max-width: 500px;
  }

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