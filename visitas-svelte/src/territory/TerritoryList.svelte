<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import * as enums from './enums.js';
  export let territories = [];
  export let visibleColumns = enums.TERRITORY_TABLE_ALLCOLUMNS;
</script>

<table>
  <thead>
    <tr>
      <th>Territory code</th>
      <th>Addresses</th>
      <th>Checked out</th>
      <th>Checked out</th>
      <th>Checked out</th>
      {#if visibleColumns & enums.TERRITORY_TABLE_CHECKEDOUTBY}
      <th>by</th>
      {/if}
      {#if visibleColumns & enums.TERRITORY_TABLE_EDITOR}
      <th>&nbsp;</th>
      {/if}
    </tr>
  </thead>
  <tbody>
  {#each territories as t}
    <tr>
      <td>{t.code}</td>
      <td>{t.countContacts}</td>
      <td>{t.checkedOut1}</td>
      <td>{t.checkedOut2}</td>
      <td>{t.checkedOut3}</td>
      {#if visibleColumns & enums.TERRITORY_TABLE_CHECKEDOUTBY}
      <td>{t.checkedOutBy}</td>
      {/if}
      {#if visibleColumns & enums.TERRITORY_TABLE_EDITOR}
      <td><button on:click="{() => dispatch('editTerritory', {id: t.id})}">edit</button></td>
      {/if}
    </tr>
  {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
  }
  td {
    padding: 0px 16px;
  }
</style>