<script>
  import {onMount} from 'svelte';
  import {Router, Route, Link, navigate} from 'svelte-routing';

  import TerritoryEditor from './TerritoryEditor.svelte';
  import FrameBox from '../design-system/FrameBox.svelte';
  import NumberSelector from './NumberSelector.svelte';
  import TerritoryList from './TerritoryList.svelte';
  import * as store from '../store';
  import {OPTIONS_MONTHS, OPTIONS_ADDRESSCOUNT} from './filterOptions';

  const createTerritory = () =>
    navigate(`/territories/add?fr=${encodeURIComponent('/territories')}`);

  const shareList = () => console.log('shareList command');

  const printList = () => console.log('shareList command');

  const editTerritory = event =>
    navigate(`/territories/edit/${encodeURIComponent(event.detail.id)}?fr=${encodeURIComponent('/territories')}`);

  let territories = [];
  onMount(() => {
    const unsubscribe = store.territories$.subscribe(value => territories = value);
    return () => unsubscribe();
  });
</script>

<style>
  main {
    padding: 0px 16px;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  section > :global(div:first-of-type),
  section > :global(div:nth-of-type(2)) {
    min-width: 260px;
  }

  section > :global(div:last-of-type) {
    flex: 1;
  }

  section > div {
    flex: 1;
  }

  section > div > input {
    width: 100%;
  }
</style>

<main>
  <p>
    <Link to="/">&lt;&nbsp;Dashboard</Link>
  </p>
  <section>
    <NumberSelector
      label="Months since last worked on"
      ranges={OPTIONS_MONTHS}/>
    <NumberSelector
      label="Filter by max addresses"
      ranges={OPTIONS_ADDRESSCOUNT}/>
    <div>
      <input placeholder="Search a name or code"/>
      <label>
        <input type="checkbox"/>
        Include checked-out territories
      </label>
    </div>
  </section>
  <div>
    <button on:click={createTerritory}>New territory</button>
    <button on:click={shareList} title="Email function only">Share</button>
    <button on:click={printList}>Print</button>
  </div>
  <FrameBox title="Territories">
    <TerritoryList {territories} on:editTerritory={editTerritory}/>
  </FrameBox>
</main>
