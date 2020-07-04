<script>
  import {onMount} from 'svelte';

  import {getTerritories} from '../data-services/territory';
  import {authorized, territories$, territoriesInitialized} from '../store';

  $: {
    if ($authorized && !$territoriesInitialized) {
      getTerritories().then(result => {
        territories$.set(result.data.territoriesPerDivision);
        $territoriesInitialized = true;
      });
    }
  }

</script>