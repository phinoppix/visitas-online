<script>
  import {onMount} from 'svelte';

  import {getTerritories} from './data-services/territory';
  import {getTags} from './data-services/tags';
  import * as store from './store';

  onMount(async () => {
    const tags = await getTags();
    store.tags$.set(tags.data.tags);
  });

  onMount(async () => {
    const territories = await getTerritories();
    store.territories$.set(territories.data.territoriesPerDivision);
  });
</script>
<slot></slot>