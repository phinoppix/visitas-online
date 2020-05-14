<script>
  import {onMount, createEventDispatcher} from 'svelte';
  import mapbox from 'mapbox-gl';
  import {isEmptyOrNil} from '../../util';

  import {appEnv} from '../../envConfig';

  export let findLocation = null;
  const EVENT_ADDRESS_FINDER_RESULT = 'addressFinder_result';

  const dispatch = createEventDispatcher();

  let geocoder;

  onMount(() => {
    geocoder = new MapboxGeocoder({
      accessToken: mapbox.accessToken,
      types: 'postcode,address',
      countries: appEnv.mapCountry
    });
    geocoder.on('result', data => {
      dispatch(EVENT_ADDRESS_FINDER_RESULT, {data}); // TODO: Call utility to parse data into visitas-compatible data structure
    });
    geocoder.addTo('#address-field');

    if (!isEmptyOrNil(findLocation)) {
      geocoder.query(findLocation);
    }
  });
</script>
<div id="address-field"></div>