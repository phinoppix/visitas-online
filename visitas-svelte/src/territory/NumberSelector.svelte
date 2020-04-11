<script>
  export let label = '';
  export let ranges = []; // array of key-value pair
</script>

<div>
  <label>
    {label}
  </label>
  <select>
    {#each ranges as kv}
    <option value={kv.key}>{kv.value || kv.key}</option>
    {/each}
  </select>
</div>