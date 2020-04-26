<script>
  export let text = '';
  export let value;
</script>

<label>
  {text}
  <input {...$$restProps} bind:value/>
</label>

<style>
  label {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  label > input {
    flex: 1;
    max-width: 70%;
  }
</style>