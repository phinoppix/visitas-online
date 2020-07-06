<script>
  import {onMount} from 'svelte';
  import {navigate} from 'svelte-routing';

  import {upsertTerritory, removeTerritory} from '../data-services/territory';
  import {territories$} from '../store';
  import {InlineAlert, FrameBox, InputField, Button} from '../design-system';
  import Map from './Map.svelte';
  import TerritoriesLoader from './TerritoriesLoader.svelte';

  export let edit_id = '';

  let inputCode = '';
  let inputName = '';
  let message = '';
  let canDelete = false;

  const urlCaller = new URLSearchParams(window.location.search).get('fr');

  const cancelClick = () => navigate(urlCaller);

  const removeClick = async () => {
    if (!confirm('Are you sure you want to remove this territory?')) return;
    try {
      removeTerritory(edit_id);
      navigate(urlCaller);  // TODO: Will revisit once we start supporting territory map boundaries
    } catch (e) {
      message = error.message;
      console.error('saveTerritory failed', error);
    }
  };

  const saveTerritory = async () => {
    try {
      await upsertTerritory(edit_id, inputCode, inputName);
      navigate(urlCaller);  // TODO: Will revisit once we start supporting territory map boundaries
    } catch (error) {
      message = error.message;
      console.error('saveTerritory failed', error);
    }
  };

  const dismissAlert = () => message = '';

  onMount(() => {
    const unsubscribe = territories$.subscribe(list => {
      const territory = list.find(t => t.id === edit_id);
      if (!territory) return;
      inputCode = territory.code;
      inputName = territory.name;
      canDelete = true;
    });
    return () => unsubscribe();
  });
</script>

<style>
  main {
    display: flex;
    flex-direction: row;
    height: calc(100% - 72px);
  }

  main > div:first-of-type {
    min-width: 300px;
    width: 35%;
    padding: 12px;
  }

  main > div:last-of-type {
    flex: 1;
  }

  .left :global(.small-title) {
    font-size: 16px;
  }

  main > div > div {
    padding: 24px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
<TerritoriesLoader>
  <InlineAlert {message} on:dismissAlert={dismissAlert}/>
  <main>
    <div class="left">
      <InputField text="Code:" bind:value={inputCode} maxlength="30"/>
      <InputField text="Name:" bind:value={inputName} maxlength="50"/>
      <div>
        <Button on:click={saveTerritory}>Save</Button>
        <Button on:click={cancelClick}>Cancel</Button>
          {#if canDelete}
            <Button on:click={removeClick} class="caution">Remove territory</Button>
          {/if}
      </div>
      <FrameBox title="Recent activities" titleClass="small-title">
        <p>Content here</p>
      </FrameBox>
      <FrameBox title="Addresses (count: 64)" titleClass="small-title">
        <p>Content here</p>
      </FrameBox>
    </div>
    <div>
      <Map/>
    </div>
  </main>
</TerritoriesLoader>