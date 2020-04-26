<script>
  export let activeClass = '';
</script>

<button class={activeClass} {...$$restProps} on:click>
  <slot></slot>
</button>

<style>
  button {
    display: flex;
    flex-direction: column;
    border: 3px solid #000000;
    border-radius: 5px;
    min-height: 28px;
    min-width: 28px;
    cursor: pointer;
    text-align: center;
    padding: 6px 8px;
    background-color: inherit;
    font-size: 0.80em;
  }
</style>