<script>
  import {onMount, createEventDispatcher} from 'svelte';

  import {isEmptyOrNil} from '../../util';
  import AddressFinderField from './AddressFinderField.svelte';
  import AddressMigrationField from './AddressMigrationField.svelte';

  export let inputAddressMigration = '';
  export let inputAddressData = null;

  const AddressFieldType = {
    migration: 'migration',
    finder: 'finder',
    finderCancellable: 'finder-cancellable'
  };

  const dispatch = createEventDispatcher();

  let addressFieldType = AddressFieldType.migration; // migration | map | map-cancellable
  let addressFinderResult = null;

  onMount(() => {
    addressFieldType = isEmptyOrNil(inputAddressMigration) ? AddressFieldType.migration : AddressFieldType.finder;
  });

  function onAddressFinderResult(e) {
    addressFinderResult = e.detail;
    if (addressFieldType === AddressFieldType.finder) {
      dispatch('confirm_address', {addressFinderResult});
    }
  }

  function onUpdateAddress() {
    dispatch('confirm_address', {addressFinderResult});
  }
</script>

<label>
  Address:
    {#if addressFieldType === AddressFieldType.migration}
      <AddressMigrationField
        address_migration={inputAddressMigration}
        on:verify_address={() => addressFieldType = AddressFieldType.finderCancellable}/>
    {:else}
      <AddressFinderField
        cancellable={addressFieldType === AddressFieldType.finderCancellable}
        findLocation={inputAddressMigration || inputAddressData}
        on:update_address={onUpdateAddress}
        on:cancel_address={() => addressFieldType = AddressFieldType.migration}
        on:addressFinder_result={onAddressFinderResult}
      />
    {/if}
</label>