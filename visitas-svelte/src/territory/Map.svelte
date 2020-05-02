<script>
  import {onMount} from 'svelte';
  import mapbox from 'mapbox-gl';

  onMount(() => {
  	const mapRef = new mapbox.Map({
      container: 'mainmap',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  	mapRef.resize();
  });
</script>

<div id="mainmap">
</div>

<style>
  div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>