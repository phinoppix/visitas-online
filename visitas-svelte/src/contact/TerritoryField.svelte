<script>
  import {onMount, createEventDispatcher} from 'svelte';

  import {Button} from '../design-system';
  import * as store from '../store';

  export let contactId = '';
  export let territoryId = null;
  export let territoryName = '';

  const dispatch = createEventDispatcher();

  let editing = false;
  let options = [];
  let origTerritoryId = '';

  const changeClick = () => {
    editing = true;
    origTerritoryId = territoryId;
  }

  const assignClick = () => {
    editing = false;
    const finalId = territoryId || options[0].id;
    if (origTerritoryId !== finalId) {
      dispatch('assigning', {
        contactId,
        territoryId: finalId
      });
    }
  }

  const unassignClick = () => {
    editing = false;
    if (territoryId) {
      dispatch('unAssigning', {contactId});
    }
  }

  onMount(() => {
    store.territories$.subscribe(list => {
      options = list.map(t => ({
        id: t.id,
        code: t.code,
        name: t.name
      }));
      origTerritoryId = territoryId;
    });
  });
</script>

{#if editing}
  <select bind:value={territoryId}>
      {#each options as opt}
        <option value={opt.id} selected={opt.id === territoryId}>{opt.code} - {opt.name}</option>
      {/each}}
  </select>
  <div>
    <Button on:click={unassignClick}>clear</Button>
    <Button on:click={assignClick}>assign</Button>
    <Button on:click={() => editing = false}>cancel</Button>
  </div>
{:else}
  <span>
    {territoryName || '(not set)'} <a href="javascript:void(0)" on:click={changeClick}>[ change ]</a>
</span>
{/if}


<style>
  div {
    display: flex;
    flex-direction: row;
  }

  :global(button) {
    font-size: small;
  }
</style>