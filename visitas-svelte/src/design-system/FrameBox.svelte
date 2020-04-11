<script>
  export let title = 'Undefined';
  export let titleClass = null;
</script>

<div>
  <h3 class={titleClass}>{title}</h3>
  <slot>
  </slot>
</div>

<style>
  div > h3 {
    border-bottom: 1px solid gray;
    padding-bottom: 8px;
  }
</style>