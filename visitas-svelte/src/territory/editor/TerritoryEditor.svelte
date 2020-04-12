<script>
  import { navigate } from "svelte-routing";
  import { getClient, mutate } from "svelte-apollo";

  import FrameBox from "../../design-system/FrameBox.svelte";
  import { QUERY_UPSERT_TERRITORY } from '../queries.js';

  let inputCode = '';
  let inputName = '';

  const urlCaller = new URLSearchParams(window.location.search).get("fr");

  const cancelClick = () => navigate(urlCaller);

  const client = getClient();
  const saveTerritory = async () => {
    try {
      const territory = await mutate(client, {
        mutation: QUERY_UPSERT_TERRITORY,
        variables: {
          territory: {
            code: inputCode,
            name: inputName,
            boundaries: [],
            updated: {
              by: 'aris',
              date: new Date()
            }
          }
        }
      });
      navigate(urlCaller);
    } catch (error) {
      console.log('saveTerritory failed', error);
    }
  };
</script>

<style>
  main {
    display: flex;
    flex-direction: row;
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
  label > input {
    margin-left: 1em;
  }
  main > div > div {
    padding: 24px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  label {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  label > input {
    flex: 1;
    max-width: 70%;
  }
</style>

<main>
  <div class="left">
    <label>
      Code:
      <input bind:value={inputCode} maxlength="30"/>
    </label>
    <label>
      Name:
      <input bind:value={inputName}  maxlength="50"/>
    </label>
    <div>
      <button on:click={saveTerritory}>Save</button>
      <button on:click={cancelClick}>Cancel</button>
    </div>
    <FrameBox title="Recent activities" titleClass="small-title">
      <p>Content here</p>
    </FrameBox>
    <FrameBox title="Addresses (count: 64)" titleClass="small-title">
      <p>Content here</p>
    </FrameBox>
  </div>
  <div>map here</div>
</main>
