<script>
</script>

<button type="button" {...$$restProps} on:click>
  <slot></slot>
</button>

<style>
  button {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    min-height: 28px;
    min-width: 28px;
    cursor: pointer;
    text-align: center;
    padding: 8px 12px;
  }
</style>