<script>
  import {onMount} from 'svelte';
  import mapbox from 'mapbox-gl';
  import {parseAddress} from '../util-address';

  export let value = '';
  let geocoder = {};
  let inputAddress = null;
  let parsedLocation = null;
  let inputAptNumber = '';

  $: value = inputAddress ? inputAddress.place_name : '';

  onMount(() => {
    geocoder = new MapboxGeocoder({
      accessToken: mapbox.accessToken,
      types: 'postcode,address',
      countries: 'MAP_COUNTRY',
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
      inputAddress = data.result;
      // parsedLocation = parseAddress(item.place_name);
    });
    geocoder.addTo('#address-field');
  });
</script>

<label class="main">
  Address:
  <div id="address-field"></div>
</label>
{#if parsedLocation}
  <label class="sub">
    Apt Number:
    <input bind:value={inputAptNumber} />
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
{/if}

<style>
  label.main {
    padding: 4px 0px 4px 0px;
  }
  label.sub {
    padding: 4px 0px 4px 0px;
  }
  label {
    padding: 10px 0px 10px 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #address-field {
    flex: 1;
    max-width: 70%;
  }

  #address-field > :global(.mapboxgl-ctrl-geocoder) {
    width: unset;
    max-width: unset;
  }
</style>