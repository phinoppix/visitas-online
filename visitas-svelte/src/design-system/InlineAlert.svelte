<script>
  import {createEventDispatcher} from 'svelte';
  export let message = null;
  export let errorType = 'error'; // error | success | info
  // export let autoClose = true;

  const dispatch = createEventDispatcher();
</script>

{#if (message && message.length > 0)}
    <section class={errorType}>
      <p>{message}</p><a on:click="{() => dispatch('dismissAlert')}">[ X dismiss ]</a>
    </section>
{/if}

<style>
  section {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 12px 0px;
    align-items: center;
  }
  p {
    margin: 0 14px;
    padding: 0;
  }
  section.error {
    background-color:red;
    color: white;
  }
  section.success {
    background-color:limegreen;
  }
  section.info {
    background-color:lightgoldenrodyellow;
  }
  a, a:visited, a:hover {
    color: white;
    font-size: small;
    padding:0 12px;
    cursor: pointer;
  }
</style>