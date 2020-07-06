<script>
  import {onMount} from 'svelte';
  import {Link, navigate} from 'svelte-routing';
  import {getClient} from 'svelte-apollo';

  import {initTagsOnMount} from '../common';
  import ContactListFilter from './ContactListFilter.svelte';
  import ContactsEditableTable from './ContactsEditableTable.svelte';
  import * as svcContacts from '../../data-services/contact';
  import * as svcTags from '../../data-services/tags';
  import {contacts$, tags, contactsInitialized} from '../../store';
  import {FrameBox, Button} from '../../design-system';
  import TerritoriesLoader from '../../territory/TerritoriesLoader.svelte';

  import {debounce, everyElemExistsAndViceVersa} from '../../util';

  let filter = {};
  let contacts = [];
  let client = getClient();

  $: supportedTags = $tags.map(data => data.tag);

  $: {
    if (filter.tags && filter.tags.length > 0) {
      contacts = $contacts$.filter(c => everyElemExistsAndViceVersa(filter.tags)(c.tags));
    } else {
      contacts = $contacts$;
    }
  }

  const gotoEditor = () => navigate('/contacts/add?fr=' + encodeURIComponent('/contacts'));

  const onApplyFilter = debounce(e => {
    filter = e.detail;
    svcContacts.getContacts(client, e.detail).then(result => {
      contacts$.set(result.data.contactsPerDivision);
      $contactsInitialized = true;
    });
  }, 500);

  initTagsOnMount();
</script>

<TerritoriesLoader>
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
      <ContactsEditableTable {contacts} loading={false}/>
    </FrameBox>
  </main>
</TerritoriesLoader>

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
</style>