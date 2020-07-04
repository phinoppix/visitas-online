<script>
  import {onMount} from 'svelte';
  import {asyncTryRedirectToLogin} from './widget';

  onMount(() => {
    asyncTryRedirectToLogin();
  });
</script>

<slot></slot>