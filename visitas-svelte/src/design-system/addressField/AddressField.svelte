<script>
  import {onMount} from 'svelte';
  import mapbox from 'mapbox-gl';
  import {isEmptyOrNil} from '../../util';
  import {parseAddress} from '../../util-address';

  export let addressData = {};
  export let unverifiedAddress = '';

  let geocoder = {};
  let parsedLocation = null;
  let inputAptNumber = '';

  let mapMode = false;

  let showUnverified;
  $: showUnverified = !mapMode && !isEmptyOrNil(unverifiedAddress);

  onMount(() => {
    geocoder = new MapboxGeocoder({
      accessToken: mapbox.accessToken,
      types: 'postcode,address',
      countries: appEnv.mapCountry
      // getItemValue: item => {
      //   inputAddress = {
      //     ...item
      //   };
      //   parsedLocation = parseAddress(item.place_name);
      //   return item.place_name;
      // }
    });
    geocoder.on('result', data => {
      console.log('on.result', data);
      // inputAddress = data.result;
      // parsedLocation = parseAddress(item.place_name);
    });
  });

  function toggleSearch(showSearch) {
    showUnverified = !showSearch;
    if (showSearch) {
      geocoder.addTo('#address-field');
      geocoder.query(unverifiedAddress);
    }
  }
</script>

<label>
  Address:
  <div class={!showUnverified ? 'hidden': ''}>
    <input bind:value={unverifiedAddress} disabled/>
    <button on:click={() => toggleSearch(true)}>verify</button>
  </div>
  <div class={showUnverified ? 'hidden': ''}>
    <div id="address-field"></div>
      {#if parsedLocation}
        <label class="sub">
          Apt Number:
          <input bind:value={inputAptNumber}/>
        </label>
        <label>
          Street Number:
          <div>{parsedLocation.streetNumber}</div>
        </label>
        <label>
          Street Name:
          <div>{parsedLocation.streetName}</div>
        </label>
        <label>
          City/Town:
          <div>{parsedLocation.cityTown}</div>
        </label>
        <label>
          Province/State:
          <div>{parsedLocation.provinceState}</div>
        </label>
        <label>
          Postal Code:
          <div>{parsedLocation.postalCode}</div>
        </label>
        <label>
          Country:
          <div>{parsedLocation.country}</div>
        </label>
        <div class="confirm-panel">
          <button type="button">Update</button>
          <button type="button">Cancel</button>
        </div>
      {/if}
  </div>
</label>

<style>
  label.main {
    padding: 4px 0px 4px 0px;
  }

  label.sub {
    padding: 4px 0px 4px 0px;
  }

  label {
    padding: 4px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  #address-field {
    flex: 1;
    max-width: 70%;
  }

  #address-field > :global(.mapboxgl-ctrl-geocoder) {
    width: unset;
    max-width: unset;
  }

  .input-group {
    display: flex;
    flex-direction: row;
    flex: 1;
    max-width: 70%;
  }

  .input-group > input {
    flex: 1;
  }

  div.confirm-panel {
    flex: 1;
    display: flex;
    flex-direction: row;
  }

  .hidden {
    display: none;
  }
</style>