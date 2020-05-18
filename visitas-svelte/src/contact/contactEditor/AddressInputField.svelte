<script>
  import {createEventDispatcher} from 'svelte';

  import AddressFinderField from './AddressFinderField.svelte';
  import AddressMigrationField from './AddressMigrationField.svelte';
  import {STATE_MIGRATING, STATE_VERIFYING, STATE_UNKNOWN, STATE_EDITING} from './common';

  export let inputAddress = null;  // string | object
  export let initState = STATE_UNKNOWN; // STATE_MIGRATING | STATE_EDITING

  $: currentState = initState;

  const dispatch = createEventDispatcher();

  let addressFinderResult = null;

  function onAddressFinderResult(e) {
    addressFinderResult = e.detail;
    if (currentState === STATE_EDITING) {
      dispatch('confirm_address', {addressFinderResult});
    }
  }

  function onUpdateAddress() {
    dispatch('confirm_address', {addressFinderResult});
  }
</script>

<label>
  Address ({currentState}):
    {#if currentState === STATE_MIGRATING}
      <AddressMigrationField
        address_migration={inputAddress}
        on:verify_address={() => currentState = STATE_VERIFYING}/>
    {:else}
      <AddressFinderField
        cancellable={currentState === STATE_VERIFYING}
        {inputAddress}
        on:update_address={onUpdateAddress}
        on:cancel_address={() => currentState = STATE_MIGRATING}
        on:addressFinder_result={onAddressFinderResult}
      />
    {/if}
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
  }
</style>