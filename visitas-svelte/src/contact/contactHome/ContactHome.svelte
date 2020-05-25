<script>
  import {onMount} from 'svelte';
  import {Link, navigate} from 'svelte-routing';

  import * as svcContacts from '../../data-services/contact';
  import * as svcTags from '../../data-services/tags';
  import {contacts$, tags$} from '../../store';
  import TerritoryField from './TerritoryField.svelte';
  import {FrameBox, Button} from '../../design-system';
  import ContactListFilter from './ContactListFilter.svelte';
  import {debounce, everyElemExistsAndViceVersa} from '../../util';

  let filter = {};
  let contacts = [];
  let supportedTags = [];

  const gotoEditor = () => navigate('/contacts/add?fr=' + encodeURIComponent('/contacts'));

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

  const onApplyFilter = debounce(e => {
    filter = e.detail;
    svcContacts.getContacts(e.detail);
  }, 500);

  onMount(() => {
    // NOTE: Client-side filtering of the contact list is a temporary solution.
    const unsubContacts = contacts$.subscribe(list => {
      console.log('subscribe', {list, filter});
      if (filter.tags && filter.tags.length > 0) {
        contacts = list.filter(c => everyElemExistsAndViceVersa(filter.tags)(c.tags));
      } else {
        contacts = list;
      }
    });

    const unsubTags = tags$.subscribe(data => supportedTags = data.map(t => t.tag).sort());

    return () => {
      unsubContacts();
      unsubTags();
    }
  });
</script>

<main>
  <p>
    <Link to="/">&lt;&nbsp;Dashboard</Link>
  </p>
  <section>
    <ContactListFilter on:applyFilter={onApplyFilter} {supportedTags}/>
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