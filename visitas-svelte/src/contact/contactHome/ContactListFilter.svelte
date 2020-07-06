<script>
  import {onMount, createEventDispatcher} from 'svelte';
  import TagFilters from '../TagFilters.svelte';
  import {contactsInitialized, territories$} from '../../store';
  import {cache} from '../../util';

  const NO_TERRITORY = 'NO_TERRITORY';
  const dispatch = createEventDispatcher();

  export let supportedTags = [];

  let filterTerritory = '';
  let filterTags = [];
  let options = [{id: NO_TERRITORY, name: 'No territory assigned yet'}];

  const applyFilter = () => {
    dispatch('applyFilter', {
      territoryId: filterTerritory === NO_TERRITORY ? null : filterTerritory,
      tags: filterTags
    });
  }

  onMount(() => {
    territories$.subscribe(list => {
      options = options.concat(list);
    });

    const cacheFilter = cache.get(cache.CONTACT_LIST_FILTER) || {};
    filterTerritory = cacheFilter.filterTerritory || NO_TERRITORY;
    filterTags = cacheFilter.filterTags || [];

    if (!$contactsInitialized) {
      applyFilter();
    }
  });

  const filterChanged = () => {
    cache.set(cache.CONTACT_LIST_FILTER, {filterTerritory, filterTags});

    applyFilter();
  }
</script>

<label>
  Territory:
  <select bind:value={filterTerritory} on:change={filterChanged}>
    <option value={options[0].id}>{options[0].name}</option>
    <optgroup label="Available territories">
        {#each options.slice(1) as opt}
          <option value={opt.id} selected={opt.id === filterTerritory}>{opt.code} - {opt.name}</option>
        {/each}}
    </optgroup>
  </select>
</label>

<TagFilters bind:tags={filterTags} {supportedTags} on:change={filterChanged}/>

<style>
  label {
    margin: 12px 0;
  }
</style>