<script>
  import {onMount} from 'svelte';
  import {navigate} from 'svelte-routing';

  import {InlineAlert, InputField, Button, TextareaField} from '../design-system';
  import TagFilters from './TagFilters.svelte';
  import {upsertContact, rehydrateContacts, removeContact} from '../data-services/contact';
  import * as store from '../store';

  export let edit_id = '';

  let inputName = '';
  let inputAddress = '';
  let inputPhoneNumber = '';
  let inputRemarks = '';
  let message = '';
  let canDelete = false;
  let inputTags = [];

  const urlCaller = new URLSearchParams(window.location.search).get('fr');

  const saveClick = async () => {
    const inputContact = {
      id: edit_id,
      name: inputName,
      full_address: inputAddress,
      phoneNumber: inputPhoneNumber,
      email: null,
      remarks: inputRemarks,
      tags: inputTags
    };
    try {
      await upsertContact(inputContact);
      navigate(urlCaller);  // TODO: Will revisit once we start supporting contact map boundaries
    } catch (error) {
      message = error.message;
      console.error('saveTerritory failed', error);
    }
  }

  const cancelClick = () => navigate('/contacts');

  const removeClick = () => {
    if (!confirm('Are you sure you want to remove this contact profile?')) return;
    try {
      removeContact(edit_id);
      navigate(urlCaller);  // TODO: Will revisit once we start supporting territory map boundaries
    } catch(e) {
      message = error.message;
      console.error('saveTerritory failed', error);
    }
  }

  const dismissAlert = () => message = '';

  onMount(async () => {
    await rehydrateContacts();
    const unsubscribe = store.contacts$.subscribe(list => {
      const contact = list.find(c => c.id === edit_id);
      if (!contact) return;
      inputName = contact.name;
      inputAddress = contact.full_address;
      inputPhoneNumber = contact.contact_info && contact.contact_info.phoneNumber;
      inputTags = contact.tags || [];
      inputRemarks = contact.remarks;
      canDelete = true;
    });
    return () => unsubscribe();
  });
</script>

<main>
  <InlineAlert {message} on:dismissAlert={dismissAlert}/>
  <section>
    <InputField text="Name" bind:value={inputName}/>
    <InputField text="Address" bind:value={inputAddress}/>
    <InputField text="Phone number" bind:value={inputPhoneNumber}/>
    <TextareaField text="Remarks" bind:value={inputRemarks}/>
    <p>Tags:</p>
    <TagFilters bind:tags={inputTags}/>
  </section>
  <div>
    <Button on:click={saveClick}>Save</Button>
    <Button on:click={cancelClick}>Cancel</Button>
      {#if canDelete}
        <Button on:click={removeClick} class="caution">Remove contact</Button>
      {/if}
  </div>
</main>

<style>
  main {
    padding: 8px;
  }

  section {
    max-width: 600px;
  }

  main > div {
    display: flex;
    flex-direction: row;
    padding-top: 12px;
  }
</style>