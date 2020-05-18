<script>
  import {createEventDispatcher} from 'svelte';

  import {AddressFinder} from '../../design-system/mapbox';

  export let cancellable = false;
  export let inputAddress = null;

  $: findLocation = typeof inputAddress === 'string' ? inputAddress : inputAddress.place_name;

  const dispatch = createEventDispatcher();
</script>
<AddressFinder {findLocation} on:addressFinder_result/>
{#if cancellable}
  <div>
    <div class="confirm-panel">
      <button type="button" on:click={() => dispatch('update_address')}>Update</button>
      <button type="button" on:click={() => dispatch('cancel_address')}>Cancel</button>
    </div>
  </div>
{/if}