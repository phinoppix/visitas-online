<script>
  import {createEventDispatcher} from 'svelte';

  export let address_migration = '';
  export let className = '';

  const dispatch = createEventDispatcher();

</script>
<div class={className}>
  <input bind:value={address_migration} disabled/>
  <button on:click={() => dispatch('verify_address')}>verify</button>
</div>
