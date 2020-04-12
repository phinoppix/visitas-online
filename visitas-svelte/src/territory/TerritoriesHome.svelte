<script>
  import { Link, navigate } from "svelte-routing";
  import { getClient, query } from "svelte-apollo";

  import FrameBox from "../design-system/FrameBox.svelte";
  import NumberSelector from "./NumberSelector.svelte";
  import TerritoryList from "./TerritoryList.svelte";
  import { QUERY_GET_TERRITORIES } from './queries.js';

  const createTerritory = () =>
    navigate(`/territories/add?fr=${encodeURIComponent("/territories")}`);

  const OPTIONS_MONTHS = [
    { key: "all", value: "Any" },
    { key: "3" },
    { key: "6" },
    { key: "9" },
    { key: "10+", value: "10 or more" }
  ];
  const OPTIONS_ADDRESSCOUNT = [
    { key: "all", value: "All addresses" },
    { key: "10" },
    { key: "30" },
    { key: "50" },
    { key: "70+", value: "70 or more" }
  ];

  const client = getClient();
  const territories = query(client, {
    query: QUERY_GET_TERRITORIES,
    variables: {
      divisionCode: 'CA-HEARTLAKE'
    }
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
      ranges={OPTIONS_MONTHS} />
    <NumberSelector
      label="Filter by max addresses"
      ranges={OPTIONS_ADDRESSCOUNT} />
    <div>
      <input placeholder="Search a name or code" />
      <label>
        <input type="checkbox" />
        Include checked-out territories
      </label>
    </div>
  </section>
  <div>
    <button on:click={createTerritory}>New territory</button>
    <button title="Email function only">Share</button>
    <button>Print</button>
  </div>
  <FrameBox title="Territories">
  {#await $territories}
    ...Loading
  {:then result}
    <TerritoryList territories={result.data.territoriesPerDivision}/>
  {/await}
  </FrameBox>
</main>
