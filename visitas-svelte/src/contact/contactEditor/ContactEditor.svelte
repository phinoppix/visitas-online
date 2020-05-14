<script>
  import {onMount} from 'svelte';
  import {navigate} from 'svelte-routing';

  import {InlineAlert, InputField, Button, TextareaField} from '../../design-system';
  import TagFilters from '../TagFilters.svelte';
  import {upsertContact, rehydrateContacts, removeContact} from '../../data-services/contact';
  import * as store from '../../store';
  import AddressInputField from './AddressInputField.svelte';

  export let edit_id = '';

  let inputName = '';
  let inputPhoneNumber = '';
  let inputEmail = '';
  let inputRemarks = '';
  let inputTags = [];
  let inputAddressMigration = '';
  let inputAddressData = null;

  let message = '';
  let canDelete = false;

  const urlCaller = new URLSearchParams(window.location.search).get('fr');

  const saveClick = async () => {
    const inputContact = {
      id: edit_id,
      name: inputName,
      phoneNumber: inputPhoneNumber,
      email: inputEmail,
      remarks: inputRemarks,
      tags: inputTags,
      address_migration: inputAddressMigration
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
    } catch (e) {
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
      inputPhoneNumber = contact.contact_info && contact.contact_info.phoneNumber;
      inputTags = contact.tags || [];
      inputRemarks = contact.remarks;
      inputAddressMigration = contact.address_migration;
      inputEmail = contact.contact_info.email;
      canDelete = true;
    });
    return () => unsubscribe();
  });

  const onConfirmAddress = e => {
  	console.log('onConfirmAddress', e);
  }
</script>

<main>
  <InlineAlert {message} on:dismissAlert={dismissAlert}/>
  <section>
    <InputField text="Name" bind:value={inputName}/>
    <AddressInputField {inputAddressMigration} on:confirm_address={onConfirmAddress} />
    <InputField text="Phone number" bind:value={inputPhoneNumber}/>
    <InputField text="Email" bind:value={inputEmail} type="email"/>
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