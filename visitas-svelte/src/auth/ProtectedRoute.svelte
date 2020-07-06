<script>
  import Authorized from './Authorized.svelte';
  import {Route} from 'svelte-routing';
</script>
<Route {...$$restProps} let:params>
  <Authorized>
    <slot {params}></slot>
  </Authorized>
</Route>
