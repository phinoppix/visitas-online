<script>
  import {onMount} from 'svelte';
  import {getTerritories} from './data-services/territory';
  import {territories$} from './store';

  onMount(async () => {
    const result = await getTerritories();
    territories$.set(result.data.territoriesPerDivision);
  });
</script>
<slot></slot>